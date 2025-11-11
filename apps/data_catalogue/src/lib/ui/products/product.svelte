<script lang="ts" generics="T extends Record<PropertyKey, unknown>">
	import { page } from '$app/state'
	import Notes from '$lib/ui/text/notes.svelte'
	import { Button, Icon, Subtitle, Title } from '@imago/ui'
	let { result }: { result: T } = $props()
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

<div class="product">
	<div class="header">
		<div class="product-title">
			<Title size="lg" text={String(result.title)}></Title>
		</div>

		{#if 'notes' in result && result.notes !== null}
			<div class="product-notes">
				<Notes note={String(result.notes)}></Notes>
			</div>
		{/if}
	</div>
	<div class="product-content">
		{#if 'resources' in result && Array.isArray(result.resources) && result.resources.length > 0}
			<div class="resources">
				<Subtitle size="md" text="Resources"></Subtitle>
				<div class="content">
					<div class="pills">
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
					</div>
				</div>
			</div>
		{/if}
		<!-- {#if Array.isArray(result.extras) && result.extras.length > 0} -->
		<!-- 	<div class="resources"> -->
		<!-- 		<Subtitle size="md" text="Extras"></Subtitle> -->
		<!-- 		<div class="content"> -->
		<!-- 			<div class="pills"> -->
		<!-- 				{#each result.extras as extra} -->
		<!-- 					<div class="pill"> -->
		<!-- 						<Subtitle size="xs">{extra.key}</Subtitle> -->
		<!-- 						<div class="pill-buttons"> -->
		<!-- 							<pre>{extra.value}</pre> -->
		<!-- 						</div> -->
		<!-- 					</div> -->
		<!-- 				{/each} -->
		<!-- 			</div> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
		<!-- {/if} -->
	</div>
</div>

<style>
	.product-title {
		position: relative;
		background-color: color-mix(in oklab, var(--background) 90%, transparent 10%);
		padding: 1rem;
		border: 1px solid var(--border);
	}
	.product-title::before {
		content: '';
		position: absolute;
		bottom: -0.75rem;
		left: 0.75rem;
		height: 100%;
		width: 100%;
		background-color: var(--highlight);
		z-index: -1;
	}
	.header {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.product {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		border-radius: 0.35rem;
	}
	.product-notes {
		background-color: var(--background-muted);
		padding: 2rem;
		border-radius: var(--radius);
	}
	.product-content {
		background-color: var(--background-muted);
	}

	.resources {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.resources .content {
		padding: 1rem;
	}
	.pills {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.pill {
		background-color: var(--background);
		display: grid;
		/* justify-items: center; */
		align-items: center;
		width: 100%;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		gap: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
	}
	.pill-buttons {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
	}
</style>
