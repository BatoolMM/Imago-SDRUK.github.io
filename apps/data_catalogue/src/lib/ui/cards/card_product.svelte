<script lang="ts">
	import { BaseCard, Button, Icon, Paragraph, Subtitle } from '@imago/ui'
	import Notes from '../text/notes.svelte'

	let { dataset }: { dataset: Record<PropertyKey, unknown> } = $props()
</script>

<BaseCard>
	<div class="product-card">
		<a href={`/datasets/${dataset.name}`} class="title">
			<Subtitle weight={700} size="lg">{dataset.title}</Subtitle>
		</a>
		<div class="metadata">
			<div class="notes">
				{#if dataset.notes}
					<Notes note={String(dataset.notes)} trim={70}></Notes>
				{/if}
			</div>
			<div class="footer">
				<div class="facts">
					{#if dataset.resources && Array.isArray(dataset.resources)}
						{@const formats = Array.from(
							new Set(dataset.resources.map((resource) => resource.format))
						)}
						<Paragraph size="xs"
							>{#each formats as format}
								{#if format && format !== ''}
									<span
										data-format={format ? String(format).toLowerCase() : undefined}
										class="format">{format}</span
									>
								{/if}
							{/each}</Paragraph
						>
					{/if}
					{#if dataset.license_title}
						<Paragraph size="xs">License: {String(dataset.license_title)}</Paragraph>
					{/if}
				</div>
				<Button href={`/datasets/${dataset.name}`} style="alt">
					See more
					<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
				</Button>
			</div>
		</div>
	</div>
</BaseCard>

<style>
	.facts {
		display: flex;
		flex-direction: column;
	}
	.product-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-decoration: none;
		background-color: var(--background);
		border: 1px solid var(--border-muted);
		border-radius: 0.35rem;
		padding: 1rem;
	}
	.product-card:visited {
		background-color: var(--background-accent);
	}
	.title {
		/* background-color: var(--quinary); */
		/* padding: 0.5rem; */
		/* border-radius: 0.35rem; */
		/* color: var(--tertiary); */
		text-decoration: none;
		/* border-bottom: 1px solid var(--tertiary); */
		/* background-color: var(--tertiary-muted); */
		padding: 0.25rem 1rem;
		background-color: var(--background);
		border: 1px solid var(--background-accent);
		border-radius: var(--radius);
	}
	.title:hover {
		text-decoration: underline;
	}
	.title:visited {
		/* background-color: var(--quinary-muted); */
	}
	.notes {
		padding: 1rem;
		/* color: var(--tertiary); */
		background-color: var(--background-muted);
		border: 1px solid var(--tertiary-accent);
		border-radius: var(--radius);
	}
	.metadata {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.metadata .footer {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
	}
	.format {
		margin-right: 0.5rem;
		padding: 0 0.25rem;
		border-radius: 0.15rem;
		font-weight: 500;
		background-color: var(--secondary-muted);
	}
	.format[data-format='csv'] {
		background-color: var(--secondary);
	}
	.format[data-format='xml'] {
		background-color: var(--quarternary);
	}
	.format[data-format='pdf'] {
		background-color: var(--negative);
	}
	.format[data-format='web app'] {
		background-color: var(--positive-muted);
	}
	.format[data-format='geojson'] {
		background-color: var(--tertiary);
	}
	.format[data-format='json'] {
		background-color: var(--quinary-muted);
	}
	.format[data-format='kml'] {
		background-color: var(--background-muted);
	}
	.format[data-format='xlsx'] {
		background-color: var(--background-muted);
	}
</style>
