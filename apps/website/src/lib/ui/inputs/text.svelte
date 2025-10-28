<script lang="ts">
	import type { FocusEventHandler, KeyboardEventHandler } from 'svelte/elements'
	let {
		key,
		design = 1,
		value,
		onfocusin,
		onfocusout,
		onkeypress,
		onblur,
		current_colour
	}: {
		key: string
		design: 1 | 2 | 3 | 4
		value?: string
		onfocusin?: FocusEventHandler<HTMLInputElement>
		onfocusout?: FocusEventHandler<HTMLInputElement>
		onkeypress?: KeyboardEventHandler<HTMLInputElement>
		onblur?: FocusEventHandler<HTMLInputElement>
		current_colour?: boolean
	} = $props()
</script>

<input
	name={key}
	id={key}
	type="text"
	class="text-{design}"
	data-current-colour={current_colour ? current_colour : undefined}
	bind:value
	{onfocusin}
	{onfocusout}
	{onkeypress}
	{onblur}
/>

<style>
	input {
		font-family: var(--theme-font-title);
		border: transparent;
		background-color: transparent;
		border-radius: 0.35rem;
		transition: background 0.3s ease-in-out;
		/* padding: 0 0.25rem; */
		width: 100%;
	}
	input[data-current-colour] {
		color: currentColor;
	}
	input:focus {
		outline: none !important;
	}
</style>
