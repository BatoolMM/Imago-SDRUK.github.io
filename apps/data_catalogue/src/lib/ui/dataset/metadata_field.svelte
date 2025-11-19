<script lang="ts">
	import { METADATA_LABELS } from '$lib/globals/datasets'
	import { Input, Text, Paragraph, Icon, Button } from '@imago/ui'

	let {
		id,
		index,
		extra = $bindable(),
		extras = $bindable()
	}: {
		id: string
		index: number
		extra: { id: string; key: string; value: string; error: boolean }
		extras: { id: string; key: string; value: string; error: boolean }[]
	} = $props()
</script>

<div class="extra">
	<div class="extra-inputs">
		<Input label={METADATA_LABELS[extras[index].key] ?? extras[index].key}>
			{#snippet message()}
				{#if extra.error}
					<Paragraph></Paragraph>
				{/if}
			{/snippet}
			<Text id={`${id}-value-${index}`} bind:value={extras[index].value} type="text"></Text>
		</Input>
	</div>
</div>

<style>
	.extra {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		gap: 1rem;
		align-items: center;
	}
	.extra-inputs {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 0.5rem;
	}
</style>
