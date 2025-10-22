<script lang="ts">
	import { browser } from '$app/environment'
	import { Paragraph } from '@imago/ui'
	import DOMPurify from 'dompurify'
	import { marked } from 'marked'
	import { onMount } from 'svelte'
	let { note, trim }: { note: string; trim?: number } = $props()
	let sanitised = $state('')
	onMount(async () => {
		let _note = note
		if (typeof trim === 'number') {
			_note = trim >= note.length ? note : `${note.slice(0, trim)}...`
		}
		let parsed = await marked.parse(_note.trim())

		sanitised = DOMPurify.sanitize(parsed)
	})
</script>

{#if browser}
	<Paragraph>{@html sanitised}</Paragraph>
{/if}

<style>
</style>
