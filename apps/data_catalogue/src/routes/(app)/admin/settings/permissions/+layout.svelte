<script lang="ts">
	import { page } from '$app/state'
	import { BaseSection, Button, Title, type Routes } from '@imago/ui'

	let { children } = $props()
	const routes: Routes = [
		{
			label: 'Datasets',
			href: `/admin/settings/permissions/datasets`,
			subpaths: []
		},
		{
			label: 'Endpoints',
			href: `/admin/settings/permissions/endpoints`,
			subpaths: []
		},
		{
			label: 'Groups',
			href: `/admin/settings/permissions/groups`,
			subpaths: []
		},
		{
			label: 'Resources',
			href: `/admin/settings/permissions/resources`,
			subpaths: []
		},
		{
			label: 'Users',
			href: `/admin/settings/permissions/users`,
			subpaths: []
		}
	]
</script>

{@render children()}

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 2rem;
	}
	.content {
		overflow: hidden;
	}
	header {
		grid-row: 1 / 2;
		grid-column: 1 / -1;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
