<script lang="ts">
	import type { IconsSets } from './icons.js'
	let { icon }: { icon: IconsSets } = $props()
</script>

<span
	data-size={'size' in icon ? icon.size : undefined}
	class="icon icon--{icon.set} {'size' in icon
		? `icon--${icon.set}--${icon.size}`
		: ''} icon--{icon.set}--{icon.icon}"
></span>

<style>
	span[data-size='sm'] {
		font-size: clamp(0.85rem, 0.8rem + 0.125vw, 0.884rem);
	}
	span[data-size='md'] {
		font-size: clamp(0.9rem, 0.875rem + 0.125vw, 0.975rem);
	}
	span[data-size='lg'] {
		font-size: clamp(1.15rem, 0.983rem + 0.833vw, 1.65rem);
	}
</style>
