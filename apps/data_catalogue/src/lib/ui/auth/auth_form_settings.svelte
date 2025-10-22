<script lang="ts">
	import type { IdentityFlow, IdentityNode } from '$lib/utils/auth/types'
	import { Button, Icon, Paragraph, Subtitle, Text } from '@imago/ui'
	import { page } from '$app/state'
	import { capitalise } from '@arturoguzman/art-ui'
	let { form }: { form: IdentityFlow['ui'] } = $props()

	/**
	 * Group the inputs accodingly so each group is its own form,
	 * but add the csrf token to all groups.
	 * This token comes in the default group
	 **/
	const TOKEN_GROUP = 'default'
	const groups = form.nodes.reduce(
		(acc, el, _, arr) => {
			const index = acc.findIndex((_el) => _el.group === el.group)
			if (el.group !== TOKEN_GROUP) {
				if (index === -1) {
					acc.push({ group: el.group, nodes: [el] })
					/**
					 * find the index of the new group to append the token
					 **/
					const new_index = acc.findIndex((_el) => _el.group === el.group)
					arr
						.filter((_el) => _el.group === TOKEN_GROUP)
						.forEach((_el) => acc[new_index].nodes.push(_el))
					return acc
				}
				acc[index].nodes.push(el)
			}
			return acc
		},
		[] as { group: string; nodes: IdentityNode[] }[]
	)
</script>

<div class="forms">
	<div class="form-header">
		<Subtitle text="Account settings"></Subtitle>
	</div>
	{#if form.messages}
		<div class="messages">
			{#each form.messages as message}
				<div class="message" data-type={message.type}>
					<Icon icon={{ icon: 'info-circle', set: 'tabler' }}></Icon>
					<Paragraph size="sm">{message.text}</Paragraph>
				</div>
			{/each}
		</div>
	{/if}
	{#each groups as { group, nodes }}
		<Paragraph>{capitalise(group).replaceAll('_', ' ')}</Paragraph>
		<form method="POST" action={form.action} enctype="application/x-www-form-urlencoded">
			<div class="group">
				{#each nodes as { type, attributes, messages, meta }}
					{#if attributes.type === 'submit' || attributes.name === 'csrf_token' || attributes.type === 'hidden'}
						<input type="text" hidden name={attributes.name} value={attributes.value} />
					{:else}
						<div class="group-inputs">
							{#if type === 'input'}
								{#if attributes.type !== 'submit' && 'label' in meta === true}
									<Text
										id={meta.label?.id}
										name={attributes.name}
										label={meta.label?.text}
										type={attributes.type}
										value={attributes.value}
										required={attributes.required}
										autocomplete={attributes.autocomplete}
										hidden={attributes.type === 'hidden' || attributes.type === 'submit'
											? true
											: undefined}
									>
										{#snippet message()}
											{#each messages as message}
												<div class="error">
													<Paragraph size="sm">{message.text}</Paragraph>
												</div>
											{/each}
										{/snippet}
									</Text>
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

					{#if attributes.type === 'submit'}
						<div class="group-buttons">
							{#if attributes.name === 'method' || attributes.name === 'lookup_secret_regenerate'}
								<Button>{meta.label?.text}</Button>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</form>
	{/each}
</div>

<style>
	.forms {
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
	.form-header {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		font-family: var(--font-paragraph);
	}

	.group {
		padding: 0.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.error {
		background-color: var(--danger);
		color: var(--bg);
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
