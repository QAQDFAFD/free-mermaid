import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export default defineNuxtPlugin(() => {
  // 检查是否是首次访问
  const hasSeenTour = useCookie('mermaid-tour-seen', { default: () => false })

  let driverObj: any = null

  const startTour = (currentLocale?: string) => {
    // 如果已经有活跃的引导，先销毁它
    if (driverObj && driverObj.isActive()) {
      driverObj.destroy()
    }

    // 重置状态，允许重新启动引导
    hasSeenTour.value = false

    // 获取当前语言设置
    let locale = currentLocale || 'zh' // 使用传入的语言参数，否则默认中文

    if (!currentLocale && process.client) {
      // 如果没有传入语言参数，从localStorage获取
      locale = localStorage.getItem('userLocale') || 'zh'
    }

    // 移除调试日志，生产环境使用
    // console.log('Tour starting with locale:', locale, 'passed locale:', currentLocale)

    // 根据语言获取翻译文本
    const translations: any = {
      zh: {
        buttons: {
          next: '下一步',
          previous: '上一步',
          done: '完成引导',
          progress: '{{current}} / {{total}}'
        },
        steps: {
          editor: {
            title: '🎨 Mermaid 编辑器',
            description:
              '在这里输入您的 Mermaid 图表代码，支持 Graph TD 流程图、时序图、类图等多种图表类型。完全免费的在线 Mermaid 编辑器。'
          },
          preview: {
            title: '👀 实时预览',
            description: '您的图表会在这里实时渲染显示，支持缩放和导出功能。最佳的 Mermaid 图表在线预览体验。'
          },
          toolbar: {
            title: '🛠️ 工具栏',
            description: '快速插入常用图表模板，包括流程图、时序图、类图等。提高您的 Mermaid 图表创作效率。'
          }
        }
      },
      en: {
        buttons: {
          next: 'Next',
          previous: 'Previous',
          done: 'Finish Tour',
          progress: '{{current}} / {{total}}'
        },
        steps: {
          editor: {
            title: '🎨 Mermaid Editor',
            description:
              'Enter your Mermaid diagram code here. Supports Graph TD flowcharts, sequence diagrams, class diagrams and more. Completely free online Mermaid editor.'
          },
          preview: {
            title: '👀 Live Preview',
            description:
              'Your diagrams are rendered here in real-time with zoom and export features. The best Mermaid diagram online preview experience.'
          },
          toolbar: {
            title: '🛠️ Toolbar',
            description:
              'Quickly insert common diagram templates including flowcharts, sequence diagrams, class diagrams and more. Boost your Mermaid diagram creation efficiency.'
          }
        }
      },
      ru: {
        buttons: {
          next: 'Далее',
          previous: 'Назад',
          done: 'Завершить обучение',
          progress: '{{current}} / {{total}}'
        },
        steps: {
          editor: {
            title: '🎨 Редактор Mermaid',
            description:
              'Введите здесь код диаграммы Mermaid. Поддерживает Graph TD блок-схемы, диаграммы последовательности, диаграммы классов и многое другое. Полностью бесплатный онлайн редактор Mermaid.'
          },
          preview: {
            title: '👀 Просмотр в реальном времени',
            description:
              'Ваши диаграммы отображаются здесь в реальном времени с функциями масштабирования и экспорта. Лучший опыт онлайн просмотра диаграмм Mermaid.'
          },
          toolbar: {
            title: '🛠️ Панель инструментов',
            description:
              'Быстро вставляйте общие шаблоны диаграмм, включая блок-схемы, диаграммы последовательности, диаграммы классов и другие. Повысьте эффективность создания диаграмм Mermaid.'
          }
        }
      },
      fr: {
        buttons: {
          next: 'Suivant',
          previous: 'Précédent',
          done: 'Terminer le tutoriel',
          progress: '{{current}} / {{total}}'
        },
        steps: {
          editor: {
            title: '🎨 Éditeur Mermaid',
            description:
              'Saisissez ici votre code de diagramme Mermaid. Prend en charge les organigrammes Graph TD, les diagrammes de séquence, les diagrammes de classe et bien plus encore. Éditeur Mermaid en ligne entièrement gratuit.'
          },
          preview: {
            title: '👀 Aperçu en temps réel',
            description:
              "Vos diagrammes sont rendus ici en temps réel avec des fonctionnalités de zoom et d'exportation. La meilleure expérience d'aperçu de diagrammes Mermaid en ligne."
          },
          toolbar: {
            title: "🛠️ Barre d'outils",
            description:
              'Insérez rapidement des modèles de diagrammes courants, y compris des organigrammes, des diagrammes de séquence, des diagrammes de classe et plus encore. Augmentez votre efficacité de création de diagrammes Mermaid.'
          }
        }
      },
      th: {
        buttons: {
          next: 'ถัดไป',
          previous: 'ก่อนหน้า',
          done: 'เสร็จสิ้นบทแนะนำ',
          progress: '{{current}} / {{total}}'
        },
        steps: {
          editor: {
            title: '🎨 เครื่องมือแก้ไข Mermaid',
            description:
              'ป้อนโค้ดไดอะแกรม Mermaid ของคุณที่นี่ รองรับผังงาน Graph TD, ไดอะแกรมลำดับ, ไดอะแกรมคลาส และอื่นๆ อีกมากมาย เครื่องมือแก้ไข Mermaid ออนไลน์ฟรีโดยสมบูรณ์'
          },
          preview: {
            title: '👀 ตัวอย่างแบบเรียลไทม์',
            description:
              'ไดอะแกรมของคุณจะแสดงที่นี่แบบเรียลไทม์พร้อมฟีเจอร์ซูมและเอ็กซ์พอร์ต ประสบการณ์การดูตัวอย่างไดอะแกรม Mermaid ออนไลน์ที่ดีที่สุด'
          },
          toolbar: {
            title: '🛠️ แถบเครื่องมือ',
            description:
              'แทรกเทมเพลตไดอะแกรมทั่วไปอย่างรวดเร็ว รวมถึงผังงาน, ไดอะแกรมลำดับ, ไดอะแกรมคลาส และอื่นๆ เพิ่มประสิทธิภาพการสร้างไดอะแกรม Mermaid ของคุณ'
          }
        }
      }
    }

    const t = translations[locale] || translations.zh

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
