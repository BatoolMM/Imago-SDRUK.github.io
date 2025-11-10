<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { getDataset } from '$lib/context/dataset.svelte'
	import { notify } from '$lib/stores/notify'
	import { getId } from '@arturoguzman/art-ui'
	import { Subtitle, Button, Paragraph, Input, Text, Icon } from '@imago/ui'
	const dataset = getDataset()

	let { data } = $props()
	let tags: { display_name: string; id: string }[] = $state([])
</script>

<div class="field-header">
	<Subtitle size="lg">Tags</Subtitle>
	<div class="wrapper">
		<Button
			type="button"
			onclick={() => {
				tags.push({ display_name: '', id: getId() })
			}}
		>
			<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
		</Button>
	</div>
</div>
<form
	action="?/create_tag"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if ('data' in result) {
				notify.send(String(result.data?.message))
			}
			invalidateAll()
		}
	}}
>
	<div class="fields">
		{#each data.tags.result.filter( (_tag) => dataset.tags.find((at) => at.display_name === _tag) ) as tag}
			<div class="tag">
				<Paragraph>{tag}</Paragraph>
				<Button
					type="button"
					onclick={() => {
						const index = dataset.tags.findIndex((_tag) => _tag.name === tag)
						dataset.tags = [...dataset.tags.slice(0, index), ...dataset.tags.slice(index + 1)]
					}}
				>
					<Icon icon={{ icon: 'minus', set: 'tabler' }}></Icon>
				</Button>
			</div>
		{/each}

		{#each tags as tag, index (tag)}
			<div class="tag">
				<Input label="Title">
					<Text name="display_name" bind:value={tag.display_name}></Text>
				</Input>
				<Button
					type="button"
					onclick={() => {
						tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
					}}
				>
					<Icon icon={{ icon: 'minus', set: 'tabler' }}></Icon>
				</Button>
			</div>
		{/each}
	</div>
	<Button>Save</Button>
</form>

<style>
	.field-header {
		display: flex;
		justify-content: space-between;
	}
	.tag {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
