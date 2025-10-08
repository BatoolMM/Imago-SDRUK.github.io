<script lang="ts">
	import { notify } from '$lib/stores/notify'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { observeRoot } from '$lib/utils/observer.svelte'
	import { Notification } from '@imago/ui'
	let { children } = $props()
</script>

<div class="screen" use:observeRoot></div>
<Nav></Nav>
<main id="main">
	{@render children()}
</main>
<Footer></Footer>
<Notification {notify}></Notification>

<style>
</style>
