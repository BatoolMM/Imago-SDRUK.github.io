<script lang="ts">
	import { DateTime } from 'luxon'
	import { dateAvailable, dateExpired } from '$lib/utils/data'
	import type { Career } from '$lib/types/directus'
	import { BaseCard, Title, Button } from '@imago/ui'
	let { career }: { career: Career } = $props()
	const { title, url, closing_date, contract, slug, salary, posted_on, location, hours } = career
</script>

<BaseCard rounded border>
	<div class="job-card">
		<div class="card-title">
			<Title text={title}></Title>
		</div>
		<div class="facts">
			<h3 class="fact">Location: {location}</h3>
			<h3 class="fact">Salary: {salary}</h3>
			<h3 class="fact">Hours: {hours}</h3>
			<h3 class="fact">Contract: {contract}</h3>
			{#if posted_on}
				<h3 class="fact">
					Posted on: {DateTime.fromISO(posted_on)
						.setLocale('en-gb')
						.toLocaleString(DateTime.DATE_FULL)}
				</h3>
			{/if}
			<h3
				class="fact"
				class:expired={dateExpired(DateTime.fromISO(closing_date))}
				class:available={dateAvailable(DateTime.fromISO(closing_date))}
			>
				Closing date: {DateTime.fromISO(closing_date)
					.setLocale('en-gb')
					.toLocaleString(DateTime.DATE_FULL)}
			</h3>
		</div>
		<div class="buttons">
			<Button href="/careers/{slug}">See more</Button>
			<Button href={url}>Apply</Button>
		</div>
	</div>
</BaseCard>

<style>
	.job-card {
		display: grid;
		height: 100%;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
		position: relative;
		background-color: color-mix(in oklab, var(--background-accent) 3%, transparent 97%);
		padding: 1rem;
		transition: all 0.3s ease-in-out;
		z-index: 1;
	}
	.job-card:hover::before {
		top: 1rem;
		left: -1rem;
	}
	.job-card::before {
		content: '';
		height: 100%;
		width: 100%;
		background-color: color-mix(in oklab, var(--background-accent) 8%, transparent 92%);
		position: absolute;
		top: 0.5rem;
		left: -0.5rem;
		transition: all 0.3s ease-in-out;
		pointer-events: none;
	}
	.card-title {
		margin-bottom: 0.35rem;
		border-bottom: 1px solid var(--border);
		padding: 0 0 0.35rem 0;
	}
	.facts {
		margin: 1rem 0;
		color: var(--text);
		font-weight: 500;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.fact {
		font-family: var(--subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}

	.available {
		color: var(--positive);
		font-weight: 600;
	}

	.expired {
		color: var(--negative);
	}

	.buttons {
		display: flex;
		padding: 1rem 0rem 0 0rem;
		gap: 0.5rem;
		justify-content: flex-end;
		font-family: var(--subtitle);
	}
</style>
