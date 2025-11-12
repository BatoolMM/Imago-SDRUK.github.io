<script lang="ts">
	import { getDataset } from '$lib/context/dataset.svelte'
	import FileUploaded from '$lib/ui/inputs/file_uploaded.svelte'
	import Upload from '$lib/ui/inputs/upload.svelte'
	import { Paragraph } from '@imago/ui'
	const ctx = getDataset()
</script>

<div class="resources">
	<Upload name="resources" label="Add resources"></Upload>
	<div class="uploaded">
		{#if ctx.dataset.resources.length === 0}
			<Paragraph>No resources have been added to this dataset</Paragraph>
		{:else}
			<Paragraph>Existing</Paragraph>
			<div class="files">
				{#each ctx.dataset.resources as file, index (file.id)}
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
