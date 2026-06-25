<script lang="ts">
	import type { InputDateProps } from './types'

	let {
		name,
		id,
		value = $bindable(),
		width = 'auto',
		'aria-label': aria_label
	}: InputDateProps = $props()
</script>

<input aria-label={aria_label} type="date" data-width={width} {name} {id} bind:value />

<style>
	input {
		position: relative;
		border-radius: 0.35rem;
		overflow: hidden;
		padding: 0.5rem 0.35rem;
		background-color: var(--background);
		border: 1px solid var(--border);
		transition: all 0.3s ease-in-out;
		color: var(--text);
		font-family: var(--paragraph);
	}
	input[data-width='full'] {
		width: 100%;
	}
</style>
