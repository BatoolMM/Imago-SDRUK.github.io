<script lang="ts">
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { Button, Icon, Input, Paragraph, Subtitle, Text } from '@imago/ui'
	import { page } from '$app/state'
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
		}
	].find((fields) => fields.param === page.params.flow)
	const groups = form.nodes.reduce(
		(acc, el) => {
			const index = acc.findIndex((_el) => _el.group === el.group)
			if (index === -1) {
				acc.push({ group: el.group, nodes: [el] })
				return acc
			}
			acc[index].nodes.push(el)
			return acc
		},
		[] as { group: string; nodes: IdentityNode[] }[]
	)
</script>

<form method="POST" action={form.action} enctype="application/x-www-form-urlencoded">
	<div class="form-header">
		<img class="logo" src="/imago_logo.png" alt="" />
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
	<!-- <div class="form-sso-buttons"> -->
	<!-- 	<Button type="button">SSO</Button> -->
	<!-- 	<Button type="button"> -->
	<!-- 		{#snippet leftCol()} -->
	<!-- 			<Icon icon={{ set: 'tabler', icon: 'brand-gitlab' }}></Icon> -->
	<!-- 		{/snippet} -->
	<!-- 		{#snippet rightCol()} -->
	<!-- 			Gitlab -->
	<!-- 		{/snippet} -->
	<!-- 	</Button> -->
	<!-- </div> -->
	{#each groups as { nodes }}
		<div class="group">
			{#each nodes as { type, attributes, messages, meta }}
				{#if attributes.type === 'submit' || attributes.name === 'csrf_token' || attributes.type === 'hidden'}
					<input type="text" hidden name={attributes.name} value={attributes.value} />
				{:else}
					<div class="group-inputs">
						{#if type === 'input'}
							{#if attributes.type !== 'submit' && 'label' in meta === true}
								<Input label={meta.label?.text}>
									{#snippet message()}
										{#each messages as message}
											<div class="error">
												<Icon icon={{ icon: 'info-circle', set: 'tabler' }}></Icon>
												<Paragraph size="sm">{message.text}</Paragraph>
											</div>
										{/each}
									{/snippet}
									<Text
										id={meta.label?.id}
										name={attributes.name}
										type={attributes.type}
										value={attributes.value}
										required={attributes.required}
										autocomplete={attributes.autocomplete}
										hidden={attributes.type === 'hidden' || attributes.type === 'submit'
											? true
											: undefined}
									></Text>
								</Input>
							{/if}
						{/if}
						{#if type === 'img'}
							<img
								src={attributes.src}
								width={attributes.width}
								height={attributes.height}
								alt=""
							/>
						{/if}
						{#if type === 'text'}
							<p>{attributes.text?.text}</p>
						{/if}
					</div>
				{/if}
				{#if (attributes.type === 'submit' && attributes.name === 'method') || type === 'a'}
					<div class="group-buttons">
						<Button href={attributes.href}>{meta.label?.text}</Button>
					</div>
				{/if}
			{/each}
		</div>
	{/each}

	<!-- <Button>{data.page_fields.submit_button_label}</Button> -->
	<div class="form-bottom">
		{#if page.params.flow === 'login'}
			<Paragraph>
				Don't have an account? <span><a href="/auth/registration">Sign Up</a></span>
			</Paragraph>
			<Paragraph>
				<span><a href="/auth/recovery">Forgot your password?</a></span>
			</Paragraph>
		{:else if page.params.flow === 'registration'}
			<Paragraph>
				Already have an account? <span><a href="/auth/login">Sign In</a></span>
			</Paragraph>
			<Paragraph>
				Need help? <span><a href="/">Contact Us</a></span>
			</Paragraph>
		{/if}
	</div>
</form>

<style>
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
	}
	.logo {
		height: 2.5rem;
	}
	.form-sso-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-bottom: 1px solid var(--primary);
		padding-bottom: 1rem;
	}
	.group {
		padding: 0.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.error {
		background-color: var(--negative);
		color: var(--background);
		border-radius: 0.35rem;
		padding: 0 0.35rem;
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

	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		width: min(100%, 500px);
		padding: 2rem;
		background-color: var(--bg);
		border-radius: 0.35rem;
		box-shadow: 0px 0px 2px var(--bg);
	}
	a {
		font-family: var(--font-paragraph);
		font-weight: 600;
	}
	.group-buttons {
		display: flex;
		justify-content: flex-end;
	}
</style>
