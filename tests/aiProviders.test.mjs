import assert from 'node:assert/strict'
import { test } from 'node:test'
import { AI_MODELS, createAIRequest, readAIStream } from '../utils/aiProviders.ts'

const messages = [
  { role: 'system', content: 'Write Mermaid only.' },
  { role: 'user', content: 'A simple flowchart' }
]

const stream = (...chunks) => new ReadableStream({
  start(controller) {
    for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk))
    controller.close()
  }
})

test('each provider requires a user key and uses the right endpoint and model', () => {
  for (const [provider, options] of Object.entries(AI_MODELS)) {
    for (const option of options) {
      const { url, init } = createAIRequest(provider, option.id, ' user-key ', messages)
      const body = JSON.parse(init.body)
      assert.equal(body.model, option.id)
      assert.equal(body.stream, true)
      assert.ok(url.startsWith('https://api.'))
      if (provider === 'anthropic') {
        assert.equal(init.headers['x-api-key'], 'user-key')
        assert.equal(init.headers['anthropic-dangerous-direct-browser-access'], 'true')
        assert.equal(body.system, messages[0].content)
        assert.deepEqual(body.messages, [messages[1]])
        assert.deepEqual(body.output_config, { effort: 'low' })
        if (option.id === 'claude-sonnet-5-5') assert.deepEqual(body.thinking, { type: 'between_tools' })
        if (option.id === 'claude-opus-5-5') assert.equal(body.thinking, undefined)
      } else {
        assert.equal(init.headers.Authorization, 'Bearer user-key')
        assert.deepEqual(body.messages, messages)
        if (provider === 'deepseek') assert.deepEqual(body.thinking, { type: 'disabled' })
        if (provider === 'openai') {
          assert.equal(body.max_completion_tokens, 4096)
          assert.equal(body.max_tokens, undefined)
          assert.equal(body.reasoning_effort, 'none')
        }
      }
    }
    assert.throws(() => createAIRequest(provider, options[0].id, '', messages), /API Key/)
    assert.throws(() => createAIRequest(provider, 'unsupported-model', 'key', messages), /supported model/)
  }
})

test('model catalog contains current cost-first and higher-capability choices', () => {
  assert.deepEqual(AI_MODELS.openai.map(model => model.id), ['gpt-5.4-mini', 'gpt-5.4'])
  assert.deepEqual(AI_MODELS.anthropic.map(model => model.id), ['claude-sonnet-5-5', 'claude-opus-5-5'])
  assert.deepEqual(AI_MODELS.deepseek.map(model => model.id), ['deepseek-flash', 'deepseek-v4-pro'])
})

test('truncated or interrupted streams cannot be applied as complete Mermaid', async () => {
  for (const provider of ['openai', 'deepseek']) {
    await assert.rejects(
      readAIStream(stream('data: {"choices":[{"delta":{"content":"graph TD"},"finish_reason":"length"}]}\n\ndata: [DONE]\n\n'), provider, () => {}),
      /cut off/
    )
    await assert.rejects(
      readAIStream(stream('data: {"choices":[{"delta":{"content":"graph TD"}}]}\n\n'), provider, () => {}),
      /before completion/
    )
  }

  await assert.rejects(
    readAIStream(stream(
      'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"graph TD"}}\n\n',
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"max_tokens"}}\n\n',
      'event: message_stop\ndata: {"type":"message_stop"}\n\n'
    ), 'anthropic', () => {}),
    /cut off/
  )
})

test('OpenAI and DeepSeek streaming handles split SSE events', async () => {
  for (const provider of ['openai', 'deepseek']) {
    const tokens = []
    const output = await readAIStream(stream(
      'data: {"choices":[{"delta":{"content":"gra',
      'ph TD"}}]}\r\n\r\ndata: {"choices":[{"delta":{"content":"\\nA-->B"}}]}\n\n',
      'data: [DONE]\n\n'
    ), provider, token => tokens.push(token))
    assert.equal(output, 'graph TD\nA-->B')
    assert.deepEqual(tokens, ['graph TD', '\nA-->B'])
  }
})

test('Claude streaming reads text deltas and surfaces event errors', async () => {
  const tokens = []
  const output = await readAIStream(stream(
    'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"graph TD"}}\n\n',
    'event: message_stop\ndata: {"type":"message_stop"}\n\n'
  ), 'anthropic', token => tokens.push(token))
  assert.equal(output, 'graph TD')
  assert.deepEqual(tokens, ['graph TD'])

  await assert.rejects(
    readAIStream(stream('event: error\ndata: {"type":"error","error":{"message":"Rate limit"}}\n\n'), 'anthropic', () => {}),
    /Rate limit/
  )
})
