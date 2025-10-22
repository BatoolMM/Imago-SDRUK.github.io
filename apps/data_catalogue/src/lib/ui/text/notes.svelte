<script lang="ts">
	import { browser } from '$app/environment'
	import { Paragraph } from '@imago/ui'
	import DOMPurify from 'dompurify'
	import { marked } from 'marked'
	import { onMount } from 'svelte'
	let { str }: { str: string } = $props()
	let sanitised = $state('')
	onMount(async () => {
		const parsed = await marked.parse(str)
		sanitised = DOMPurify.sanitize(parsed)
	})
</script>

{#if browser}
	<Paragraph>{@html sanitised}</Paragraph>
{/if}

<style>
</style>
