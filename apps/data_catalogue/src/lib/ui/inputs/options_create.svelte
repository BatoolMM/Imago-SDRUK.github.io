<script lang="ts">
	import { getId, jstr } from '@arturoguzman/art-ui'
	import { Button, Icon, Paragraph } from '@imago/ui'
	import { notify } from '$lib/stores/notify'
	import { APP_STATE } from '$lib/globals/state.svelte'
	import Option from './option.svelte'
	let {
		options = $bindable([{ label: '', id: getId(), value: '', error: false }]),
		name,
		handleSave
	}: {
		options?: { label: string; value: string; id: string; error: boolean }[]
		name?: string
		handleSave?: (
			options: { label: string; value: string; id: string; error: boolean }[]
		) => void | Promise<void>
	} = $props()
	const id = `options-${getId()}`
	const handleAddOption = (index: number) => {
		if (options[index - 1].label === '' || options[index - 1].value === '') {
			notify.send(`Please fill out the last entry.`)
			return
		}
		options.push({ label: '', value: '', id: getId(), error: false })
		setTimeout(() => {
			const el = document.getElementById(`${id}-label-${index + 1}`)
			if (el) {
				el.focus()
			}
		}, 100)
	}
	// const handleSave = async () => {
	// 	APP_STATE.loading = true
	// 	const res = await fetch(`/api/v1/datasets/${page.params.id}`, {
	// 		method: 'PATCH',
	// 		body: JSON.stringify({
	// 			options: options
	// 				.map((x) => ({ ...x, label: x.label.trim(), value: x.value.trim() }))
	// 				.filter((x) => x.label !== '')
	// 		})
	// 	})
	// 	APP_STATE.loading = false
	// 	const data = await res.json()
	// 	if (data?.dataset?.success === true) {
	// 		notify.send(`Metadata successfully saved.`)
	// 	} else {
	// 		notify.send(`There's been an issue saving the metadata, please try again.`)
	// 	}
	// 	await invalidateAll()
	// }
	// $effect(() => {
	// 	options =
	// 		ctx.dataset.options.length === 0
	// 			? [{ label: '', value: '', id: getId(), error: false }]
	// 			: ctx.dataset.options.map((x) => ({ ...x, id: getId(), error: false }))
	// })
</script>

<div class="field-header">
	<Paragraph>Options</Paragraph>
	<div class="buttons">
		<Button
			type="button"
			onclick={() => {
				handleAddOption(options.length)
			}}
		>
			<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
		</Button>
	</div>
</div>

<div class="options">
	<input {name} type="text" value={JSON.stringify(options)} hidden />
	<div class="options-inputs">
		{#each options as extra, index (extra.id)}
			<Option {index} {id} bind:option={options[index]} bind:options></Option>
		{/each}
	</div>
</div>

<style>
	.field-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.buttons {
		display: flex;
		gap: 0.5rem;
	}
	.options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.options-inputs {
		display: grid;
		grid-auto-flow: row;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
