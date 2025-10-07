<script lang="ts">
	import { INSTITUTIONS, ROLES, SOCIAL_MEDIA } from '$lib/globals/data.js'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import IconButton from '$lib/ui/buttons/icon_button.svelte'
	import BaseSection from '$lib/ui/sections/base_section.svelte'
	import { Picture } from '@arturoguzman/art-ui'
	import {
		IconBrandInstagram,
		IconBrandLinkedin,
		IconBrandMastodon,
		IconBrandTwitter
	} from '@tabler/icons-svelte'
	import { page } from '$app/state'
	import Seo from '$lib/ui/utils/seo.svelte'
	import { Button, Title, Subtitle, Fact, Paragraph } from '@imago/ui'
	let { data } = $props()
</script>

<Seo
	title={`${data.team_member.first_name} ${data.team_member.last_name}`}
	description={String(data.team_member.content)}
	image={`${page.url.protocol}//${page.url.host}/assets/${data.team_member.picture}`}
></Seo>

<BaseSection>
	<div class="team-member-section" style:--nav-height={NAV_HEIGHT}>
		<div class="left-col">
			<div class="profile-picture">
				<Picture image={data.team_member.picture}></Picture>
			</div>
			<div class="profile-metadata">
				<Title size="lg" text="{data.team_member.first_name} {data.team_member.last_name}"></Title>
				<div class="role">
					<Subtitle text={ROLES[data.team_member.role]}></Subtitle>
					<Subtitle text={INSTITUTIONS[data.team_member.institution]}></Subtitle>
					{#if data.team_member.facts}
						{#each data.team_member.facts as facts}
							<Fact text={facts.fact}></Fact>
						{/each}
					{/if}
				</div>
				<div class="social-media">
					{#each data.team_member.url.filter((url) => SOCIAL_MEDIA.includes(url.title)) as url}
						<IconButton
							onclick={() => {
								window.location = url.url
							}}
						>
							{#if url.title.toLowerCase().includes('linkedin')}
								<IconBrandLinkedin></IconBrandLinkedin>
							{/if}
							{#if url.title.toLowerCase().includes('mastodon')}
								<IconBrandMastodon></IconBrandMastodon>
							{/if}
							{#if url.title.toLowerCase().includes('twitter')}
								<IconBrandTwitter></IconBrandTwitter>
							{/if}
							{#if url.title.toLowerCase().includes('instagram')}
								<IconBrandInstagram></IconBrandInstagram>
							{/if}
						</IconButton>
					{/each}
				</div>
			</div>
		</div>
		<div class="right-col">
			<Paragraph>
				{@html data.team_member.content}
			</Paragraph>
			<div class="external-links">
				{#each data.team_member.url.filter((url) => !SOCIAL_MEDIA.includes(url.title)) as url}
					<Button href={url.url}>{url.title}</Button>
				{/each}
			</div>
		</div>
	</div>
</BaseSection>

<style>
	.team-member-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		color: var(--text);
		gap: 3rem;
	}

	.left-col {
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 2rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--border);
	}
	.profile-picture {
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
		overflow: hidden;
	}
	.profile-metadata {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.right-col {
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: min(100%, 500px);
		overflow: hidden;
	}
	.social-media {
		color: white;
		display: flex;
		gap: 0.25rem;
		margin-bottom: 2rem;
	}
	.external-links {
		display: grid;
		grid-template-columns: minmax(0, max-content);
		gap: 0.5rem;
	}
	@media (min-width: 1024px) {
		.team-member-section {
			grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
			min-height: calc(100lvh - var(--nav-height) - 5rem);
			margin-top: 1rem;
		}
		.left-col {
			padding: 0 2rem;
			border-bottom: initial;
			border-right: 1px solid var(--border);
		}
	}
	@media (min-width: 1280px) {
		.profile-picture {
			max-height: 50lvh;
		}
	}
	/* @media (min-width: 1440px) { */
	/* 	.left-col { */
	/* 		grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); */
	/* 	} */
	/* } */
</style>
