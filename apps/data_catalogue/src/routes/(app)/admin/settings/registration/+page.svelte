<script lang="ts">
	import type { Question } from '$lib/db/schema/questions.js'
	import { getId, jstr } from '@arturoguzman/art-ui'
	import { BaseSection, Button, Title } from '@imago/ui'
	import { applyAction, enhance } from '$app/forms'
	import { notify } from '$lib/stores/notify.js'
	import CardQuestion from '$lib/ui/forms/card_question.svelte'
	import QuestionInputs from '$lib/ui/forms/question_inputs.svelte'
	let { data } = $props()

	let type: Question['type'] | undefined = $state(undefined)
	let question: Question = $state({
		question: '',
		options: [{ label: '', id: getId(), value: '', error: false }],
		created_by: '',
		updated_by: '',
		conditionals: []
	})
</script>

<BaseSection>
	<div class="page">
		<div class="left-col">
			<Title size="lg">Add a question</Title>
			<form
				class="form"
				action="?/create_question"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						if ('data' in result && result.data) {
							if ('errors' in result.data) {
								notify.send(String(jstr(result.data.errors)))
							}
							if ('message' in result.data) {
								notify.send(String(result.data.message))
							}
						}
						if (result.type === 'redirect') {
							applyAction(result)
						}
						update({ reset: true, invalidateAll: true })
					}
				}}
			>
				<div class="inputs">
					<QuestionInputs questions={data.questions} bind:question bind:type></QuestionInputs>
				</div>
				<div class="buttons">
					<Button type="reset">Clear</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</div>
		<div class="right-col">
			<Title size="md">Existing questions</Title>
			{#each data.questions as question}
				<CardQuestion questions={data.questions} {question}></CardQuestion>
			{/each}
		</div>
	</div>
</BaseSection>

<style>
	.page {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		gap: 4rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.form {
		background-color: var(--background);
		border-radius: var(--radius);
		padding: var(--padding-xl);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.buttons {
		display: flex;
		gap: 0.25rem;
		justify-content: space-between;
	}
</style>
