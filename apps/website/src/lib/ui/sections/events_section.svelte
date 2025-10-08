<script lang="ts">
	import { Title, Fact, Button, Subtitle, Paragraph } from '@imago/ui'
	import type { Event } from '$lib/types/directus'
	import { BaseSection } from '@imago/ui'
	import { DateTime } from 'luxon'
	let { event }: { event: Event } = $props()
	const { title, content, location, date_start, date_end, media, type, subtitle, id, agenda, url } =
		event
</script>

<BaseSection>
	<div class="career-section">
		<Title size="lg">
			{title}</Title
		>
		{#if subtitle}
			<Subtitle size="sm">
				{subtitle}
			</Subtitle>
		{/if}
		<div class="career-content-grid">
			<div class="meta-container">
				<div class="facts">
					{#if url}
						<Button href={url}>Tickets</Button>
					{/if}
					<Fact title="Location" text={location}></Fact>
					<Fact
						title="Date"
						text={DateTime.fromISO(date_start)
							.setLocale('en-gb')
							.toLocaleString(DateTime.DATE_FULL)}
					></Fact>
					<Fact
						title="Time"
						text={date_end
							? `${DateTime.fromISO(date_start)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(date_end)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)}`
							: DateTime.fromISO(date_start)
									.setLocale('en-gb')
									.toLocaleString(DateTime.TIME_SIMPLE)}
					></Fact>
					{#if agenda}
						<div class="fact">
							<Subtitle text="Agenda"></Subtitle>
							<div class="agenda-elements">
								{#each agenda as _agenda}
									<div class="agenda-element">
										<Fact
											text="{DateTime.fromISO(_agenda.time_start).toLocaleString(
												DateTime.TIME_SIMPLE
											)} - {DateTime.fromISO(_agenda.time_end).toLocaleString(
												DateTime.TIME_SIMPLE
											)}"
										></Fact>
										<Fact text={_agenda.title}></Fact>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
			<Paragraph>
				{@html content}
			</Paragraph>
		</div>
	</div>
</BaseSection>

<style>
	.career-section {
		gap: 2rem;
		z-index: 1;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.career-content-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: relative;
	}
	.meta-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.facts {
		font-weight: 500;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 6rem;
		left: 0;
	}
	.agenda-elements {
		display: flex;
		flex-direction: column;
		margin-top: 0.35rem;
		gap: 0.5rem;
	}

	.agenda-element {
		border: 1px solid var(--theme-colour-secondary);
		padding: 0.25rem 1rem;
		border-radius: 0.35rem;
	}

	@media (min-width: 768px) {
		.career-section {
			display: grid;
			gap: 2rem;
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
			z-index: 1;
			position: relative;
		}
		.career-content-grid {
			display: grid;
			grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
			gap: 2rem;
			position: relative;
		}
	}
</style>
