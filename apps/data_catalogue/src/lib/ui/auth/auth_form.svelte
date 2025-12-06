<script lang="ts">
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { Button, Icon, Input, Paragraph, Subtitle, Text } from '@imago/ui'
	import { page } from '$app/state'
	import AuthFormInputs from './auth_form_inputs.svelte'
	import AuthFormButtons from './auth_form_buttons.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import { groupNodes } from '$lib/utils/auth/forms'
	import AuthFormGroup from './auth_form_group.svelte'
	let { form }: { form: IdentityFlow['ui'] } = $props()

	const page_fields = [
		{
			param: 'login',
			title: 'Sign in',
			submit_button_label: 'Login'
		},
		{
			param: 'registration',
			title: 'Sign up',
			submit_button_label: 'Register'
		},
		{
			param: 'verification',
			title: 'Sign up',
			submit_button_label: 'Continue'
		},

		{
			param: 'recovery',
			title: 'Account Recovery',
			submit_button_label: 'Continue',
			back_button: true
		}
	].find((fields) => fields.param === page.params.flow)
	const { csrf, form_buttons, buttons, inputs, hidden } = form.nodes.reduce(
		(acc, el) => {
			if (el.attributes.type === 'hidden') {
				acc.hidden.push(el)
			}
			if (el.attributes?.name === 'csrf_token') {
				acc.csrf = el
				return acc
			}
			if (el.attributes?.name === 'method') {
				acc.form_buttons.push(el)
				return acc
			}
			if (el.type === 'a' || el.attributes?.name === 'screen' || el.attributes.type === 'submit') {
				acc.buttons.push(el)
				return acc
			}
			acc.inputs.push(el)
			return acc
		},
		{ buttons: [], form_buttons: [], csrf: undefined, inputs: [], hidden: [] } as {
			form_buttons: IdentityNode[]
			buttons: IdentityNode[]
			csrf?: IdentityNode
			inputs: IdentityNode[]
			hidden: IdentityNode[]
		}
	)
	let totp_form = form.nodes.map((node) => node.group).includes('totp')
	let alt_form = buttons.length > 0 ? true : false
	let totp_form_group = $state('totp')
</script>

{#if alt_form}
	<form
		method="POST"
		action={form.action}
		enctype="application/x-www-form-urlencoded"
		id="alt-form"
	>
		{#each buttons as node}
			<input type="text" hidden name={node.attributes.name} value={node.attributes.value} />
		{/each}
		{#each hidden as node}
			<input type="text" hidden name={node.attributes.name} value={node.attributes.value} />
		{/each}
	</form>
{/if}

<form class="form" method="POST" action={form.action} enctype="application/x-www-form-urlencoded">
	{#if page_fields?.back_button}
		<div class="back-button">
			<Button
				onclick={() => {
					window.history.back()
				}}
				type="button"
			>
				<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }}></Icon>
			</Button>
		</div>
	{/if}
	<div class="form-header">
		<img class="logo" src="/logos/logo.png" alt="" />
		{#if page_fields}
			<Subtitle text={page_fields.title}></Subtitle>
		{/if}
	</div>
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

	{#if csrf}
		<input type="text" hidden name={csrf.attributes.name} value={csrf.attributes.value} />
	{/if}

	{#if totp_form}
		{@const groups = groupNodes(form.nodes)}
		<div class="buttons">
			{#if groups.find((group) => group.group === 'totp')}
				<Button
					active={totp_form_group === 'totp'}
					type="button"
					onclick={() => {
						totp_form_group = 'totp'
					}}>2FA</Button
				>
			{/if}
			{#if groups.find((group) => group.group === 'lookup_secret')}
				<Button
					active={totp_form_group === 'lookup_secret'}
					type="button"
					onclick={() => {
						totp_form_group = 'lookup_secret'
					}}>Recovery code</Button
				>
			{/if}
		</div>
		{#each groups.filter((group) => group.group === totp_form_group) as { group, nodes }}
			<AuthFormInputs {nodes}></AuthFormInputs>
		{/each}
	{:else}
		<AuthFormInputs nodes={inputs}></AuthFormInputs>
		<AuthFormButtons {form_buttons} {buttons}></AuthFormButtons>
	{/if}
	{#if page.params.flow === 'login'}
		<div class="form-bottom">
			<Paragraph>
				Don't have an account? <span><a href="/auth/registration">Sign Up</a></span>
			</Paragraph>
			<Paragraph>
				<span><a href="/auth/recovery">Forgot your password?</a></span>
			</Paragraph>
		</div>
	{:else if page.params.flow === 'registration'}
		<div class="form-bottom">
			<Paragraph>
				Already have an account? <span><a href="/auth/login">Sign In</a></span>
			</Paragraph>
			<Paragraph>
				Need help? <span><a href="/">Contact Us</a></span>
			</Paragraph>
		</div>
	{/if}
</form>

<style>
	.buttons {
		display: flex;
		justify-content: space-between;
	}
	.form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		width: min(100%, 500px);
		padding: 2rem;
		background-color: var(--background);
		border-radius: 0.35rem;
		box-shadow: 0px 0px 2px var(--background);
		position: relative;
	}
	.form-header {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		font-family: var(--font-paragraph);
	}
	.form-bottom {
		display: grid;
		font-family: var(--font-paragraph);
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		justify-items: end;
		border-top: 1px solid var(--border);
		padding-top: 1rem;
	}
	.logo {
		height: 2.5rem;
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
</style>
