<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
	import { Button, Icon, Subtitle } from '@imago/ui'
	import Extra from './extra.svelte'
	import { page } from '$app/state'
	import { invalidateAll } from '$app/navigation'
	import { getDataset } from '$lib/context/dataset.svelte'
	import { notify } from '$lib/stores/notify'
	import { APP_STATE } from '$lib/globals/state.svelte'

	const ctx = getDataset()
	let extras: { key: string; value: string; id: string; error: boolean }[] = $state(
		ctx.dataset.extras.length === 0
			? [{ key: '', value: '', id: getId(), error: false }]
			: ctx.dataset.extras.map((x) => ({ ...x, id: getId(), error: false }))
	)
	const id = `extras-${getId()}`
	const handleAddExtra = (index: number) => {
		if (extras[index - 1].key === '' || extras[index - 1].value === '') {
			notify.send(`Please fill out the last extra field.`)
			return
		}
		extras.push({ key: '', value: '', id: getId(), error: false })
		setTimeout(() => {
			const el = document.getElementById(`${id}-key-${index + 1}`)
			if (el) {
				el.focus()
			}
		}, 100)
	}
	const handleSave = async () => {
		APP_STATE.loading = true
		const res = await fetch(`/api/v1/datasets/${page.params.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				extras: extras
					.map((x) => ({ ...x, key: x.key.trim(), value: x.value.trim() }))
					.filter((x) => x.key !== '')
			})
		})
		APP_STATE.loading = false
		const data = await res.json()
		if (data?.dataset?.success === true) {
			notify.send(`Metadata successfully saved.`)
		} else {
			notify.send(`There's been an issue saving the metadata, please try again.`)
		}
		await invalidateAll()
	}
	$effect(() => {
		extras =
			ctx.dataset.extras.length === 0
				? [{ key: '', value: '', id: getId(), error: false }]
				: ctx.dataset.extras.map((x) => ({ ...x, id: getId(), error: false }))
	})
</script>

<div class="field-header">
	<Subtitle size="lg">Metadata</Subtitle>
	<div class="buttons">
		<Button
			type="button"
			onclick={() => {
				handleAddExtra(extras.length)
			}}
		>
			<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
		</Button>
	</div>
</div>

<div class="extras">
	<div class="extras-inputs">
		{#each extras as extra, index (extra.id)}
			<Extra {index} {id} bind:extra={extras[index]} bind:extras></Extra>
		{/each}
	</div>
	<div class="buttons">
		<Button
			style="alt"
			type="button"
			onclick={() => {
				invalidateAll()
			}}
		>
			Cancel
		</Button>
		<Button
			style="alt"
			type="button"
			onclick={() => {
				handleSave()
			}}
		>
			Save
		</Button>
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
	.extras {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.extras-inputs {
		display: grid;
		grid-auto-flow: row;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
