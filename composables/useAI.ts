/**
 * AI Service Composable
 * 用户自带 Key：OpenAI、Anthropic、DeepSeek
 * 纯前端流式输出
 */

import {
  AI_MODELS,
  DEFAULT_PROVIDER,
  createAIRequest,
  defaultModel,
  isAIProvider,
  isSupportedModel,
  readAIStream,
  type AIMessage,
  type AIProvider
} from '@/utils/aiProviders'

export interface AIConfig {
  provider: AIProvider
  model: string
  keys: Record<AIProvider, string>
}

export interface StreamCallbacks {
  onStart?: () => void
  onToken?: (token: string) => void
  onComplete?: (fullText: string) => void
  onError?: (error: Error) => void
}

// Mermaid 优化的系统提示词
const OPTIMIZE_SYSTEM_PROMPT = `You are an expert Mermaid diagram optimizer. Your task is to improve the given Mermaid code while maintaining its original meaning and structure.

Optimization guidelines:
1. Fix any syntax errors first
2. Improve readability with better node names and labels
3. Optimize layout and flow direction if needed
4. Add proper styling and themes where appropriate
5. Ensure consistent naming conventions
6. Add helpful comments if the diagram is complex

VALIDATION CHECKLIST (Must verify before output):
- Verify diagram type declaration is correct (graph, flowchart, sequenceDiagram, classDiagram, etc.)
- Check all node IDs are valid (no spaces, special characters must be quoted)
- Verify all connections use correct syntax (-->, ---, -.->, ==>, etc.)
- Ensure all brackets are properly closed [], (), {}, etc.
- Check subgraph syntax if used (subgraph name ... end)
- Verify all labels are properly quoted if containing special characters
- Test that the code would render without errors

IMPORTANT: 
- Only output the optimized Mermaid code, no explanations
- Keep the same diagram type (flowchart, sequence, etc.)
- Preserve the original logic and relationships
- Do not wrap the code in markdown code blocks
- The output code MUST be valid and error-free Mermaid syntax`

// Mermaid 生成的系统提示词
const GENERATE_SYSTEM_PROMPT = `You are an expert Mermaid diagram generator. Based on the user's description, create a clear and well-structured Mermaid diagram.

Guidelines:
1. Choose the most appropriate diagram type for the description:
   - flowchart/graph TD/LR: for processes, workflows, decision trees
   - sequenceDiagram: for interactions between systems/people
   - classDiagram: for object-oriented structures
   - stateDiagram-v2: for state machines
   - erDiagram: for database relationships
   - gantt: for project timelines
   - pie: for data distribution

2. Create clear, readable node names and labels
3. Use appropriate connectors and styling
4. Keep the diagram focused and not overly complex
5. Add helpful comments for complex parts

VALIDATION CHECKLIST (Must verify before output):
- Verify diagram type declaration is correct
- Check all node IDs are valid (no spaces in IDs, use quotes for labels with special chars)
- Verify all connections use correct syntax for the diagram type
- Ensure all brackets are properly closed [], (), {}, <<>>, etc.
- Check subgraph/section syntax if used
- Verify all labels are properly quoted if containing special characters
- For sequenceDiagram: verify participant declarations and message syntax
- For classDiagram: verify class definitions and relationship syntax
- For erDiagram: verify entity names and relationship cardinality
- For gantt: verify dateFormat and task definitions
- Test that the code would render without errors

IMPORTANT:
- Only output the Mermaid code, no explanations
- Do not wrap the code in markdown code blocks
- The output code MUST be valid and error-free Mermaid syntax
- Double-check the syntax before outputting`

export function useAI() {
  let activeRequest: AbortController | null = null
  const config = reactive<AIConfig>({
    provider: DEFAULT_PROVIDER,
    model: defaultModel(DEFAULT_PROVIDER),
    keys: { openai: '', anthropic: '', deepseek: '' }
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const modelOptions = computed(() => AI_MODELS[config.provider])
  const hasValidKey = computed(() =>
    !!config.keys[config.provider].trim() && isSupportedModel(config.provider, config.model)
  )

  const selectProvider = (provider: AIProvider) => {
    if (!isAIProvider(provider)) return
    config.provider = provider
    config.model = defaultModel(provider)
  }

  // Keep keys in browser session storage and remove old persistent settings.
  const loadConfig = () => {
    if (!import.meta.client) return
    let hasSavedConfig = false
    try {
      const saved = sessionStorage.getItem('ai-config-v2')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (!parsed || !isAIProvider(parsed.provider) || !parsed.keys || typeof parsed.keys !== 'object') {
          throw new Error('Invalid AI settings')
        }
        config.provider = parsed.provider
        config.model = isSupportedModel(parsed.provider, parsed.model)
          ? parsed.model : defaultModel(parsed.provider)
        for (const provider of Object.keys(config.keys) as AIProvider[]) {
          config.keys[provider] = typeof parsed.keys?.[provider] === 'string' ? parsed.keys[provider] : ''
        }
        hasSavedConfig = true
      }
    } catch {
      try { sessionStorage.removeItem('ai-config-v2') } catch { /* Storage may be disabled. */ }
    }

    try {
      const legacy = localStorage.getItem('ai-config')
      if (legacy && !hasSavedConfig) {
        try {
          const parsed = JSON.parse(legacy)
          if (parsed.keySource === 'custom' && typeof parsed.deepseekKey === 'string') {
            config.keys.deepseek = parsed.deepseekKey
            saveConfig()
          }
        } catch {
          // Discard malformed legacy settings as well.
        }
      }
    } catch {
      // Browser storage may be disabled; the in-memory config remains usable.
    } finally {
      try { localStorage.removeItem('ai-config') } catch { /* Storage may be disabled. */ }
    }
  }

  const saveConfig = () => {
    if (!import.meta.client) return
    try {
      sessionStorage.setItem('ai-config-v2', JSON.stringify(config))
    } catch {
      error.value = 'Browser storage is unavailable; settings will last until this page closes.'
    }
  }

  const clearCurrentKey = () => {
    config.keys[config.provider] = ''
    saveConfig()
  }

  const cancelRequest = () => {
    activeRequest?.abort()
  }

  const streamChat = async (messages: AIMessage[], callbacks: StreamCallbacks) => {
    if (!hasValidKey.value) {
      const missingKey = new Error('Select a model and enter your own API Key first.')
      error.value = missingKey.message
      callbacks.onError?.(missingKey)
      return
    }

    isLoading.value = true
    error.value = null
    callbacks.onStart?.()
    const controller = new AbortController()
    activeRequest = controller

    try {
      const provider = config.provider
      const request = createAIRequest(provider, config.model, config.keys[provider], messages)
      const response = await fetch(request.url, { ...request.init, signal: controller.signal })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error?.message || errorData?.message || `API Error: ${response.status}`)
      }

      if (!response.body) throw new Error('No response body')
      const fullText = await readAIStream(response.body, provider, token => callbacks.onToken?.(token))
      if (controller.signal.aborted) return
      callbacks.onComplete?.(fullText)
    } catch (e) {
      if (controller.signal.aborted) return
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err.message
      callbacks.onError?.(err)
    } finally {
      if (activeRequest === controller) activeRequest = null
      isLoading.value = false
    }
  }

  // 优化 Mermaid 代码
  const optimizeMermaid = async (code: string, callbacks: StreamCallbacks) => {
    await streamChat(
      [
        { role: 'system', content: OPTIMIZE_SYSTEM_PROMPT },
        { role: 'user', content: `Please optimize this Mermaid diagram code:\n\n${code}` }
      ],
      callbacks
    )
  }

  // 根据主题生成 Mermaid 代码
  const generateMermaid = async (topic: string, diagramType: string | null, callbacks: StreamCallbacks) => {
    const typeHint = diagramType ? `\nPreferred diagram type: ${diagramType}` : ''
    await streamChat(
      [
        { role: 'system', content: GENERATE_SYSTEM_PROMPT },
        { role: 'user', content: `Create a Mermaid diagram for: ${topic}${typeHint}` }
      ],
      callbacks
    )
  }

  // 初始化
  onMounted(() => {
    loadConfig()
  })
  onUnmounted(cancelRequest)

  return {
    config,
    isLoading,
    error,
    hasValidKey,
    modelOptions,
    selectProvider,
    saveConfig,
    loadConfig,
    clearCurrentKey,
    cancelRequest,
    optimizeMermaid,
    generateMermaid
  }
}
