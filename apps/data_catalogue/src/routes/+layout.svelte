<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Loading from '$lib/ui/loading.svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { APP_STATE } from '$lib/globals/state.svelte'
	import { Notification, Paragraph } from '@imago/ui'
	import { notify } from '$lib/stores/notify'
	import { DateTime } from 'luxon'
	let { data, children } = $props()
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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
<Loading></Loading>
<Notification {notify} />
{#if remaining_time}
	<div class="remaining">
		<Paragraph>Remaining session time: {remaining_time}</Paragraph>
	</div>
{/if}

<style>
	.remaining {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}
</style>
