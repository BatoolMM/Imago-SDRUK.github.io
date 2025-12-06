<script lang="ts">
	import type { IdentityNode } from '$lib/utils/auth/types'
	import { Button } from '@imago/ui'

	let {
		form_buttons,
		buttons
	}: {
		form_buttons: IdentityNode[]
		buttons: IdentityNode[]
	} = $props()
</script>

{#if form_buttons.length > 0 || buttons.length > 0}
	<div class="group-buttons">
		{#each buttons as node}
			{#if node.type === 'a'}
				<Button
					onclick={() => {
						if (node.attributes?.value === 'previous') {
							window.history.back()
						}
					}}
					type={node.attributes?.value === 'previous' ? 'button' : undefined}
					href={node.attributes.href}>{node.meta.label?.text}</Button
				>
			{/if}
			{#if node.attributes?.type === 'submit'}
				<Button type="submit" form="alt-form">{node.meta.label?.text}</Button>
			{/if}
		{/each}
		{#each form_buttons as node}
			<input type="text" hidden name={node.attributes.name} value={node.attributes.value} />
			{#if node.attributes?.type !== 'hidden'}
				<Button
					onclick={() => {
						if (node.attributes?.value === 'previous') {
							window.history.back()
						}
					}}
					type={node.attributes?.value === 'previous' ? 'button' : undefined}
					href={node.attributes.href}>{node.meta.label?.text}</Button
				>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.group-buttons {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		gap: 1rem;
	}
</style>
