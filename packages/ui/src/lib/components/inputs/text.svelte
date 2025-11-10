<script lang="ts">
	import type { InputTextProps } from './types'
	import { getId } from '@arturoguzman/art-ui'
	import Icon from '$lib/icons/icon.svelte'
	import Button from '../buttons/button.svelte'
	let {
		value = $bindable<string>(),
		style = 'border',
		type,
		icon,
		...attrs
	}: InputTextProps = $props()
	const id = `text-input-${getId()}`
	let password_visible = $state(false)
</script>

<div class="input-wrapper">
	{#if type === 'password'}
		{#if password_visible}
			<input
				data-icon={icon ? true : undefined}
				{id}
				type="text"
				bind:value
				{...attrs}
				data-style={style}
			/>
		{/if}
		{#if !password_visible}
			<input
				data-icon={icon ? true : undefined}
				{id}
				type="password"
				bind:value
				{...attrs}
				data-style={style}
			/>
		{/if}
		<div class="buttons">
			<Button
				type="button"
				active={password_visible}
				onclick={() => {
					password_visible = !password_visible
				}}
			>
				<Icon icon={{ icon: password_visible ? 'view' : 'view-off', set: 'hugeicons' }}></Icon>
			</Button>
		</div>
	{/if}
	{#if type !== 'password'}
		<input
			data-icon={icon ? true : undefined}
			{id}
			bind:value
			{...attrs}
			data-style={style}
			{type}
		/>
	{/if}
	{#if icon}
		<div class="icon-wrapper">
			<Icon {icon}></Icon>
		</div>
	{/if}
</div>

<style>
	input {
		position: relative;
		border-radius: 0.35rem;
		overflow: hidden;
		padding: 0.5rem 0.35rem;
		background-color: var(--background);
		border: 1px solid transparent;
		transition: all 0.3s ease-in-out;
		color: var(--text);
		width: 100%;
		font-family: var(--paragraph);
	}
	input[data-icon] {
		padding: 0.5rem 1.5rem;
	}
	input[data-icon]:focus {
		padding: 0.5rem 0.35rem;
	}
	input[data-style='border'] {
		border: 1px solid var(--border);
	}
	input[data-style='border']:focus {
		border: 1px solid var(--text);
	}
	input[data-icon]:focus ~ .icon-wrapper {
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
		input {
			font-size: 0.9rem;
		}
		input:focus {
			font-size: 1rem;
			padding: 0.359rem 0.35rem;
		}
		input[data-icon]:focus {
			padding: 0.359rem 0.35rem;
		}
	}
</style>
