<script lang="ts">
	import Input from './input.svelte'
	import type { InputSelectProps } from './types'

	let {
		value = $bindable<string>(),
		id,
		name,
		children,
		disabled = false,
		options = [],
		placeholder = 'Select options',
		design_type = 'dropdown',
		...attrs
	}: InputSelectProps = $props()

	const handleChange = (val: string) => {
		value = val
	}
</script>

<Input {id} {...attrs}>
	{#if design_type === 'dropdown'}
		<select {name} bind:value {id} {disabled} {...attrs}>
			<option disabled selected>{placeholder}</option>
			{#each options as option, idx (idx)}
				<option value={option.value}>{option.label}</option>
			{/each}
			{#if children}
				{@render children()}
			{/if}
		</select>
	{:else if design_type === 'list'}
		<div class="radio-list">
			{#each options as option, idx (idx)}
				<label class="radio-item">
					<input
						type="radio"
						{name}
						value={option.value}
						checked={value === option.value}
						{disabled}
						onchange={() => handleChange(option.value)}
					/>
					<span>{option.label}</span>
				</label>
			{/each}
		</div>
	{/if}
</Input>

<style>
	select {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		padding: 0.45rem 0.6rem;
		border: 1px solid var(--border);
		transition: all 0.3s ease-in-out;
		color: currentColor;
		width: 100%;
		font-size: 0.9rem;
		font-family: var(--paragraph);
		background-color: var(--background);
	}

	.radio-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.radio-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
</style>
