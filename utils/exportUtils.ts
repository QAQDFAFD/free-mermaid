import { toPng, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'

export const exportAsPng = async (elementId: string) => {
	const element = document.getElementById(elementId)
	if (!element) return

	// 保存原始样式
	const originalTransform = element.style.transform
	const originalTransition = element.style.transition
	const originalOverflow = element.parentElement?.style.overflow

	try {
		// 临时重置样式，确保能捕获完整图表
		element.style.transform = 'scale(1) translate(0px, 0px)'
		element.style.transition = 'none'
		if (element.parentElement) {
			element.parentElement.style.overflow = 'visible'
		}

		// 等待样式变更应用
		await new Promise(resolve => setTimeout(resolve, 100))

		// 导出图片
		const dataUrl = await toPng(element, {
			quality: 1.0,
			pixelRatio: 2,
			backgroundColor: 'white',
			canvasWidth: element.scrollWidth,
			canvasHeight: element.scrollHeight,
			skipAutoScale: true,
			style: {
				transform: 'scale(1)'
			}
		})

		// 创建下载链接
		const link = document.createElement('a')
		link.download = `mermaid-diagram-${Date.now()}.png`
		link.href = dataUrl
		link.click()
	} catch (error) {
		console.error('导出为PNG失败:', error)
	} finally {
		// 恢复原始样式
		element.style.transform = originalTransform
		element.style.transition = originalTransition
		if (element.parentElement) {
			element.parentElement.style.overflow = originalOverflow || ''
		}
	}
}

export const exportAsSvg = async (elementId: string) => {
	const element = document.getElementById(elementId)
	if (!element) return

	// 获取内部SVG元素
	const svgElement = element.querySelector('svg')
	if (!svgElement) {
		console.error('没有找到SVG元素')
		return
	}

	try {
		// 直接从SVG元素生成SVG数据
		const svgData = new XMLSerializer().serializeToString(svgElement)
		const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
		const svgUrl = URL.createObjectURL(svgBlob)

		// 创建下载链接
		const link = document.createElement('a')
		link.download = `mermaid-diagram-${Date.now()}.svg`
		link.href = svgUrl
		link.click()

		// 释放URL
		setTimeout(() => {
			URL.revokeObjectURL(svgUrl)
		}, 100)
	} catch (error) {
		console.error('导出为SVG失败:', error)
	}
}
