<script lang="ts">
	let {
		id,
		label_size = 'md',
		label = '',
		required
	}: {
		id?: string
		label_size?: 'sm' | 'md' | 'lg'
		label?: string
		required?: boolean
	} = $props()
</script>

<label
	for={id}
	class="input-label"
	data-required={required ? required : undefined}
	data-size={label_size}
>
	{label}
</label>

<style>
	.input-label {
		font-size: clamp(0.9rem, 0.875rem + 0.125vw, 0.975rem);
		font-family: var(--subtitle);
	}

	.input-label[data-size='lg'] {
		font-size: clamp(0.85rem, 0.625rem + 0.4688vw, 1rem);
	}
	.input-label[data-size='md'] {
		font-size: clamp(0.8rem, 0.767rem + 0.167vw, 0.9rem);
	}
	.input-label[data-size='sm'] {
		font-size: clamp(0.75rem, 0.717rem + 0.167vw, 0.85rem);
	}

	label[data-required]::after {
		content: ' *';
		color: color-mix(in oklab, var(--highlight) 60%, var(--background) 40%);
	}
</style>
