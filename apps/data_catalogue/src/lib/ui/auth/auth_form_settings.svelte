<script lang="ts">
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { Button, Icon, Paragraph, Subtitle, Text, Title } from '@imago/ui'
	import { page } from '$app/state'
	import { capitalise } from '@arturoguzman/art-ui'
	import AuthFormGroup from './auth_form_group.svelte'
	import { groupNodes } from '$lib/utils/auth/forms'
	let { form }: { form: IdentityFlow['ui'] } = $props()

	const groups = groupNodes(form.nodes)

	// onMount(() => {
	// 	clientDebug.add({ route: page.url.pathname, data: form })
	// })
</script>

<div class="auth-form">
	<div class="form-header">
		<Subtitle weight={500} size="md">Account settings</Subtitle>
	</div>
	<div class="forms">
		{#if form.messages}
			<div class="messages">
				{#each form.messages as message}
					<div class="message" data-type={message.type}>
						<Icon icon={{ icon: 'info-circle', set: 'tabler' }}></Icon>
						<Paragraph size="sm" current_colour>{message.text}</Paragraph>
					</div>
				{/each}
			</div>
		{/if}
		{#each groups as { group, nodes }}
			<AuthFormGroup {group} {nodes} {form}></AuthFormGroup>
		{/each}
	</div>
</div>

<!-- <div class="forms"> -->
<!-- 	<div class="form-header"> -->
<!-- 		<Title size="lg" text="Account settings"></Title> -->
<!-- 	</div> -->
<!-- 	{#if form.messages} -->
<!-- 		<div class="messages"> -->
<!-- 			{#each form.messages as message} -->
<!-- 				<div class="message" data-type={message.type}> -->
<!-- 					<Icon icon={{ icon: 'info-circle', set: 'tabler' }}></Icon> -->
<!-- 					<Paragraph size="sm">{message.text}</Paragraph> -->
<!-- 				</div> -->
<!-- 			{/each} -->
<!-- 		</div> -->
<!-- 	{/if} -->
<!-- 	{#each groups as { group, nodes }} -->
<!-- 		<div class="form"> -->
<!-- 			<Subtitle size="lg">{capitalise(group).replaceAll('_', ' ')}</Subtitle> -->
<!-- 			<form method="POST" action={form.action} enctype="application/x-www-form-urlencoded"> -->
<!-- 				<div class="group"> -->
<!-- 					{#each nodes as { type, attributes, messages, meta }} -->
<!-- 						{#if attributes.type === 'submit' || attributes.name === 'csrf_token' || attributes.type === 'hidden'} -->
<!-- 							<input type="text" hidden name={attributes.name} value={attributes.value} /> -->
<!-- 						{:else} -->
<!-- 							<div class="group-inputs"> -->
<!-- 								{#if type === 'input'} -->
<!-- 									{#if attributes.type !== 'submit' && 'label' in meta === true} -->
<!-- 										<Text -->
<!-- 											id={meta.label?.id} -->
<!-- 											name={attributes.name} -->
<!-- 											label={meta.label?.text} -->
<!-- 											type={attributes.type} -->
<!-- 											value={attributes.value} -->
<!-- 											required={attributes.required} -->
<!-- 											autocomplete={attributes.autocomplete} -->
<!-- 											hidden={attributes.type === 'hidden' || attributes.type === 'submit' -->
<!-- 												? true -->
<!-- 												: undefined} -->
<!-- 										> -->
<!-- 											{#snippet message()} -->
<!-- 												{#each messages as message} -->
<!-- 													<div class="error"> -->
<!-- 														<Paragraph size="sm">{message.text}</Paragraph> -->
<!-- 													</div> -->
<!-- 												{/each} -->
<!-- 											{/snippet} -->
<!-- 										</Text> -->
<!-- 									{/if} -->
<!-- 								{/if} -->
<!-- 								{#if type === 'img'} -->
<!-- 									<img -->
<!-- 										src={attributes.src} -->
<!-- 										width={attributes.width} -->
<!-- 										height={attributes.height} -->
<!-- 										alt="" -->
<!-- 									/> -->
<!-- 								{/if} -->
<!-- 								{#if type === 'text'} -->
<!-- 									<p>{attributes.text?.text}</p> -->
<!-- 								{/if} -->
<!-- 							</div> -->
<!-- 						{/if} -->
<!---->
<!-- 						{#if attributes.type === 'submit'} -->
<!-- 							<div class="group-buttons"> -->
<!-- 								{#if attributes.name === 'method' || attributes.name === 'lookup_secret_regenerate'} -->
<!-- 									<Button>{meta.label?.text}</Button> -->
<!-- 								{/if} -->
<!-- 							</div> -->
<!-- 						{/if} -->
<!-- 					{/each} -->
<!-- 				</div> -->
<!-- 			</form> -->
<!-- 		</div> -->
<!-- 	{/each} -->
<!-- </div> -->
<!---->
<!-- <style> -->
<!-- 	.forms { -->
<!-- 		display: grid; -->
<!-- 		grid-template-columns: minmax(0, 1fr); -->
<!-- 		grid-auto-flow: row; -->
<!-- 		gap: 2rem; -->
<!-- 		width: min(100%, 600px); -->
<!-- 		background-color: var(--background); -->
<!-- 		border-radius: 0.35rem; -->
<!-- 	} -->
<!-- 	.form-header { -->
<!-- 		display: flex; -->
<!-- 		gap: 1rem; -->
<!-- 		align-items: center; -->
<!-- 		font-family: var(--font-paragraph); -->
<!-- 	} -->
<!---->
<!-- 	.group { -->
<!-- 		padding: 0.5rem 0; -->
<!-- 		display: flex; -->
<!-- 		flex-direction: column; -->
<!-- 		gap: 1rem; -->
<!-- 	} -->
<!-- 	.error { -->
<!-- 		background-color: var(--danger); -->
<!-- 		color: var(--background); -->
<!-- 		border-radius: 0.35rem; -->
<!-- 		padding: 0 0.35rem; -->
<!-- 	} -->
<!-- 	.messages { -->
<!-- 		display: flex; -->
<!-- 		flex-direction: column; -->
<!-- 		gap: 0.5rem; -->
<!-- 		border: 1px solid var(--border); -->
<!-- 		border-radius: 0.35rem; -->
<!-- 		overflow: hidden; -->
<!-- 	} -->
<!-- 	.message { -->
<!-- 		display: flex; -->
<!-- 		align-items: center; -->
<!-- 		gap: 0.35rem; -->
<!-- 	} -->
<!-- 	.message[data-type='error'] { -->
<!-- 		padding: 0.15rem 0.5rem; -->
<!-- 		background-color: var(--warning); -->
<!-- 		color: var(--background); -->
<!-- 	} -->
<!-- 	.message[data-type='success'] { -->
<!-- 		background-color: var(--positive); -->
<!-- 		color: var(--background); -->
<!-- 		padding: 0.15rem 0.5rem; -->
<!-- 	} -->
<!-- 	.message[data-type='info'] { -->
<!-- 		background-color: var(--text); -->
<!-- 		color: var(--background); -->
<!-- 		padding: 0.15rem 0.5rem; -->
<!-- 	} -->
<!---->
<!-- 	.form { -->
<!-- 		background-color: var(--background-muted); -->
<!-- 		padding: 2rem; -->
<!-- 		border-radius: var(--radius); -->
<!-- 		display: flex; -->
<!-- 		flex-direction: column; -->
<!-- 		gap: 2rem; -->
<!-- 	} -->
<!-- 	form { -->
<!-- 		display: grid; -->
<!-- 		grid-template-columns: minmax(0, 1fr); -->
<!-- 		grid-auto-flow: row; -->
<!-- 		gap: 1rem; -->
<!-- 	} -->
<!-- 	a { -->
<!-- 		font-family: var(--font-paragraph); -->
<!-- 		font-weight: 600; -->
<!-- 	} -->
<!-- 	.group-buttons { -->
<!-- 		display: flex; -->
<!-- 		justify-content: flex-end; -->
<!-- 	} -->
<!-- </style> -->

<style>
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.forms {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		/* width: min(100%, 600px); */
		/* padding: 2rem; */
		background-color: var(--background);
		border-radius: 0.35rem;
		box-shadow: 0px 0px 2px var(--background);
	}
	.form-header {
		display: flex;
		gap: 1rem;
		/* justify-content: center; */
		align-items: center;
		font-family: var(--font-paragraph);
	}

	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid var(--border);
		border-radius: 0.35rem;
		overflow: hidden;
	}
	.message {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}
	.message[data-type='error'] {
		padding: 0.15rem 0.5rem;
		background-color: var(--warning);
		color: var(--background);
	}
	.message[data-type='success'] {
		background-color: var(--positive);
		color: var(--background);
		padding: 0.15rem 0.5rem;
	}
	.message[data-type='info'] {
		background-color: var(--text);
		color: var(--background);
		padding: 0.15rem 0.5rem;
	}
	@media print {
		.form-header {
			display: none;
		}
		.forms {
			background-color: none;
			box-shadow: none;
			border: none;
		}
	}
</style>
