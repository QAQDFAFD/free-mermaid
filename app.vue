<template>
	<div>
		<MobileWarning />
		<NuxtPage />
	</div>
</template>

<script setup>
	import MobileWarning from '~/components/MobileWarning.vue'
</script>

<style>
	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
	}
</style>
