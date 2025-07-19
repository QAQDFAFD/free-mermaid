<template>
  <div
    class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="flex items-center">
        <svg class="h-6 w-6 text-blue-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M7 14H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M14 11L17 14L14 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <h1 class="text-xl font-bold text-gray-900">Mermaid Drawing</h1>
      </div>

      <div class="hidden md:flex space-x-2">
        <button
          v-for="example in examples"
          :key="example.name"
          @click="loadExample(example.code)"
          :class="[
            'px-2 py-1 text-sm rounded transition-colors duration-200',
            isCurrentType(example.code) ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
          ]">
          {{ t(`tools.${example.key}`) }}
        </button>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <button
        @click="clearEditor"
        class="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {{ t('editor.clear') }}
      </button>

      <ThemeToggle />

      <!-- 语言切换按钮 -->
      <LanguageSwitch />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
  import { exportAsPng, exportAsSvg } from '~/utils/exportUtils'
  import ThemeToggle from '~/components/ThemeToggle.vue'
  import LanguageSwitch from '~/components/LanguageSwitch.vue'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:code'])
  const { t } = useI18n()

  const currentCode = ref(props.modelValue || '')
  const error = ref(null)

  // 示例图表
  const examples = [
    {
      name: 'Love Flowchart',
      key: 'flowchart',
      code: `graph TD
    A[😊 Meet Someone Special] --> B{💭 Do You Like Her?}
    B -->|❤️ Yes| C[💬 Start Conversation]
    B -->|😕 No| D[👥 Stay Friends]
    C --> E[🎯 Find Common Interests]
    E --> F{🤔 Is She Interested?}
    F -->|😍 Yes| G[💐 Ask Her Out]
    F -->|😅 Not Sure| H[⏰ Give It Time]
    F -->|😔 No| I[🤝 Respect & Stay Friends]
    G --> J{🌟 First Date Success?}
    J -->|🥰 Amazing| K[❤️ Keep Dating]
    J -->|😊 Good| L[📅 Plan Another Date]
    J -->|😐 Okay| H
    H --> E
    K --> M[💍 Happily Ever After]
    L --> K
    D --> N[😌 Friendship is Also Great]
    I --> N`
    },
    {
      name: 'Dating Sequence',
      key: 'sequence',
      code: `sequenceDiagram
    participant You as 😊 You
    participant Her as 💕 Her
    participant Heart as ❤️ Heart
    participant Cupid as 🏹 Cupid
    
    You->>Her: 👋 Hello, nice to meet you!
    Her-->>You: 😊 Hi there!
    You->>Heart: 💭 Check if interested
    Heart-->>You: 💓 Yes, definitely!
    You->>Her: ☕ Would you like to grab coffee?
    Her->>Heart: 🤔 Should I say yes?
    Heart-->>Her: 💖 Absolutely!
    Her-->>You: 😍 I'd love to!
    Cupid->>You: 🎯 Mission accomplished!
    Cupid->>Her: ✨ Love is in the air!`
    },
    {
      name: 'Dating App Classes',
      key: 'class',
      code: `classDiagram
    class DatingAppUser {
      +String bio
      +Array photos
      +Integer age
      +Boolean verified
      +swipeRight()
      +swipeLeft()
      +sendMessage()
    }
    class HopelessRomantic {
      +String dreamDate
      +writePoetry()
      +fallInLoveEasily()
      +getHeartbroken()
    }
    class SerialDater {
      +Integer matchCount
      +scheduleMultipleDates()
      +masterSmallTalk()
      +neverSettle()
    }
    class CatfishHunter {
      +Array suspiciousProfiles
      +reverseImageSearch()
      +detectFakeProfiles()
      +saveInnocentHearts()
    }
    DatingAppUser <|-- HopelessRomantic
    DatingAppUser <|-- SerialDater  
    DatingAppUser <|-- CatfishHunter`
    },
    {
      name: 'Fitness Journey',
      key: 'state',
      code: `stateDiagram-v2
    [*] --> 😴 CouchPotato
    😴 CouchPotato --> 💪 Motivated: New Year Resolution!
    💪 Motivated --> 🏃 Working_Out: Hit the Gym
    🏃 Working_Out --> 😅 Exhausted: Too Much Too Soon
    🏃 Working_Out --> 🎯 Seeing_Results: Consistent Work
    😅 Exhausted --> 😴 CouchPotato: Give Up
    😅 Exhausted --> 💪 Motivated: Try Again
    🎯 Seeing_Results --> 🏆 Fit_And_Healthy: Achieved Goals!
    🎯 Seeing_Results --> 🏃 Working_Out: Keep Going
    🏆 Fit_And_Healthy --> 🏃 Working_Out: Maintain Fitness
    🏆 Fit_And_Healthy --> [*]: Living Best Life`
    },
    {
      name: 'Netflix & Chill Empire',
      key: 'entity',
      code: `erDiagram
    USER ||--o{ WATCHLIST : creates
    USER ||--o{ SUBSCRIPTION : pays_for
    SUBSCRIPTION ||--|{ STREAMING_SERVICE : includes
    USER }|..|{ SHOW : binges
    SHOW ||--o{ EPISODE : contains
    SHOW ||--o{ SEASON : has
    USER ||--o{ REVIEW : writes
    SHOW ||--|{ REVIEW : receives
    USER ||--o{ RECOMMENDATION : gets
    SHOW ||--o{ RECOMMENDATION : generates
    USER ||--o{ MIDNIGHT_SNACK : consumes
    BINGE_SESSION ||--|{ MIDNIGHT_SNACK : requires`
    },
    {
      name: 'Become Internet Famous',
      key: 'gantt',
      code: `gantt
    title 🚀 Road to Internet Fame
    dateFormat  YYYY-MM-DD
    section 📱 Content Creation
    Learn TikTok Trends     :done, trend1, 2024-01-01, 2024-01-07
    Master Video Editing     :active, edit1, 2024-01-08, 10d
    Develop Personal Brand     :brand1, after edit1, 14d
    section 🎬 Going Viral
    Post Daily Content     :daily1, 2024-01-15, 30d
    Collaborate with Influencers     :collab1, after brand1, 15d
    Launch Viral Challenge     :viral1, after collab1, 7d
    section 💰 Monetization
    Reach 100K Followers     :milestone1, after viral1, 21d
    Brand Partnerships     :money1, after milestone1, 14d
    Launch Merchandise     :merch1, after money1, 10d`
    },
    {
      name: 'Student Budget Reality',
      key: 'pie',
      code: `pie title 💸 Where Student Money Really Goes
    "🍕 Food Delivery" : 35.2
    "☕ Coffee & Bubble Tea" : 28.7
    "🛍️ Online Shopping" : 18.5
    "🎮 Gaming & Entertainment" : 12.3
    "📚 Actual School Supplies" : 3.8
    "💰 Savings (LOL)" : 1.5`
    }
  ]

  // 检查当前代码是否匹配某个示例类型
  const isCurrentType = (exampleCode: string) => {
    // 获取当前代码和示例代码的第一行（图表类型声明）
    const currentFirstLine = currentCode.value.trim().split('\n')[0]?.trim() || ''
    const exampleFirstLine = exampleCode.trim().split('\n')[0]?.trim() || ''

    // 比较第一行来确定图表类型
    return currentFirstLine === exampleFirstLine
  }

  // 加载示例
  const loadExample = (code: string) => {
    currentCode.value = code
    emit('update:code', code)
  }

  // 清空编辑器
  const clearEditor = () => {
    // 先将错误状态重置为null
    error.value = null

    // 先将代码更新为空
    emit('update:code', '')

    // 使用setTimeout确保代码清空被处理后再发送重置事件
    setTimeout(() => {
      // 发送重置事件以便预览组件重置视图
      const resetEvent = new CustomEvent('resetMermaidView')
      document.dispatchEvent(resetEvent)
    }, 50)
  }

  // 监听代码变化
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue !== undefined) {
        currentCode.value = newValue
      }
    }
  )
</script>
