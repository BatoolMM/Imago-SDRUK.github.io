<script lang="ts">
	import type { BaseNumberInputProps } from './types'
	import type { MouseEventHandler } from 'svelte/elements'
	import Icon from '$lib/icons/icon.svelte'
	import Button from '../buttons/button.svelte'
	import { isItANumber } from '@arturoguzman/art-ui'
	let {
		onfocusin,
		onfocusout,
		onkeydown,
		onkeyup,
		onblur,
		current_colour,
		id,
		name,
		value = $bindable(),
		'aria-invalid': aria_invalid,
		min,
		max,
		step,
		buttons
	}: BaseNumberInputProps = $props()
	const rgx = /^-?[0-9]\d*(\.\d+)?$/

	const exceptions = ['Enter', 'Backspace', 'Meta', 'Shift', 'Control', 'Alt', '-', 'Tab']
	const handleUp: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = () => {
		if (value === null || value === undefined) {
			value = min ?? 1
		}

		if (typeof value === 'string') {
			value = Number(value)
		}
		if (isItANumber(value) && typeof value === 'number') {
			if (max && value >= max) {
				return
			}
			value += step ?? 1
		}
	}

	const handleDown: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = () => {
		if (value === null || value === undefined) {
			value = min ?? 1
		}

		if (typeof value === 'string') {
			value = Number(value)
		}
		if (isItANumber(value) && typeof value === 'number') {
			if (min && value <= min) {
				return
			}
			value -= step ?? 1
		}
	}
</script>

<div class="numerical">
	<input
		aria-invalid={aria_invalid}
		{name}
		{id}
		type="number"
		data-current-colour={current_colour ? current_colour : undefined}
		{max}
		{min}
		{step}
		bind:value
		{onfocusin}
		{onfocusout}
		onkeydown={(e) => {
			onkeydown?.(e)
			if (!exceptions.includes(e.key) && !rgx.test(e.key)) {
				e.preventDefault()
				return
			}
		}}
		{onkeyup}
		{onblur}
	/>
	{#if buttons}
		<div class="buttons">
			<Button
				type="button"
				onpointerdown={handleDown}
				disabled={min && Number(value) <= min ? true : undefined}
			>
				<Icon icon={{ icon: 'minus', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				onpointerdown={handleUp}
				disabled={max && Number(value) >= max ? true : undefined}
			>
				<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
			</Button>
		</div>
	{/if}
</div>

<style>
	input {
		font-family: var(--paragraph);
		border: transparent;
		background-color: transparent;
		border-radius: 0.35rem;
		transition: background var(--animation-time) ease-in-out;
		width: 100%;
		color: var(--text);
		border: 1px solid var(--border);
		padding: 0.5rem 0.75rem;
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[data-current-colour] {
		color: currentColor;
	}
	input:focus {
		outline: none !important;
	}
	.numerical {
		display: flex;
		gap: 1rem;
	}
	.buttons {
		display: flex;
		gap: 0.5rem;
	}
</style>
