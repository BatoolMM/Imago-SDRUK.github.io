<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte'
	import Notes from '$lib/ui/text/notes.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import { BaseSection, Button, Subtitle, Paragraph, Icon, formatBytes, Title } from '@imago/ui'
	import { DateTime } from 'luxon'

	let { data } = $props()
	let result = $derived(data.data.result)
</script>

<BaseSection>
	<div class="resource-section">
		<div class="left-col">
			<div class="file-metadata">
				<div class="header">
					{#if 'name' in result}
						<Title size="md">{result.name}</Title>
					{/if}
					{#if 'description' in result}
						<Notes note={String(result.description)}></Notes>
					{/if}
				</div>
				<div class="metadata">
					<Subtitle>Metadata</Subtitle>
					{#if result.format !== null}
						<div class="metadata-field">
							<Subtitle>Format</Subtitle>
							<Notes note={String(result.format)}></Notes>
						</div>
					{/if}

					{#if result.mimetype !== null}
						<div class="metadata-field">
							<Subtitle>MIME Type</Subtitle>
							<Notes note={String(result.mimetype)}></Notes>
						</div>
					{/if}
					{#if result.created !== null}
						<div class="metadata-field">
							<Subtitle>Created</Subtitle>
							<Paragraph
								>{DateTime.fromISO(String(result.created)).toLocaleString(
									DateTime.DATETIME_FULL
								)}</Paragraph
							>
						</div>
					{/if}
					{#if result.last_modified !== null}
						<div class="metadata-field">
							<Subtitle>Modified</Subtitle>
							<Paragraph
								>{DateTime.fromISO(String(result.last_modified)).toLocaleString(
									DateTime.DATETIME_FULL
								)}</Paragraph
							>
						</div>
					{/if}
					{#if result.size}
						<div class="metadata-field">
							<Subtitle>Size</Subtitle>
							<Paragraph>{formatBytes(Number(result.size))}</Paragraph>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="right-col">
			{#if Array.isArray(result) === false && typeof result.url === 'string'}
				<Button href={result.url} download
					>Download: {result.name ?? result.description}
					<Icon icon={{ icon: 'file-download', set: 'tabler' }}></Icon>
				</Button>
			{/if}
		</div>
	</div>
</BaseSection>

{#if debug.status}
	<pre>{jstr(data)}</pre>
{/if}

<style>
	.resource-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		min-height: 70lvh;
	}
	.file-metadata {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.metadata {
		width: 100%;
		display: grid;
		grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 0rem 2rem;
	}
	.metadata-field {
		display: grid;
		grid-column: 1/-1;
		grid-template-rows: subgrid;
		grid-template-columns: subgrid;
		width: 100%;
		overflow-x: hidden;
	}
</style>
