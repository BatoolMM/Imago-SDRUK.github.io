<script lang="ts">
	import type { Event } from '$lib/types/directus'
	import ListSection from '$lib/ui/sections/list_section.svelte'
	import { DateTime } from 'luxon'
	import { Title, Fact, Button, Subtitle } from '@imago/ui'
	import { page } from '$app/state'
	let { events }: { events: Event[] } = $props()
	const filters = [
		{ label: 'All', href: '/events', matcher: null },
		{ label: 'Past', href: '?time=past', matcher: 'past' },
		{ label: 'Current', href: '?time=current', matcher: 'current' },
		{ label: 'Future', href: '?time=future', matcher: 'future' }
	]
</script>

<ListSection title="Events">
	<div class="filter-buttons">
		{#each filters as filter}
			<Button href={filter.href} active={page.url.searchParams.get('time') === filter.matcher}
				>{#snippet leftCol()}
					<p>{filter.label}</p>
				{/snippet}</Button
			>
		{/each}
	</div>
	{#if events.length === 0}
		<a href="/events">
			<Title
				text="There are no events that match this search, please try another filter or click here to clear your search."
			></Title>
		</a>
	{/if}
	{#each events as event}
		<li class="list">
			<div class="event-list">
				<div class="left-col">
					<Fact
						text={DateTime.fromISO(event.date_start)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					<div class="time">
						<Fact
							text={DateTime.fromISO(event.date_start)
								.setLocale('en-gb')
								.toLocaleString(DateTime.TIME_SIMPLE)}
						></Fact>
						{#if event.date_end}
							<Fact
								text={`to ${DateTime.fromISO(event.date_end)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)}`}
							></Fact>
						{/if}
					</div>
				</div>
				<div class="centre-col">
					<Title text={event.title}></Title>
					<!-- <Paragraph text={event.location}></Paragraph> -->
					<Subtitle size="sm" text={event.location}></Subtitle>
				</div>
				<div class="right-col">
					<Button href="/events/{event.slug}">{event.type}</Button>
				</div>
			</div>
		</li>
	{/each}
</ListSection>

<style>
	.filter-buttons {
		display: flex;
		gap: 0.5rem;
	}
	.list {
		border-top: 1px solid var(--border-muted);
		padding: 0.5rem 0;
		color: var(--text);
	}
	.list:last-of-type {
		border-bottom: 1px solid var(--border-muted);
	}
	.time {
		display: flex;
		gap: 0.35rem;
	}
	.event-list {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 1rem;
	}
	.centre-col {
		grid-column: 1 /3;
		grid-row: 1/2;
	}
	.left-col {
		grid-row: 2/3;
	}
	.right-col {
		grid-row: 2/3;
	}

	@media (min-width: 768px) {
		.list {
			padding: 1.25rem 0;
		}
		.event-list {
			display: grid;
			grid-template-columns: minmax(0, max-content) minmax(100px, 1fr) minmax(0, max-content);
			grid-template-rows: minmax(0, 1fr);
			gap: 2rem;
		}
		.left-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
			font-family: var(--accent);
			font-weight: 300;
		}
		.centre-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
		}
		.right-col {
			grid-column: initial;
			grid-row: initial;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			justify-content: center;
		}
	}
</style>
