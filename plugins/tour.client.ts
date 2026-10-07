// 按需加载 driver.js，仅在用户启动教程时加载
import type { PopoverDOM } from 'driver.js'

export default defineNuxtPlugin(nuxtApp => {
  // 检查是否是首次访问
  const hasSeenTour = useCookie('mermaid-tour-seen', { default: () => false })

  let driverObj: any = null

  const startTour = async (currentLocale?: string) => {
    // 如果已经有活跃的引导，先销毁它
    if (driverObj && driverObj.isActive()) {
      driverObj.destroy()
    }

    // 重置状态，允许重新启动引导
    hasSeenTour.value = false

    const locale = currentLocale || nuxtApp.vueApp.config.globalProperties.$i18n.locale || 'en'

    // Shared messages keep every supported language available to the tutorial.
    // driver.js consumes the progress template directly, without vue-i18n interpolation.
    const getLocaleMessages = nuxtApp.$getLocaleMessages as (language: string) => {
      tour?: typeof import('~/locales/en.json').tour
    }
    const messages = getLocaleMessages(locale)
    const t = messages.tour || getLocaleMessages('en').tour!

    // 动态导入 driver.js 及其样式，避免影响首屏性能
    const driverModule = await import('driver.js')
    await import('driver.js/dist/driver.css')
    const driver = (driverModule as any).driver || (driverModule as any).default || driverModule

    driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#mermaid-editor',
          popover: {
            title: t.steps.editor.title,
            description: t.steps.editor.description,
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#mermaid-preview',
          popover: {
            title: t.steps.preview.title,
            description: t.steps.preview.description,
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '.ai-trigger-btn',
          popover: {
            title: t.steps.ai.title,
            description: t.steps.ai.description,
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '.editor-toolbar',
          popover: {
            title: t.steps.toolbar.title,
            description: t.steps.toolbar.description,
            side: 'bottom',
            align: 'center'
          }
        }
      ],
      nextBtnText: t.buttons.next,
      prevBtnText: t.buttons.previous,
      doneBtnText: t.buttons.done,
      progressText: t.buttons.progress,
      onPopoverRender: (popover: PopoverDOM) => {
        popover.closeButton.setAttribute('aria-label', t.buttons.close)
      },
      onNextClick: (element: any, step: any, options: any) => {
        // 检查是否是最后一步
        if (driverObj.isLastStep()) {
          // 如果是最后一步，点击完成按钮
          hasSeenTour.value = true
          driverObj.destroy()
          return
        }
        // 否则继续到下一步
        driverObj.moveNext()
      },
      onCloseClick: () => {
        hasSeenTour.value = true
        driverObj.destroy()
      },
      onDestroyStarted: () => {
        hasSeenTour.value = true
      },
      // SEO友好的配置
      allowClose: true,
      stagePadding: 4,
      stageRadius: 8
    })

    // 延迟启动，确保页面完全加载
    setTimeout(() => {
      try {
        driverObj.drive()
      } catch (error) {
        console.warn('Driver.js initialization failed:', error)
      }
    }, 1000)
  }

  return {
    provide: {
      startTour
    }
  }
})
