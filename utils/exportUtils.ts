import { toPng, toBlob } from 'html-to-image'
import { saveAs } from 'file-saver'

// 显示加载指示器
const showLoading = () => {
	// 获取当前语言，如果无法获取则默认使用中文
	const currentLang = localStorage.getItem('userLocale') || 'en'
	const loadingText = currentLang === 'zh' ? '导出图片中...' : 'Exporting image...'

	const loading = document.createElement('div')
	loading.id = 'export-loading'
	loading.style.position = 'fixed'
	loading.style.top = '50%'
	loading.style.left = '50%'
	loading.style.transform = 'translate(-50%, -50%)'
	loading.style.padding = '20px'
	loading.style.background = 'rgba(0,0,0,0.7)'
	loading.style.color = 'white'
	loading.style.borderRadius = '5px'
	loading.style.zIndex = '9999'
	loading.textContent = loadingText
	document.body.appendChild(loading)
	return loading
}

// 隐藏加载指示器
const hideLoading = (loading: HTMLElement) => {
	if (loading && loading.parentNode) {
		document.body.removeChild(loading)
	}
}

// 导出为PNG
export const exportAsPng = async (elementId: string) => {
	const loading = showLoading()

	try {
		const element = document.getElementById(elementId)
		if (!element) {
			console.error('Element not found:', elementId)
			return
		}

		// 查找SVG元素
		const svgElement = element.querySelector('svg')
		if (!svgElement) {
			console.error('SVG element not found inside:', elementId)
			return
		}

		// 使用html-to-image的toBlob方法直接从元素导出
		// 这个方法不会修改DOM，直接生成Blob对象
		const blob = await toBlob(svgElement as unknown as HTMLElement, {
			backgroundColor: '#ffffff',
			pixelRatio: 2,
			quality: 1,
			skipAutoScale: true, // 防止自动缩放
			cacheBust: true // 避免缓存问题
		})

		if (blob) {
			// 直接保存blob对象
			saveAs(blob, 'mermaid-drawing.png')
		} else {
			console.error('Failed to generate PNG blob')
		}
	} catch (error) {
		console.error('Error exporting PNG:', error)
	} finally {
		hideLoading(loading)
	}
}

// 导出为SVG
export const exportAsSvg = async (elementId: string) => {
	const loading = showLoading()

	try {
		const element = document.getElementById(elementId)
		if (!element) {
			console.error('Element not found:', elementId)
			return
		}

		// 查找SVG元素
		const svgElement = element.querySelector('svg')
		if (!svgElement) {
			console.error('SVG element not found inside:', elementId)
			return
		}

		// 直接从SVG元素获取SVG代码
		const svgContent = svgElement.outerHTML

		// 创建Blob和下载链接
		const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(blob, 'mermaid-drawing.svg')
	} catch (error) {
		console.error('Error exporting SVG:', error)
	} finally {
		hideLoading(loading)
	}
}
