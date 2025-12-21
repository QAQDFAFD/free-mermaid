/**
 * AI Service Composable
 * 支持 DeepSeek 模型
 * 纯前端流式输出
 */

export type KeySource = 'default' | 'custom'

export interface AIConfig {
  deepseekKey: string
  keySource: KeySource
}

export interface StreamCallbacks {
  onStart?: () => void
  onToken?: (token: string) => void
  onComplete?: (fullText: string) => void
  onError?: (error: Error) => void
}

// DeepSeek 模型配置
const MODEL_CONFIG = {
  baseUrl: 'https://api.deepseek.com/v1/chat/completions',
  model: 'deepseek-chat'
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
  // 获取运行时配置（默认 Key）
  const runtimeConfig = useRuntimeConfig()

  const config = reactive<AIConfig>({
    deepseekKey: '',
    keySource: 'default'
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 检查是否有默认 Key 可用
  const hasDefaultKey = computed(() => {
    const defaultDeepseekKey = (runtimeConfig.public.deepseekApiKey as string) || ''
    return defaultDeepseekKey.length > 0
  })

  // 从 localStorage 加载配置
  const loadConfig = () => {
    if (process.client) {
      const saved = localStorage.getItem('ai-config')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          config.deepseekKey = parsed.deepseekKey || ''
          config.keySource = parsed.keySource || 'default'
        } catch (e) {
          console.error('Failed to parse AI config:', e)
        }
      }
    }
  }

  // 保存配置到 localStorage
  const saveConfig = () => {
    if (process.client) {
      localStorage.setItem(
        'ai-config',
        JSON.stringify({
          deepseekKey: config.deepseekKey,
          keySource: config.keySource
        })
      )
    }
  }

  // 检查是否有有效的 API Key
  const hasValidKey = computed(() => {
    // 如果使用默认 Key
    if (config.keySource === 'default') {
      return hasDefaultKey.value
    }
    // 如果使用自定义 Key
    return config.deepseekKey.length > 0
  })

  // 获取当前 API Key
  const getCurrentKey = () => {
    const defaultDeepseekKey = (runtimeConfig.public.deepseekApiKey as string) || ''

    if (config.keySource === 'default') {
      return defaultDeepseekKey
    }
    return config.deepseekKey
  }

  // 流式调用 AI API
  const streamChat = async (
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    callbacks: StreamCallbacks
  ) => {
    const apiKey = getCurrentKey()

    if (!apiKey) {
      callbacks.onError?.(new Error('API Key not configured'))
      return
    }

    isLoading.value = true
    error.value = null
    callbacks.onStart?.()

    try {
      const response = await fetch(MODEL_CONFIG.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: MODEL_CONFIG.model,
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 4096
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `API Error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (!reader) {
        throw new Error('No response body')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                fullText += content
                callbacks.onToken?.(content)
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

      callbacks.onComplete?.(fullText)
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err.message
      callbacks.onError?.(err)
    } finally {
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

  return {
    config,
    isLoading,
    error,
    hasValidKey,
    hasDefaultKey,
    saveConfig,
    loadConfig,
    optimizeMermaid,
    generateMermaid
  }
}
