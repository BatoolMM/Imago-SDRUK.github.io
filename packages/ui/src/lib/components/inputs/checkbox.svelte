<script>
	/**
	 * @typedef Props
	 * @property {string} [name]
	 * @property {string} [id]
	 * @property {boolean|null} [checked]
	 * @property {boolean} [required]
	 * @property {import("svelte/elements").ChangeEventHandler<HTMLInputElement>} [onchange]
	 * @property {import('svelte/elements').FocusEventHandler<HTMLInputElement>} [onfocusin]
	 * @property {import('svelte/elements').FocusEventHandler<HTMLInputElement>} [onfocusout]
	 * @property {import('svelte/elements').KeyboardEventHandler<HTMLInputElement>} [onkeypress]
	 * @property {import('svelte/elements').KeyboardEventHandler<HTMLInputElement>} [onkeydown]
	 * @property {import('svelte/elements').FocusEventHandler<HTMLInputElement>} [onblur]
	 *
	 **/

	/**
	 * @type Props
	 **/

	let {
		name,
		id,
		checked = $bindable(),
		required = $bindable(),
		onchange,
		onfocusin,
		onfocusout,
		onkeydown,
		onkeypress,
		onblur
	} = $props()
</script>

<input
	bind:checked
	class:active={checked}
	type="checkbox"
	{required}
	{id}
	{name}
	{onchange}
	{onfocusin}
	{onfocusout}
	{onkeydown}
	{onkeypress}
	{onblur}
/>

<style>
	input {
		cursor: pointer;
		appearance: none;
		position: relative;
		display: inline-block;
		background: lightgrey;
		height: 1.4rem;
		width: 2.5rem;
		vertical-align: middle;
		border-radius: 2.2rem;
		box-shadow: 0px 1px 3px #0003 inset;
		transition: 0.25s linear background;
	}
	input::before {
		content: '';
		display: block;
		width: 1rem;
		height: 1rem;
		background: #fff;
		border-radius: 1.2rem;
		position: absolute;
		top: 0.2rem;
		left: 0.2rem;
		box-shadow: 0px 1px 3px #0003;
		transition: 0.25s linear transform;
		transform: translateX(0rem);
	}
	.active {
		background: green;
	}
	.active::before {
		transform: translateX(1rem);
	}
</style>
