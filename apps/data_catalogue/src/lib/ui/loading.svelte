<script lang="ts">
	import { APP_STATE } from '$lib/globals/state.svelte'
	import { slide } from 'svelte/transition'
</script>

{#if APP_STATE.loading}
	<div
		transition:slide
		id="lightbar"
		class={`lightbar ${APP_STATE.loading ? 'lightbar-loading' : ''}`}
	></div>
{/if}

<style>
	.lightbar {
		height: 0.5rem;
		width: 100lvw;
		background-color: var(--background);
		position: fixed;
		top: 0;
		left: 0;
		transform: translateY(-100%);
		transition:
			transform 0.3s 0.3s ease-in-out,
			border 0.3s ease-in-out;
		z-index: 9999;
	}

	.lightbar-loading {
		background: linear-gradient(
			to right,
			var(--background),
			var(--background-accent),
			var(--quinary),
			var(--quinary-accent),
			var(--quinary),
			var(--background-accent),
			var(--background)
		);
		background-size: 200% 100%;
		animation: moveGradient 1s linear infinite;
		transform: translateY(0%);
	}

	@keyframes moveGradient {
		0% {
			background-position: 100% center;
		}

		100% {
			background-position: -100% center;
		}
	}
</style>
