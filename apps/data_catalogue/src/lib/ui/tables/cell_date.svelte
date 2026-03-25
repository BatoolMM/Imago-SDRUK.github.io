<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Paragraph } from '@imago/ui'
	import BaseCell from './base_cell.svelte'
	import { DateTime } from 'luxon'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<Paragraph>
		{DateTime.fromISO(row[key]).setLocale('en-gb').toLocaleString(DateTime.DATETIME_FULL)}
	</Paragraph>
</BaseCell>
