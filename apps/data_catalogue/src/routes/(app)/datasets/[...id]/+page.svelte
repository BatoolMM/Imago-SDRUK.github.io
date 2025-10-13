<script lang="ts">
	import { page } from '$app/state'
	import { debug } from '$lib/globals/dev.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import { BaseSection, Button, Fact, Icon, Paragraph, Subtitle, Title } from '@imago/ui'
	let { data } = $props()
	let result = $derived(data.data.result)
	const file_format_icons = [
		'file-download',
		'file-type-jpg',
		'file-type-pdf',
		'file-type-png',
		'file-type-sql',
		'file-type-svg',
		'file-type-xml',
		'file-type-zip',
		'file-type-csv',
		'file-type-doc',
		'file-type-docx',
		'file-type-html'
	]
	const getFileFormatIcon = (format?: string) => {
		if (!format) {
			return {
				icon: file_format_icons[0],
				set: 'tabler'
			}
		}
		return {
			icon:
				file_format_icons.find((icons) => icons.includes(format.toLowerCase())) ??
				file_format_icons[0],
			set: 'tabler'
		}
	}
</script>

<div class="page">
	{#if Array.isArray(result) === false}
		<BaseSection style="base">
			<div class="dataset-section">
				<div class="left-col">
					{#if 'resources' in result && Array.isArray(result.resources)}
						{#each Object.entries(result) as [key, value]}
							<Fact title={key} text={String(value)}></Fact>
						{/each}
					{/if}
				</div>
				<div class="right-col">
					<Title size="lg" text={String(result.title)}></Title>
					{#if 'notes' in result}
						<Paragraph>{@html result.notes}</Paragraph>
					{/if}

					<div class="resources">
						<Subtitle size="md" text="Resources"></Subtitle>
						<div class="pills">
							{#if 'resources' in result && Array.isArray(result.resources)}
								{#each result.resources as resource}
									<div class="pill">
										<Subtitle size="xs">{resource.name ?? resource.description}</Subtitle>
										<div class="pill-buttons">
											<Button href="/datasets/{page.params.id}/resources/{resource.id}"
												>{#snippet leftCol()}
													<span>Details</span>
												{/snippet}
												{#snippet rightCol()}
													<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
												{/snippet}
											</Button>
											{#if resource.format.toLowerCase() === 'html'}
												<Button href={resource.url}
													>{#snippet leftCol()}
														<span>Visit</span>
													{/snippet}
													{#snippet rightCol()}
														<Icon icon={{ icon: 'arrow-up-right-01', set: 'hugeicons' }}></Icon>
													{/snippet}
												</Button>
											{:else}
												<Button href={resource.url} download
													>{#snippet leftCol()}
														<span>Download</span>
													{/snippet}
													{#snippet rightCol()}
														<Icon icon={getFileFormatIcon(resource.format)}></Icon>
													{/snippet}
												</Button>
											{/if}
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</BaseSection>
	{/if}

	{#if debug.status}
		<pre>{jstr(data)}</pre>
	{/if}
</div>

<style>
	.page {
		color: var(--theme-colour-text);
	}
	.dataset-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
		grid-template-rows: minmax(0, 1fr);
		gap: 2rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.resources {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.pills {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.pill {
		display: grid;
		width: 100%;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
	}
	.pill-buttons {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}
</style>
