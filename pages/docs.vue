<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 flex-grow">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('docs.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ $t('docs.subtitle') }}
        </p>
        <div class="mt-4">
          <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $t('docs.backToEditor') }}
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Flowchart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {{ $t('tools.flowchart') }}
            </h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.flowchart }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('flowchart')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.flowchart"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.flowchart ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('flowchart')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    graph TD
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个自上而下的流程图</span>
                  <span v-else>defines a top-down flowchart</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A[Text]
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建一个矩形节点</span>
                  <span v-else>creates a rectangle node</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    B{Text}
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建一个菱形节点（通常用于条件）</span>
                  <span v-else>creates a diamond node (typically for conditions)</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    -->
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建节点间的连接线</span>
                  <span v-else>creates a connection between nodes</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    -->|Text|
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建带标签的箭头</span>
                  <span v-else>creates a labeled arrow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sequence Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('tools.sequence') }}</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.sequence }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('sequence')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.sequence"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.sequence ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('sequence')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    sequenceDiagram
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个序列图</span>
                  <span v-else>defines a sequence diagram</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    participant Name
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个参与者</span>
                  <span v-else>defines a participant</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A->>B: Text
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建一个实线箭头（表示同步消息）</span>
                  <span v-else>creates a solid arrow (synchronous message)</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A-->>B: Text
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建一个虚线箭头（表示异步消息）</span>
                  <span v-else>creates a dashed arrow (asynchronous message)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Class Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('tools.class') }}</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.class }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('class')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.class"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.class ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('class')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    classDiagram
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个类图</span>
                  <span v-else>defines a class diagram</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    class ClassName {}
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个带属性/方法的类</span>
                  <span v-else>defines a class with properties/methods</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    +
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示公共属性/方法</span>
                  <span v-else>indicates public properties/methods</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    -
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示私有属性/方法</span>
                  <span v-else>indicates private properties/methods</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A &lt;|-- B
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示B继承自A（B是A的子类）</span>
                  <span v-else>indicates B inherits from A (B is a subclass of A)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- State Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('tools.state') }}</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.state }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('state')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.state"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.state ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('state')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    stateDiagram-v2
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个状态图</span>
                  <span v-else>defines a state diagram</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    [*]
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示开始或结束状态</span>
                  <span v-else>represents start or end state</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A --> B
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示从状态A到状态B的转换</span>
                  <span v-else>represents a transition from state A to B</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    A --> B: Text
                  </code>
                  <span v-if="$i18n.locale === 'zh'">添加转换说明文本</span>
                  <span v-else>adds transition description text</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Entity Relationship Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {{ $t('tools.entity') }}
            </h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.entity }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('entity')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.entity"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.entity ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('entity')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    erDiagram
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义一个实体关系图</span>
                  <span v-else>defines an entity relationship diagram</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    ||--o{
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示一对多关系</span>
                  <span v-else>represents a one-to-many relationship</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    ||--|{
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示一对多（强制）关系</span>
                  <span v-else>represents a one-to-many (mandatory) relationship</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    }|..|{
                  </code>
                  <span v-if="$i18n.locale === 'zh'">表示多对多关系（虚线）</span>
                  <span v-else>represents a many-to-many relationship (dashed line)</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    : Text
                  </code>
                  <span v-if="$i18n.locale === 'zh'">添加关系说明</span>
                  <span v-else>adds relationship label</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Gantt Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('tools.gantt') }}</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.gantt }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('gantt')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.gantt"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.gantt ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('gantt')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    gantt
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义甘特图</span>
                  <span v-else>defines a Gantt chart</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    title Title
                  </code>
                  <span v-if="$i18n.locale === 'zh'">设置图表标题</span>
                  <span v-else>sets the chart title</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    dateFormat Format
                  </code>
                  <span v-if="$i18n.locale === 'zh'">设置日期格式</span>
                  <span v-else>sets the date format</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    section Name
                  </code>
                  <span v-if="$i18n.locale === 'zh'">创建任务分组</span>
                  <span v-else>creates a task section</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    Task Name: ID, Start Date, Duration/End Date
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义任务及其时间段</span>
                  <span v-else>defines a task with its timespan</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    done/active
                  </code>
                  <span v-if="$i18n.locale === 'zh'">标记任务状态（已完成/进行中）</span>
                  <span v-else>marks task status (completed/in progress)</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    after ID
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义任务依赖关系</span>
                  <span v-else>defines task dependency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Pie Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('tools.pie') }}</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 relative group">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ examples.pie }}</pre>
              <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="copyCode('pie')"
                  class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1"
                  :title="$t('docs.copyCode')">
                  <svg
                    v-if="!copiedStates.pie"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copiedStates.pie ? $t('docs.copied') : $t('docs.copyCode') }}
                </button>
                <button
                  @click="tryInEditor('pie')"
                  class="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors flex items-center gap-1"
                  :title="$t('docs.tryInEditor')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ $t('docs.tryInEditor') }}
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <p class="mb-2">
                <strong>{{ $t('docs.basicSyntax') }}:</strong>
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    pie
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义饼图</span>
                  <span v-else>defines a pie chart</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    title Title
                  </code>
                  <span v-if="$i18n.locale === 'zh'">设置图表标题</span>
                  <span v-else>sets the chart title</span>
                </li>
                <li>
                  <code
                    class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">
                    "Label" : Value
                  </code>
                  <span v-if="$i18n.locale === 'zh'">定义饼图的一个切片</span>
                  <span v-else>defines a slice in the pie chart</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('docs.additionalResources') }}
        </h2>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ $t('docs.resourcesDesc') }}
          </p>
          <ul class="space-y-2">
            <li>
              <a
                href="https://mermaid.js.org/syntax/flowchart.html"
                target="_blank"
                class="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {{ $t('docs.officialDocs') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 融合的底部信息与SEO区域 -->
    <footer
      class="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 text-center overflow-hidden">
      <!-- 美人鱼尾巴背景动画 -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- 水波纹背景 -->
        <div class="absolute inset-0 opacity-20 dark:opacity-15">
          <div class="wave-animation"></div>
          <div class="wave-animation" style="animation-delay: -2s"></div>
          <div class="wave-animation" style="animation-delay: -4s"></div>
        </div>

        <!-- 美人鱼尾巴 -->
        <div class="absolute bottom-0 right-0 opacity-35 dark:opacity-25">
          <svg width="200" height="80" viewBox="0 0 200 80" class="mermaid-tail">
            <!-- 尾巴主体 -->
            <path
              d="M20,60 Q40,20 80,40 Q120,60 160,30 Q180,50 200,20"
              stroke="url(#tailGradient)"
              stroke-width="10"
              fill="none"
              stroke-linecap="round" />
            <!-- 尾鳍 -->
            <path d="M180,20 Q200,10 190,30 Q200,40 185,35 Q175,25 180,20" fill="url(#finGradient)" opacity="1" />
            <!-- 小鳞片装饰 -->
            <circle cx="50" cy="45" r="4" fill="url(#scaleGradient)" opacity="0.9" />
            <circle cx="90" cy="35" r="3.5" fill="url(#scaleGradient)" opacity="0.9" />
            <circle cx="130" cy="50" r="4" fill="url(#scaleGradient)" opacity="0.9" />

            <!-- 渐变定义 -->
            <defs>
              <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #1e40af; stop-opacity: 0.9" />
                <stop offset="50%" style="stop-color: #0891b2; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #059669; stop-opacity: 0.9" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #0891b2; stop-opacity: 0.9" />
                <stop offset="100%" style="stop-color: #1e40af; stop-opacity: 1" />
              </linearGradient>
              <radialGradient id="scaleGradient">
                <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #0891b2; stop-opacity: 0.7" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <!-- 左侧美人鱼尾巴 -->
        <div class="absolute bottom-0 left-0 opacity-25 dark:opacity-15">
          <svg width="150" height="60" viewBox="0 0 150 60" class="mermaid-tail-left">
            <path
              d="M0,40 Q30,20 60,35 Q90,45 120,25 Q140,35 150,20"
              stroke="url(#tailGradient2)"
              stroke-width="8"
              fill="none"
              stroke-linecap="round" />
            <defs>
              <linearGradient id="tailGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #059669; stop-opacity: 0.8" />
                <stop offset="50%" style="stop-color: #0891b2; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #7c3aed; stop-opacity: 0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- 漂浮泡泡 -->
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <!-- 主标题 -->
        <h1 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">
          {{ $t('footer.title') }} - {{ $t('footer.editorTitle') }}
        </h1>

        <!-- 功能特点 -->
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-1 leading-tight" v-html="featuresText"></p>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1.5 leading-tight" v-html="seoText"></p>

        <!-- SEO关键词标签 -->
        <div class="text-xs text-gray-600 dark:text-gray-400 leading-tight mb-2">
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.graphTdOnline') }}</span>
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidEditorFree') }}</span>
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidChartOnlineFree') }}</span>
          <span class="inline-block">✓ {{ $t('footer.capabilities.mermaidFreeEditor') }}</span>
        </div>

        <!-- 返回编辑器按钮 -->
        <div class="text-center">
          <NuxtLink
            to="/"
            class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
            title="返回编辑器并开始教程">
            🚀 {{ $t('footer.startTour') }}
          </NuxtLink>
        </div>
        <div class="text-center mt-2 space-x-4">
          <NuxtLink
            to="/privacy"
            class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '隐私政策' : 'Privacy' }}
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '服务条款' : 'Terms' }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '联系我们' : 'Contact' }}
          </NuxtLink>
          <NuxtLink
            to="/faq"
            class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '常见问题' : 'FAQ' }}
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { examples as allExamples } from '~/composables/useExamples'

  const { t, locale } = useI18n()
  const router = useRouter()

  // 复制状态管理
  const copiedStates = ref({})

  // 根据当前语言获取示例代码
  const examples = computed(() => {
    const lang = locale.value
    return allExamples[lang] || allExamples['en']
  })

  // 复制代码到剪贴板
  const copyCode = async type => {
    const code = examples.value[type]
    try {
      await navigator.clipboard.writeText(code)
      copiedStates.value[type] = true
      setTimeout(() => {
        copiedStates.value[type] = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // 在编辑器中尝试
  const tryInEditor = type => {
    const code = examples.value[type]
    // 将代码存储到 sessionStorage，然后跳转到编辑器
    sessionStorage.setItem('mermaid-try-code', code)
    router.push('/')
  }

  // 计算属性：生成带HTML标签的功能描述文本
  const featuresText = computed(() => {
    const description = t('footer.features.description', {
      graphTD: `<strong>${t('footer.features.graphTD')}</strong>`,
      sequenceDiagram: `<strong>${t('footer.features.sequenceDiagram')}</strong>`,
      classDiagram: `<strong>${t('footer.features.classDiagram')}</strong>`
    })
    const desc = t('footer.desc')
    const link =
      '<a href="https://mermaid-drawing.com" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">mermaid-drawing.com</a>'

    return `${description} ${desc} ${link}`
  })

  // 计算属性：生成SEO文本
  const seoText = computed(() => {
    return t('footer.seoText', {
      mermaidDiagramOnlineFree: `<strong>${t('footer.seoKeywords.mermaidDiagramOnlineFree')}</strong>`,
      mermaidChartOnlineFree: `<strong>${t('footer.seoKeywords.mermaidChartOnlineFree')}</strong>`,
      mermaidFreeEditor: `<strong>${t('footer.seoKeywords.mermaidFreeEditor')}</strong>`
    })
  })

  // Add meta for SEO
  useHead({
    title: 'Mermaid Free Editor Tutorial - Graph TD Online Diagram Guide',
    meta: [
      {
        name: 'description',
        content:
          'Mermaid free editor tutorial with complete examples. Learn mermaid diagram online free, graph TD flowcharts, mermaid chart online free creation with step-by-step guide.'
      },
      {
        name: 'keywords',
        content:
          'mermaid tutorial, graph td tutorial, flowchart tutorial online, sequence diagram tutorial, mermaid documentation free, learn mermaid online, mermaid syntax guide, diagram tutorial'
      },
      // Open Graph for docs page
      {
        property: 'og:title',
        content: 'Mermaid Free Editor Tutorial - Graph TD Online Diagram Guide'
      },
      {
        property: 'og:description',
        content:
          'Mermaid free editor tutorial with complete examples. Learn mermaid diagram online free with step-by-step guide.'
      },
      {
        property: 'og:url',
        content: 'https://mermaid-drawing.com/docs'
      },
      {
        property: 'og:type',
        content: 'article'
      }
    ],
    link: [{ rel: 'canonical', href: 'https://mermaid-drawing.com/docs' }],
    script: [
      // 结构化数据 - HowTo (教程页面)
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Create Mermaid Diagrams Online Free',
          description:
            'Learn how to create flowcharts, sequence diagrams, class diagrams and more using Mermaid syntax.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Choose diagram type',
              text: 'Select the type of diagram you want to create: flowchart, sequence, class, state, ER, Gantt, or pie chart.'
            },
            {
              '@type': 'HowToStep',
              name: 'Write Mermaid code',
              text: 'Enter your Mermaid syntax code in the editor. Use the examples provided as templates.'
            },
            {
              '@type': 'HowToStep',
              name: 'Preview and export',
              text: 'View your diagram in real-time preview and export as PNG or SVG when ready.'
            }
          ],
          tool: {
            '@type': 'HowToTool',
            name: 'Mermaid Online Free Editor'
          }
        })
      }
    ]
  })
</script>

<style scoped>
  /* 美人鱼尾巴动画样式 */
  @keyframes mermaidSwim {
    0%,
    100% {
      transform: translateX(0) rotate(0deg);
    }
    25% {
      transform: translateX(-5px) rotate(-2deg);
    }
    50% {
      transform: translateX(0) rotate(0deg);
    }
    75% {
      transform: translateX(5px) rotate(2deg);
    }
  }

  @keyframes mermaidSwimLeft {
    0%,
    100% {
      transform: translateX(0) rotate(0deg) scaleX(-1);
    }
    25% {
      transform: translateX(5px) rotate(2deg) scaleX(-1);
    }
    50% {
      transform: translateX(0) rotate(0deg) scaleX(-1);
    }
    75% {
      transform: translateX(-5px) rotate(-2deg) scaleX(-1);
    }
  }

  @keyframes mermaidTailSwim {
    0% {
      left: -80px;
      bottom: -35px;
    }
    25% {
      left: 25%;
      bottom: -25px;
    }
    50% {
      left: 50%;
      bottom: -30px;
    }
    75% {
      left: 75%;
      bottom: -20px;
    }
    100% {
      left: 100%;
      bottom: -35px;
    }
  }

  @keyframes mermaidTailWiggle {
    0%,
    100% {
      transform: scaleY(1) skewX(0deg) rotate(0deg);
    }
    25% {
      transform: scaleY(0.9) skewX(-8deg) rotate(-3deg);
    }
    50% {
      transform: scaleY(1.1) skewX(0deg) rotate(0deg);
    }
    75% {
      transform: scaleY(0.9) skewX(8deg) rotate(3deg);
    }
  }

  @keyframes bubbleFloat {
    0% {
      transform: translateY(20px) scale(0.8);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-80px) scale(1.2);
      opacity: 0;
    }
  }

  .mermaid-tail {
    animation: mermaidSwim 6s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .mermaid-tail-left {
    animation: mermaidSwimLeft 8s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .wave-animation {
    position: absolute;
    bottom: -30px;
    left: 0px;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%);
    opacity: 0.8;
    clip-path: polygon(
      40% 100%,
      42% 90%,
      44% 80%,
      46% 70%,
      47% 60%,
      48% 50%,
      47% 40%,
      45% 30%,
      40% 25%,
      30% 20%,
      18% 15%,
      8% 10%,
      2% 5%,
      0% 0%,
      2% 2%,
      8% 5%,
      18% 8%,
      30% 12%,
      40% 15%,
      45% 18%,
      48% 22%,
      50% 25%,
      52% 22%,
      55% 18%,
      60% 15%,
      70% 12%,
      82% 8%,
      92% 5%,
      98% 2%,
      100% 0%,
      98% 5%,
      92% 10%,
      82% 15%,
      70% 20%,
      60% 25%,
      55% 30%,
      53% 40%,
      52% 50%,
      53% 60%,
      54% 70%,
      56% 80%,
      58% 90%,
      60% 100%
    );
    animation: mermaidTailSwim 10s linear infinite, mermaidTailWiggle 2.5s ease-in-out infinite;
  }

  .bubble {
    position: absolute;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(8, 145, 178, 0.6));
    border-radius: 50%;
    animation: bubbleFloat 4s ease-in-out infinite;
  }

  .bubble-1 {
    width: 8px;
    height: 8px;
    left: 20%;
    bottom: 0;
    animation-delay: 0s;
    animation-duration: 5s;
  }

  .bubble-2 {
    width: 6px;
    height: 6px;
    left: 40%;
    bottom: 0;
    animation-delay: -1.5s;
    animation-duration: 4s;
  }

  .bubble-3 {
    width: 10px;
    height: 10px;
    left: 60%;
    bottom: 0;
    animation-delay: -3s;
    animation-duration: 6s;
  }

  .bubble-4 {
    width: 5px;
    height: 5px;
    left: 80%;
    bottom: 0;
    animation-delay: -4.5s;
    animation-duration: 3.5s;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .mermaid-tail {
      width: 150px;
      height: 60px;
    }

    .mermaid-tail-left {
      width: 100px;
      height: 40px;
    }

    .wave-animation {
      width: 60px;
      height: 60px;
      bottom: -25px;
    }
  }
</style>
