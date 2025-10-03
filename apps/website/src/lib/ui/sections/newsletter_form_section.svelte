<script lang="ts">
	import { window_width } from '$lib/stores/layout.svelte'
	import NewsletterCard from '../cards/newsletter_card.svelte'
	import OneColumnSection from './one_column_section.svelte'
	import TwoColumnsSection from './two_columns_section.svelte'
</script>

{#snippet form(background?: string)}
	<div class="form-col" data-background={background} style:--background-url="url({background})">
		<NewsletterCard></NewsletterCard>
	</div>
{/snippet}

{#if $window_width < 768}
	<OneColumnSection>
		{@render form(`/static/terrain_3.svg`)}
		<!-- {@render form(`/static/ui/terrain_1.png`)} -->
	</OneColumnSection>
{/if}

{#if $window_width > 767}
	<TwoColumnsSection>
		{#snippet leftCol()}
			<img src="/static/terrain_3.svg" alt="" class="img" />
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
		justify-content: center;
	}
	.form-col[data-background] {
		background: center / cover no-repeat var(--background-url);
		position: relative;
	}
	.form-col[data-background]::before {
		content: '';
		background: color-mix(in oklab, var(--theme-colour-background) 80%, transparent 20%);
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
	}
	.img {
		height: 100lvh;
		object-fit: cover;
		/* opacity: 1; */
		/* mix-blend-mode: luminosity; */
	}
</style>
