export const AI_MODELS = {
  openai: [
    { id: 'gpt-5.4-mini', label: 'GPT-5.4 mini' },
    { id: 'gpt-5.4', label: 'GPT-5.4' }
  ],
  anthropic: [
    { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5' },
    { id: 'claude-opus-5-5', label: 'Claude Opus 5.5' }
  ],
  deepseek: [
    { id: 'deepseek-flash', label: 'DeepSeek V4.1 Flash' },
    { id: 'deepseek-v4-pro', label: 'DeepSeek V4 Pro' }
  ]
} as const

export type AIProvider = keyof typeof AI_MODELS
export type AIMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export const DEFAULT_PROVIDER: AIProvider = 'deepseek'

export const isAIProvider = (value: unknown): value is AIProvider =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(AI_MODELS, value)

export const isSupportedModel = (provider: AIProvider, model: unknown): model is string =>
  typeof model === 'string' && AI_MODELS[provider].some(option => option.id === model)

export const defaultModel = (provider: AIProvider): string => AI_MODELS[provider][0].id

export function createAIRequest(
  provider: AIProvider,
  model: string,
  apiKey: string,
  messages: AIMessage[]
): { url: string; init: RequestInit } {
  if (!isSupportedModel(provider, model) || !apiKey.trim()) {
    throw new Error('Select a supported model and enter your API Key.')
  }

  if (provider === 'anthropic') {
    return {
      url: 'https://api.anthropic.com/v1/messages',
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model,
          system: messages.filter(message => message.role === 'system').map(message => message.content).join('\n\n'),
          messages: messages.filter(message => message.role !== 'system'),
          max_tokens: 4096,
          output_config: { effort: 'low' },
          ...(model === 'claude-sonnet-5-5' ? { thinking: { type: 'between_tools' } } : {}),
          stream: true
        })
      }
    }
  }

  return {
    url: provider === 'openai'
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://api.deepseek.com/chat/completions',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify(provider === 'openai'
        ? { model, messages, max_completion_tokens: 4096, reasoning_effort: 'none', stream: true }
        : { model, messages, max_tokens: 4096, thinking: { type: 'disabled' }, stream: true })
    }
  }
}

export async function readAIStream(
  body: ReadableStream<Uint8Array>,
  provider: AIProvider,
  onToken: (token: string) => void
): Promise<string> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''
  let completed = false

  const consumeEvent = (event: string) => {
    const data = event.split('\n')
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trimStart())
      .join('\n')
    if (!data) return
    if (data === '[DONE]') {
      completed = true
      return
    }

    let parsed: any
    try {
      parsed = JSON.parse(data)
    } catch {
      throw new Error('Invalid response from AI provider.')
    }
    if (parsed.error || parsed.type === 'error') {
      throw new Error(parsed.error?.message || 'AI provider returned an error.')
    }
    if (provider === 'anthropic') {
      if (parsed.type === 'message_delta' && parsed.delta?.stop_reason === 'max_tokens') {
        throw new Error('AI output was cut off at the token limit. Try a smaller diagram or another model.')
      }
      if (parsed.type === 'message_stop') completed = true
    } else if (parsed.choices?.some((choice: any) => choice.finish_reason === 'length')) {
      throw new Error('AI output was cut off at the token limit. Try a smaller diagram or another model.')
    }
    const token = provider === 'anthropic'
      ? parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta' ? parsed.delta.text : ''
      : parsed.choices?.[0]?.delta?.content
    if (typeof token === 'string' && token) {
      fullText += token
      onToken(token)
    }
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      buffer = buffer.replaceAll('\r\n', '\n')
      let separator = buffer.indexOf('\n\n')
      while (separator !== -1) {
        consumeEvent(buffer.slice(0, separator))
        buffer = buffer.slice(separator + 2)
        separator = buffer.indexOf('\n\n')
      }
    }
    buffer += decoder.decode().replaceAll('\r\n', '\n')
    if (buffer.trim()) consumeEvent(buffer)
  } finally {
    reader.releaseLock()
  }

  if (!completed) throw new Error('AI response ended before completion. Please try again.')
  if (!fullText.trim()) throw new Error('AI provider returned no text. Try another model.')
  return fullText
}
