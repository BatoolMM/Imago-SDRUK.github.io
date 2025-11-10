<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
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
	const findDuplicates = (key: string) => {
		const existing = extras.filter((x) => x.key.toLowerCase() === key.toLowerCase())
		if (existing.length > 1) {
			return true
		}
		return false
	}
	const findErrors = () => {
		if (extra) {
			const existing = extras.filter((x) => x.key.toLowerCase() === extra.key.toLowerCase())
			if (existing.length > 1) {
				existing.forEach((x) => (x.error = true))
			}
		}
	}
	const cleanErrors = () => {
		if (extra) {
			const existing = extras.filter((x) => x.error)
			existing.forEach((x) => (x.error = findDuplicates(x.key)))
		}
	}
	const handleAddExtra = (index: number) => {
		if (index === extras.length - 1) {
			extras.push({ key: '', value: '', id: getId(), error: false })
		}
		setTimeout(() => {
			const el = document.getElementById(`${id}-key-${index + 1}`)
			if (el) {
				el.focus()
			}
		}, 1)
	}
	const handleBackspace = ({ index, key }: { index: number; key: 'key' | 'value' }) => {
		if (key === 'value') {
			if (extras[index].value === '') {
				const el = document.getElementById(`${id}-key-${index}`)
				if (el) {
					el.focus()
				}
				return
			}
		}
		if (key === 'key') {
			if (extras[index].value === '' && extras[index].key === '' && index !== 0) {
				const el = document.getElementById(`${id}-value-${index - 1}`)
				if (el) {
					el.focus()
					extras = [...extras.slice(0, index), ...extras.slice(index + 1)]
				}
				return
			}
		}
	}
	const handleEnter = ({ index, key }: { index: number; key: 'key' | 'value' }) => {
		if (key === 'key' && extras[index].key !== '' && !extras[index].error) {
			const el = document.getElementById(`${id}-value-${index}`)
			if (el) {
				el.focus()
			}
		}
		if (
			key === 'value' &&
			extras[index].key !== '' &&
			extras[index].value !== '' &&
			!extras[index].error
		) {
			handleAddExtra(index)
		}
	}
</script>

<div class="extra">
	<div class="extra-inputs">
		<Input>
			{#snippet message()}
				{#if extra.error}
					<div class="error">
						<Paragraph>You can't have the same key twice</Paragraph>
					</div>
				{/if}
			{/snippet}
			<Text
				onkeyup={(e) => {
					if (e.key === 'Backspace') {
						handleBackspace({ index, key: 'key' })
					}
					cleanErrors()
					findErrors()
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						handleEnter({ index, key: 'key' })
					}
				}}
				id={`${id}-key-${index}`}
				bind:value={extras[index].key}
				type="text"
			></Text>
		</Input>
		<Input>
			{#snippet message()}
				{#if extra.error}
					<Paragraph></Paragraph>
				{/if}
			{/snippet}
			<Text
				id={`${id}-value-${index}`}
				onkeyup={(e) => {
					if (e.key === 'Backspace') {
						handleBackspace({ index, key: 'value' })
					}
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						handleEnter({ index, key: 'value' })
					}
				}}
				bind:value={extras[index].value}
				type="text"
			></Text>
		</Input>
	</div>
	<Button
		style="square"
		type="button"
		onclick={() => {
			if (index > 0) {
				extras = [...extras.slice(0, index), ...extras.slice(index + 1)]
			}
		}}
	>
		<Icon icon={{ icon: 'minus', set: 'tabler' }}></Icon>
	</Button>
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
	.error {
		/* color: var(--background); */
		background-color: var(--negative);
	}
	.button-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
