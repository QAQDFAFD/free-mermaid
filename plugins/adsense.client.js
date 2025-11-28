/**
 * Google AdSense 延迟加载插件
 * 优化首屏性能：在页面完全加载后才加载广告脚本
 */
export default defineNuxtPlugin(() => {
  if (!process.client) return

  let adsLoaded = false

  const loadAdsense = () => {
    if (adsLoaded) return
    adsLoaded = true

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6451531797615157'
    document.head.appendChild(script)
  }

  // 延迟加载策略：页面完全加载后 5 秒再加载广告
  // 这样不会影响首屏性能和用户体验
  if (document.readyState === 'complete') {
    setTimeout(loadAdsense, 5000)
  } else {
    window.addEventListener('load', () => {
      setTimeout(loadAdsense, 5000)
    }, { once: true })
  }
})

