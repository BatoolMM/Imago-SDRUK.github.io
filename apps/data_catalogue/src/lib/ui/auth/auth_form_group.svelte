<script lang="ts">
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { Subtitle } from '@imago/ui'
	import { capitalise } from '@arturoguzman/art-ui'
	import AuthFormTotp from './auth_form_totp.svelte'
	import AuthFormInputs from './auth_form_inputs.svelte'

	let { nodes, group, form }: { group: string; nodes: IdentityNode[]; form: IdentityFlow['ui'] } =
		$props()
	const group_titles = {
		profile: 'Details',
		lookup_codes: 'Recovery codes',
		password: 'Change password',
		lookup_secret: 'Recovery secrets',
		totp: '2FA Authentication'
	}
</script>

<div class="form-group">
	{#if group === 'totp'}
		<AuthFormTotp {group} {nodes} {form}></AuthFormTotp>
	{:else}
		<div class="subtitle-wrapper">
			<Subtitle weight={300}
				>{group_titles[group] ?? capitalise(group).replaceAll('_', ' ')}</Subtitle
			>
		</div>
		<form
			method="POST"
			class="form"
			action={form.action}
			enctype="application/x-www-form-urlencoded"
		>
			<AuthFormInputs {nodes}></AuthFormInputs>
			<!-- <div class="group"> -->
			<!-- 	{#each nodes as { type, attributes, messages, meta }} -->
			<!-- 		<AuthFormInputs {type} {attributes} {messages} {meta} {group}></AuthFormInputs> -->
			<!-- 	{/each} -->
			<!-- </div> -->
		</form>
	{/if}
</div>

<style>
	.form-group {
		padding: 2rem;
		/* padding-top: 1rem; */
		/* padding-bottom: 2rem; */
		border-bottom: 1px solid var(--border);
		width: min(100%, 600px);
		background-color: var(--background-muted);
	}
	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		padding-bottom: 1rem;
	}
	.subtitle-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.totp-code {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		padding: 2rem 0;
	}
	.codes {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
	}
	@media print {
		.form-group {
			border: none;
		}
		.subtitle-wrapper {
			display: none;
		}
	}
</style>
