<script lang="ts">
	import '../app.css'
	import Loading from '$lib/ui/loading.svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { APP_STATE } from '$lib/globals/state.svelte'
	import { Footer, Notification, Paragraph } from '@imago/ui'
	import { notify } from '$lib/stores/notify'
	import { DateTime } from 'luxon'
	import { getId } from '@arturoguzman/art-ui'
	import { onMount } from 'svelte'
	import { env } from '$env/dynamic/public'
	let { data, children } = $props()
	const footer_id = `footer-${getId()}`
	let footer_height = $state(0)
	beforeNavigate(() => {
		APP_STATE.loading = true
	})
	afterNavigate(() => {
		APP_STATE.loading = false
	})
	let remaining_time: string | null = $state(null)
	const calcRemaining = (str?: string) => {
		if (!str) {
			return null
		}
		const minutes = DateTime.fromISO(str).diffNow('minutes')
		if (minutes.minutes > 0) {
			remaining_time = `${minutes.toFormat('mm:ss')}`
			requestAnimationFrame(() => {
				calcRemaining(str)
			})
		} else {
			remaining_time = null
			return
		}
	}
	$effect(() => {
		calcRemaining(data.expire)
	})
	onMount(() => {
		const el = document.getElementById(footer_id)
		if (el) {
			footer_height = el.clientHeight
		}
	})
</script>

<svelte:head>
	<title>Imago - Data catalogue</title>
	<link rel="icon" href="/favicon.png" />
	{#if env.PUBLIC_NODE_ENV === 'production'}
		<script
			defer
			src="https://events.imago.ac.uk/script.js"
			data-website-id="d84c7036-b0ee-4dc4-847e-f036e0db4973"
		></script>
	{/if}
</svelte:head>
<main style:--footer-height={`${footer_height}px`}>
	{@render children?.()}
</main>
<Loading></Loading>
<Notification {notify} />
{#if remaining_time}
	<div class="remaining">
		<Paragraph>Remaining session time: {remaining_time}</Paragraph>
	</div>
{/if}

<Footer id={footer_id}></Footer>

<style>
	main {
		min-height: calc(100lvh - var(--footer-height));
	}
	.remaining {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}
</style>
