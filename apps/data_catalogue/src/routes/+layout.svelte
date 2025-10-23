<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Loading from '$lib/ui/loading.svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { APP_STATE } from '$lib/globals/state.svelte'
	import { debug } from '$lib/globals/dev.svelte'
	let { children } = $props()
	beforeNavigate(() => {
		APP_STATE.loading = true
	})
	afterNavigate(() => {
		APP_STATE.loading = false
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{#if debug.status}
	<pre>loading: {APP_STATE.loading}</pre>
{/if}
{@render children?.()}
<Loading></Loading>
