<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
	import { Input, Text, Paragraph, Icon, Button } from '@imago/ui'

	let {
		id,
		index,
		option = $bindable(),
		options = $bindable()
	}: {
		id: string
		index: number
		option: { id: string; label: string; value: string; error: boolean }
		options: { id: string; label: string; value: string; error: boolean }[]
	} = $props()
	const findDuplicates = (label: string) => {
		const existing = options.filter((x) => x.label.toLowerCase() === label.toLowerCase())
		if (existing.length > 1) {
			return true
		}
		return false
	}
	const findErrors = () => {
		if (option) {
			const existing = options.filter((x) => x.label.toLowerCase() === option.label.toLowerCase())
			if (existing.length > 1) {
				existing.forEach((x) => (x.error = true))
			}
		}
	}
	const cleanErrors = () => {
		if (option) {
			const existing = options.filter((x) => x.error)
			existing.forEach((x) => (x.error = findDuplicates(x.label)))
		}
	}
	const handleAddOption = (index: number) => {
		if (index === options.length - 1) {
			options.push({ label: '', value: '', id: getId(), error: false })
		}
		setTimeout(() => {
			const el = document.getElementById(`${id}-label-${index + 1}`)
			if (el) {
				el.focus()
			}
		}, 1)
	}
	const handleBackspace = ({ index, label }: { index: number; label: 'label' | 'value' }) => {
		if (label === 'value') {
			if (options[index].value === '') {
				const el = document.getElementById(`${id}-label-${index}`)
				if (el) {
					el.focus()
				}
				return
			}
		}
		if (label === 'label') {
			if (options[index].value === '' && options[index].label === '' && index !== 0) {
				const el = document.getElementById(`${id}-value-${index - 1}`)
				if (el) {
					el.focus()
					options = [...options.slice(0, index), ...options.slice(index + 1)]
				}
				return
			}
		}
	}
	const handleEnter = ({ index, label }: { index: number; label: 'label' | 'value' }) => {
		if (label === 'label' && options[index].label !== '' && !options[index].error) {
			const el = document.getElementById(`${id}-value-${index}`)
			if (el) {
				el.focus()
			}
		}
		if (
			label === 'value' &&
			options[index].label !== '' &&
			options[index].value !== '' &&
			!options[index].error
		) {
			handleAddOption(index)
		}
	}
</script>

<div class="option">
	<div class="option-inputs">
		<Input label="Label">
			{#snippet message()}
				{#if option.error}
					<div class="error">
						<Paragraph>You can't have the same label twice</Paragraph>
					</div>
				{/if}
			{/snippet}
			<Text
				onkeyup={(e) => {
					if (e.key === 'Backspace') {
						e.preventDefault()
						handleBackspace({ index, label: 'label' })
					}
					cleanErrors()
					findErrors()
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						handleEnter({ index, label: 'label' })
					}
				}}
				id={`${id}-label-${index}`}
				bind:value={options[index].label}
				type="text"
			></Text>
		</Input>
		<Input label="Value">
			{#snippet message()}
				{#if option.error}
					<Paragraph></Paragraph>
				{/if}
			{/snippet}
			<Text
				id={`${id}-value-${index}`}
				onkeyup={(e) => {
					if (e.key === 'Backspace') {
						e.preventDefault()
						handleBackspace({ index, label: 'value' })
					}
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						handleEnter({ index, label: 'value' })
					}
				}}
				bind:value={options[index].value}
				type="text"
			></Text>
		</Input>
	</div>
	<Button
		style="square"
		type="button"
		onclick={() => {
			if (index > 0) {
				options = [...options.slice(0, index), ...options.slice(index + 1)]
			}
		}}
	>
		<Icon icon={{ icon: 'minus', set: 'tabler' }}></Icon>
	</Button>
</div>

<style>
	.option {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		gap: 1rem;
		align-items: flex-end;
	}
	.option-inputs {
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
