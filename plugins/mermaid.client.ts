import mermaid from 'mermaid'

export default defineNuxtPlugin(() => {
	mermaid.initialize({
		startOnLoad: false,
		theme: 'default',
		securityLevel: 'loose',
		fontFamily: 'monospace',
		fontSize: 16,
		flowchart: {
			htmlLabels: true,
			curve: 'linear'
		},
		sequence: {
			diagramMarginX: 50,
			diagramMarginY: 10,
			actorMargin: 50,
			width: 150,
			height: 65,
			boxMargin: 10,
			boxTextMargin: 5,
			noteMargin: 10,
			messageMargin: 35
		}
	})

	return {
		provide: {
			mermaid
		}
	}
})
