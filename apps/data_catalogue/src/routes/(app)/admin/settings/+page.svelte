<script lang="ts">
	import { page } from '$app/state'
	import { BaseSection, Button, Title } from '@imago/ui'
	let { data } = $props()
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.routes {
		display: grid;
		gap: 1rem;
	}
</style>
