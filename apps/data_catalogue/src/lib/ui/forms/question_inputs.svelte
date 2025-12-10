<script lang="ts">
	import type { Question } from '$lib/db/schema/questions'
	import { Icon, Input, Select, Subtitle, Text, Button, Paragraph, Checkbox } from '@imago/ui'
	import OptionsCreate from '../inputs/options_create.svelte'

	let {
		questions,
		type = $bindable(),
		question = $bindable()
	}: {
		type?: Question['type'] | null
		question: Question
		questions: Question[]
	} = $props()

	const options = [
		{ label: 'Text', value: 'string' },
		{ label: 'Select', value: 'select' },
		{ label: 'Select multiple', value: 'multiple_select' },
		{ label: 'Number', value: 'number' },
		{ label: 'Yes / No', value: 'bool' },
		{ label: 'Countries', value: 'countries' }
	]
	let conditionals: Question['conditionals'] = $state(question.conditionals ?? [])
</script>

<div class="question">
	<div class="question-inputs">
		<Input label="Question">
			<Text name="question" required value={question.question}></Text>
		</Input>

		<Input label="Type" required>
			<Select name="type" bind:value={type} required {options}></Select>
		</Input>
		{#if type === 'select' || type === 'multiple_select'}
			<OptionsCreate name="options" bind:options={question.options}></OptionsCreate>
		{/if}
	</div>
	<div class="settings">
		<Subtitle>Settings</Subtitle>
		<div class="settings-toggles">
			<Input label="Visibility">
				<Checkbox name="visibility" checked={question.visibility}></Checkbox>
			</Input>
			<Input label="Required">
				<Checkbox name="required" checked={question.required}></Checkbox>
			</Input>
		</div>
		<div class="conditionals">
			<input name="conditionals" type="text" value={JSON.stringify(conditionals)} hidden />
			<div class="conditionals-header">
				<Paragraph>Conditionals</Paragraph>
				<Button
					type="button"
					onclick={() => {
						if (conditionals) {
							conditionals.push({ question: '', value: '', action: 'visible', operator: 'equal' })
						}
					}}><Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon></Button
				>
			</div>
			{#if conditionals && conditionals.length > 0}
				<div class="conditionals">
					{#each conditionals as conditional, index}
						<div class="conditional">
							<div class="conditional-header">
								<Paragraph>
									Conditional {index + 1}
								</Paragraph>
								<Button
									type="button"
									onclick={() => {
										if (conditionals) {
											conditionals = [
												...conditionals.slice(0, index),
												...conditionals.slice(index + 1)
											]
										}
									}}><Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon></Button
								>
							</div>
							<Input label="Question">
								<Select
									bind:value={conditional.question}
									options={questions.map((question) => ({
										label: question.question,
										value: String(question.id)
									}))}
								></Select>
							</Input>
							<Input label="Operator">
								<Select
									bind:value={conditional.operator}
									options={[
										{ label: 'Equal', value: 'equal' },
										{ label: 'Not equal', value: 'not_equal' },
										{ label: 'Includes', value: 'includes' }
									]}
								></Select>
							</Input>
							<Input label="Value">
								<Text bind:value={conditional.value}></Text>
							</Input>
							<Input label="Action">
								<Select
									bind:value={conditional.action}
									options={[
										{ label: 'Visible', value: 'visible' },
										{ label: 'Hidden', value: 'hidden' }
									]}
								></Select>
							</Input>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.question-inputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.settings {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}
	.settings-toggles {
		display: flex;
	}
	.conditionals-header {
		display: flex;
		justify-content: space-between;
	}
	.conditional-header {
		display: flex;
		justify-content: space-between;
	}
	.conditionals {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 0;
	}
	.conditional {
		background-color: var(--background-accent);
		padding: 1rem;
		border-radius: var(--radius);
	}
</style>
