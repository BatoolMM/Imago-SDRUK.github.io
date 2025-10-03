<script lang="ts">
	import { notify } from '$lib/stores/notify.js'
	import { jstr } from '@arturoguzman/art-ui'
	import { slide } from 'svelte/transition'
</script>

<div class="notifications">
	{#each $notify as notification (notification)}
		<button
			onclick={() => {
				clearTimeout(notification.cancel)
				notify.remove(notification.id)
			}}
			transition:slide
			class="notification"
			style:--duration={`${notification.duration}ms`}
		>
			<p>{notification.status ? `${notification.status}: ` : ''}{notification.message}</p>
		</button>
	{/each}
</div>

<style>
	.notification {
		border: 1px solid var(--theme-colour-highlight);
		color: var(--theme-colour-text);
		background-color: var(--theme-colour-background);
		padding: 1rem;
		border-radius: 0.35rem;
		cursor: pointer;
		/* box-shadow: 2px 2px var(--theme-colour-text); */
		position: relative;
		overflow: hidden;
		font-family: var(--theme-font-title);
		flex-shrink: 0;
	}
	.notification::after {
		content: '';
		position: absolute;
		bottom: 0rem;
		left: 0rem;
		width: 0%;
		height: 0.35rem;
		background-color: var(--theme-colour-highlight);
		animation: progress var(--duration) forwards linear;
		flex-shrink: 0;
	}

	@keyframes progress {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	.notifications {
		position: fixed;
		top: 4rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 1000;
	}
	@media (min-width: 768px) {
		.notifications {
			top: 2rem;
			right: 2rem;
			height: calc(100lvh - 4rem);
			overflow-y: scroll;
			scrollbar-width: none;
		}
	}
</style>
