<script lang="ts">
	import { window_width } from '$lib/stores/layout.svelte'
	import OneColumnSection from '$lib/ui/sections/one_column_section.svelte'
	import TwoColumnsSection from '$lib/ui/sections/two_columns_section.svelte'
	import NewsletterCard from '../cards/newsletter_card.svelte'
</script>

{#snippet form(background?: string)}
	<div class="form-col" data-background={background} style:--background-url="url({background})">
		<div class="newsletter-form">
			<NewsletterCard
				title="Page in construction"
				paragraph="Subscribe to the newsletter to keep updated on Imago news and data products."
			></NewsletterCard>
		</div>
	</div>
{/snippet}

{#if $window_width < 768}
	<OneColumnSection>
		{@render form(`/static/ui/terrain_1.png`)}
	</OneColumnSection>
{/if}

{#if $window_width > 767}
	<TwoColumnsSection>
		{#snippet leftCol()}
			<img src="/static/ui/terrain_1.png" alt="" class="img" />
		{/snippet}
		{#snippet rightCol()}
			{@render form()}
		{/snippet}
	</TwoColumnsSection>
{/if}

<style>
	.form-col {
		height: 100lvh;
		display: flex;
		align-items: center;
	}
	.form-col[data-background] {
		background: center / cover no-repeat var(--background-url);
		position: relative;
	}
	.form-col[data-background]::before {
		content: '';
		background: color-mix(in oklab, var(--background) 80%, transparent 20%);
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.newsletter-form {
		width: min(100% - 1rem, 400px);
		margin-inline: auto;
		z-index: 1;
	}

	.img {
		height: 100lvh;
		object-fit: cover;
		opacity: 0.5;
	}
</style>
