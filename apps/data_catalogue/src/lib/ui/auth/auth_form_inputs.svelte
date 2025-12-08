<script lang="ts">
	import type { IdentityNode } from '$lib/utils/auth/types'
	import { jstr } from '@arturoguzman/art-ui'
	import { Button, Paragraph, Subtitle, Input, Text } from '@imago/ui'

	let { nodes }: { nodes: IdentityNode[] } = $props()
	const ALLOWED_BUTTONS = [
		'lookup_secret_reveal',
		'method',
		'lookup_secret_regenerate',
		'lookup_secret_confirm',
		'totp_unlink'
	]
</script>

{#if nodes.length > 0}
	<div class="group">
		{#each nodes as { type, attributes, messages, meta, group }}
			{#if attributes?.type === 'hidden'}
				<input type="text" hidden name={attributes.name} value={attributes.value} />
			{:else}
				<div class="group-inputs">
					{#if type === 'input'}
						{#if attributes.type === 'submit'}
							<input type="text" hidden name={attributes.name} value={attributes.value} />
						{/if}
						{#if attributes.type !== 'submit' && 'label' in meta === true}
							<Input label={meta.label?.text}>
								<Text
									id={meta.label?.id}
									name={attributes.name}
									type={attributes.type}
									value={attributes.value}
									required={attributes.required}
									autocomplete={attributes.autocomplete}
									hidden={attributes.type === 'hidden' ? true : undefined}
								>
									{#snippet message()}
										{#each messages as message}
											<div class="error">
												<Paragraph size="sm" current_colour>{message.text}</Paragraph>
											</div>
										{/each}
									{/snippet}
								</Text>
							</Input>
						{/if}
					{/if}
					{#if group !== 'totp'}
						{#if type === 'img'}
							<Paragraph>{meta.label?.text}</Paragraph>
							<img
								src={attributes.src}
								width={attributes.width}
								height={attributes.height}
								alt=""
							/>
						{/if}
						{#if type === 'text'}
							{#if !attributes.text?.context?.secrets}
								<p>{attributes.text?.text}</p>
							{/if}
						{/if}
					{/if}
				</div>
				{#if type === 'text'}
					{#if attributes.text?.context?.secrets}
						<div class="card-secrets">
							<Subtitle size="xs" weight={600}>{meta.label?.text}</Subtitle>
							<div class="secrets">
								{#each attributes.text?.context?.secrets as secret}
									<div class="tag">
										<Paragraph>{secret.text}</Paragraph>
									</div>
								{/each}
							</div>
							<Button
								type="button"
								onclick={() => {
									window.print()
								}}>Print</Button
							>
						</div>
					{/if}
				{/if}
			{/if}
			{#if attributes.type === 'submit'}
				<div class="group-buttons">
					{#if ALLOWED_BUTTONS.includes(attributes.name)}
						<Button>{meta.label?.text}</Button>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.group {
		padding: 0.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.error {
		background-color: var(--danger);
		color: var(--background);
		border-radius: 0.35rem;
		padding: 0 0.35rem;
	}

	.group-buttons {
		display: flex;
		justify-content: flex-end;
	}
	.card-secrets {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--background-muted);
	}
	.secrets {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-auto-flow: row;
		background-color: var(--primary-soft);
		font-family: monospace;
		padding: 0.5rem;
		gap: 0.25rem;
		border-radius: var(--radius);
	}
	@media print {
		.group-inputs {
			display: none;
		}
		.card-secrets {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
		}
	}
</style>
