<script lang="ts">
	import { Checkbox } from '@arturoguzman/art-ui'
	import type { Answer, Question } from '$lib/db/schema/questions'
	import { COUNTRIES } from '$lib/utils/forms/countries'
	import { Select, Input, Text } from '@imago/ui'
	let {
		answers = $bindable(),
		question
	}: { answers: { question: string; answer: string }[]; question: Question } = $props()
	let answer = $derived(answers.find((answer) => answer.question === question.id))
	let visibility = $state(question.visibility)
	$effect(() => {
		if (answers && question && question.conditionals && Array.isArray(question.conditionals)) {
			question.conditionals?.forEach((conditional) => {
				const _val = answers.find((_answer) => _answer.question === conditional.question)?.answer
				if (conditional.operator === 'equal') {
					if (_val === conditional.value) {
						if (conditional.action === 'hidden') {
							visibility = false
							return
						}
						if (conditional.action === 'visible') {
							visibility = true
							return
						}
					}
				}
				if (conditional.operator === 'not_equal') {
					if (_val !== conditional.value) {
						if (conditional.action === 'hidden') {
							visibility = false
							return
						}
						if (conditional.action === 'visible') {
							visibility = true
							return
						}
					}
				}
				visibility = question.visibility
			})
		}
	})
</script>

{#if answer && visibility}
	<div class="answer-card">
		<Input label={question.question} required={question.required ? true : false}>
			{#if question.type === 'countries'}
				<Select
					name={question.id}
					required={question.required ? true : false}
					options={COUNTRIES}
					bind:value={answer.answer}
				></Select>
			{/if}
			{#if question.type === 'string'}
				<Text
					name={question.id}
					required={question.required ? true : false}
					bind:value={answer.answer}
				></Text>
			{/if}
			{#if question.type === 'number'}
				<Text
					name={question.id}
					required={question.required ? true : false}
					bind:value={answer.answer}
				></Text>
			{/if}
			{#if question.type === 'bool'}
				<div class="anti-wrap">
					<Checkbox
						name={question.id}
						onchange={(e) => {
							answer.answer = `${e.currentTarget.checked}`
						}}
					></Checkbox>
				</div>
			{/if}
			{#if question.type === 'select' && question.options}
				<Select
					name={question.id}
					required={question.required ? true : false}
					options={question.options}
					bind:value={answer.answer}
				></Select>
			{/if}
			{#if question.type === 'multiple_select' && question.options}
				<Select
					required={question.required ? true : false}
					multiple
					name={question.id}
					options={question.options}
					bind:value={answer.answer}
				></Select>
			{/if}
		</Input>
	</div>
{/if}

<style>
	.answer-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
