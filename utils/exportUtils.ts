import { toPng, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'

export const exportAsPng = async (elementId: string, fileName: string = 'mermaid-diagram') => {
	try {
		const element = document.getElementById(elementId)
		if (!element) throw new Error('Element not found')

		const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 2 })
		saveAs(dataUrl, `${fileName}.png`)
		return true
	} catch (error) {
		console.error('导出 PNG 失败:', error)
		return false
	}
}

export const exportAsSvg = async (elementId: string, fileName: string = 'mermaid-diagram') => {
	try {
		const element = document.getElementById(elementId)
		if (!element) throw new Error('Element not found')

		const dataUrl = await toSvg(element)
		saveAs(dataUrl, `${fileName}.svg`)
		return true
	} catch (error) {
		console.error('导出 SVG 失败:', error)
		return false
	}
}
