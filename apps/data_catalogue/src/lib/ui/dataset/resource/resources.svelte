<script lang="ts">
	import type { CkanDataset } from '$lib/types/ckan'
	import FileUploaded from '$lib/ui/inputs/file_uploaded.svelte'
	import Upload from '$lib/ui/inputs/upload.svelte'
	import { Paragraph } from '@imago/ui'
	let { dataset }: { dataset: CkanDataset } = $props()
	let resources = $derived(dataset.resources)
</script>

<div class="resources">
	<Upload name="resources" label="Add resources"></Upload>
	<div class="uploaded">
		{#if resources.length === 0}
			<Paragraph>No resources have been added to this dataset</Paragraph>
		{:else}
			<Paragraph>Existing</Paragraph>
			<div class="files">
				{#each resources as file, index (file.id)}
					<FileUploaded {index} {file}></FileUploaded>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.resources {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.uploaded {
		background-color: var(--background-muted);
		border-radius: var(--radius);
		/* padding: 1rem; */
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: row;
	}
	.files {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: row;
	}
</style>
