<template>
  <div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
    <!-- 工具栏骨架 -->
    <div class="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
      <div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="flex-1"></div>
      <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>

    <!-- 主内容区域骨架 -->
    <main class="flex flex-1 overflow-hidden">
      <!-- 左侧编辑器骨架 -->
      <section class="w-[30%] h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="h-10 bg-gray-100 dark:bg-gray-800 px-4 flex items-center border-b border-gray-200 dark:border-gray-700">
          <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div class="flex-1 bg-white dark:bg-gray-900 p-4 space-y-2">
          <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </section>

      <!-- 右侧预览骨架 -->
      <section class="flex-1 h-full flex flex-col">
        <div class="h-10 bg-gray-100 dark:bg-gray-800 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="flex gap-2">
            <div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div class="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center">
          <div class="w-64 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer 骨架 -->
    <footer class="h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
      <div class="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯静态骨架屏组件，无需任何逻辑
</script>

