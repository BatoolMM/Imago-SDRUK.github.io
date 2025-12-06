<script lang="ts">
	import { Button, Paragraph, Subtitle } from '@imago/ui'
	import AuthFormInputs from './auth_form_inputs.svelte'
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { onMount } from 'svelte'
	import { capitalise, jstr } from '@arturoguzman/art-ui'

	let { nodes, group, form }: { group: string; nodes: IdentityNode[]; form: IdentityFlow['ui'] } =
		$props()
	const group_titles = {
		profile: 'Details',
		lookup_codes: 'Recovery codes',
		password: 'Change password',
		lookup_secret: 'Recovery secrets',
		totp: '2FA Authentication'
	}
	let open = $state(true)
	let enable_text_code = $state(false)
	const topt_enabled = nodes.find((node) => node.attributes.name === 'totp_unlink')
	const code_nodes = nodes.reduce(
		(acc, el) => {
			if (el.type === 'img') {
				acc.image = el
			}
			if (el.type === 'text') {
				acc.text = el
			}
			return acc
		},
		{} as { image?: IdentityNode; text?: IdentityNode }
	)
	onMount(() => {
		/**
		 * NOTE: This should be checked agains an account that already has 2FA enabled
		 **/
		if (group === 'totp') {
			open = false
		}
	})
</script>

<div class="subtitle-wrapper">
	<Subtitle weight={300}>{group_titles[group] ?? capitalise(group).replaceAll('_', ' ')}</Subtitle>
	{#if topt_enabled}
		<AuthFormInputs {nodes}></AuthFormInputs>
	{:else}
		<Button
			active={open}
			onclick={() => {
				open = !open
			}}>{open ? 'Cancel' : 'Enable 2FA'}</Button
		>
	{/if}
</div>
{#if open}
	<form method="POST" class="form" action={form.action} enctype="application/x-www-form-urlencoded">
		{#if code_nodes.image && code_nodes.text && !topt_enabled}
			<div class="totp-code">
				<div class="buttons">
					<Button
						active={enable_text_code}
						type="button"
						onclick={() => {
							enable_text_code = !enable_text_code
						}}>Show text code</Button
					>
				</div>
				<div class="codes">
					<Paragraph>{code_nodes?.image?.meta?.label?.text}</Paragraph>
					{#if !enable_text_code}
						<img
							src={code_nodes?.image?.attributes.src}
							width={code_nodes.image?.attributes.width}
							height={code_nodes.image?.attributes.height}
							alt=""
						/>
					{/if}
					{#if enable_text_code}
						<Paragraph>{code_nodes.text?.attributes.text?.text}</Paragraph>
					{/if}
				</div>
			</div>
		{/if}
		<AuthFormInputs {nodes}></AuthFormInputs>
		<!-- <div class="group"> -->
		<!-- 	{#each nodes as { type, attributes, messages, meta }} -->
		<!-- 		<AuthFormInputs {type} {attributes} {messages} {meta} {group}></AuthFormInputs> -->
		<!-- 	{/each} -->
		<!-- </div> -->
	</form>
{/if}

<style>
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
		.subtitle-wrapper {
			display: none;
		}
	}
</style>
