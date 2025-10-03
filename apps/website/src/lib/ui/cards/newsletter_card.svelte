<script lang="ts">
	import { enhance } from '$app/forms'
	import { notify } from '$lib/stores/notify'
	import Title from '../blog/title.svelte'
	import Button from '../buttons/button.svelte'
	import BaseCard from '../cards/base_card.svelte'
	import Email from '../inputs/email.svelte'
	import Input from '../inputs/input.svelte'
	import Text from '../inputs/text.svelte'
	import Paragraph from '../text/paragraph.svelte'
</script>

<BaseCard border rounded shadow style="padded" size="md">
	<div class="newsletter-form">
		<div class="title">
			<Title title="Newsletter" size="large"></Title>
			<Paragraph text="Subscribe to the newsletter to keep updated on Imago news and data products."
			></Paragraph>
		</div>
		<form
			class="form-content"
			method="POST"
			action="/?/newsletter"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'failure') notify.send({ message: String(result.data?.message) })
					if (result.type === 'error')
						notify.send({
							message: `There's been an error submitting this request, please try again`
						})
					if (result.type === 'success') update({ reset: true, invalidateAll: true })
				}
			}}
		>
			<Input label_text="Name" layout={1} label_design={1}>
				<Text key="name" design={1}></Text>
			</Input>
			<Input label_text="Email" layout={1} label_design={1}>
				<Email key="email" design={1}></Email>
			</Input>
			<div class="button-container">
				<Button
					>{#snippet leftCol()}
						<p>Subscribe</p>
					{/snippet}</Button
				>
			</div>
		</form>
	</div>
</BaseCard>

<style>
	.form-content {
		display: grid;
		gap: 0.5rem;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
	}
	.newsletter-form {
		/* width: min(100% - 1rem, 400px); */
		margin-inline: auto;
		z-index: 1;
		background: color-mix(in oklab, var(--theme-colour-background) 80%, transparent 20%);
		/* border: 1px solid var(--theme-colour-text); */
		/* padding: 2rem; */
		/* border-radius: 1rem; */
		/* box-shadow: var(--glass); */
		/* border: 1px solid var(--theme-colour-quarternary); */
	}
	.form-content {
		padding: 1rem 0;
	}
</style>
