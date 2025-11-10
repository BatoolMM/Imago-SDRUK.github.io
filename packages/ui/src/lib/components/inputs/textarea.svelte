<script lang="ts">
	import type { InputTextareaProps, InputTextProps } from './types'
	import { getId } from '@arturoguzman/art-ui'
	import Icon from '$lib/icons/icon.svelte'
	// import Button from '../buttons/button.svelte'
	let {
		value = $bindable<string>(),
		style = 'border',
		icon,
		...attrs
	}: InputTextareaProps = $props()
	const id = `text-input-${getId()}`
</script>

<div class="input-wrapper">
	<textarea data-icon={icon ? true : undefined} {id} bind:value {...attrs} data-style={style}
	></textarea>

	{#if icon}
		<div class="icon-wrapper">
			<Icon {icon}></Icon>
		</div>
	{/if}
</div>

<style>
	textarea {
		position: relative;
		border-radius: 0.35rem;
		overflow: hidden;
		padding: 0.5rem 0.35rem;
		background-color: var(--background);
		border: 1px solid transparent;
		transition: border 0.3s ease-in-out;
		transition: color 0.3s ease-in-out;
		color: var(--text);
		width: 100%;
		font-family: var(--paragraph);
	}
	textarea[data-icon] {
		padding: 0.5rem 1.5rem;
	}
	textarea[data-icon]:focus {
		padding: 0.5rem 0.35rem;
	}
	textarea[data-style='border'] {
		border: 1px solid var(--border);
	}
	textarea[data-style='border']:focus {
		border: 1px solid var(--text);
	}
	textarea[data-icon]:focus ~ .icon-wrapper {
		display: none;
	}
	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		position: relative;
	}
	.icon-wrapper {
		position: absolute;
		top: 50%;
		left: 0.25rem;
		transform: translate(0%, -50%);
		z-index: 1;
		pointer-events: none;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.buttons {
		display: flex;
		gap: 0.25rem;
	}
	@media (min-width: 768px) {
		textarea {
			font-size: 0.9rem;
		}
		textarea:focus {
			font-size: 1rem;
			padding: 0.359rem 0.35rem;
		}
		textarea[data-icon]:focus {
			padding: 0.359rem 0.35rem;
		}
	}
</style>
