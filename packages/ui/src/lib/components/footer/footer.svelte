<script lang="ts">
	import ImagoLogo from '$lib/assets/logos/imago_logo.png'
	import SDRUK from '$lib/assets/logos/sdr_logo.png'
	import UKRI from '$lib/assets/logos/ukri_logo.png'
	import { Button, Icon, Subtitle, Title } from '@imago/ui'
	let { id }: { id?: string } = $props()
	const platform_collection = [1, 2, 3].map((x) => ({
		href: '/',
		label: `Data product ${x}`
	}))

	// const documentation_collection = [
	// 	{
	// 		href: '/',
	// 		label: 'Book of imagery'
	// 	},
	//
	// 	{
	// 		href: '/',
	// 		label: 'Researchers'
	// 	}
	// ]
	// const company_documentation = [
	// 	{
	// 		href: '/',
	// 		label: 'Copyright'
	// 	},
	// 	{
	// 		href: '/',
	// 		label: 'Accessibility'
	// 	},
	// 	{
	// 		href: '/',
	// 		label: 'Privacy'
	// 	},
	// 	{
	// 		href: '/',
	// 		label: 'Contact'
	// 	}
	// ]
	const now = new Date()
</script>

<footer {id}>
	<div class="footer-content">
		<div class="top">
			<div class="left-col">
				<Title>Imago © {now.getFullYear()}</Title>
			</div>
		</div>

		<div class="bottom">
			<div class="logos">
				<a href="/"> <img class="logo" src={ImagoLogo} alt="" /> </a>
				<a href="/">
					<img class="logo" src={SDRUK} alt="" />
				</a>
				<a href="/"> <img class="logo" src={UKRI} alt="" /> </a>
			</div>
			<div class="social-media">
				<Subtitle>Contact us:</Subtitle>
				<Button
					umami_event="Contact email"
					style="clean"
					onclick={() => {
						window.location = 'mailto:imago@liverpool.ac.uk'
					}}
				>
					<Icon icon={{ icon: 'mail', set: 'tabler', size: 'lg' }}></Icon>
				</Button>
				<Button
					umami_event="Linkedin"
					style="clean"
					onclick={() => {
						window.location = 'https://www.linkedin.com/company/sdr-imago'
					}}
				>
					<Icon icon={{ icon: 'brand-linkedin', set: 'tabler', size: 'lg' }}></Icon>
				</Button>
				<Button
					umami_event="Github"
					style="clean"
					onclick={() => {
						window.location = 'https://github.com/Imago-SDRUK/'
					}}
				>
					<Icon icon={{ icon: 'brand-github', set: 'tabler', size: 'lg' }}></Icon>
				</Button>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		height: var(--footer-height);
		background-color: var(--tertiary);
	}
	.footer-content {
		width: min(100% - 6rem, 1440px);
		margin-inline: auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 2rem;
		padding: 4rem 0;
	}
	.top {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.footer-collections {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}
	.social-media {
		color: white;
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	.logo {
		height: 3.5rem;
		object-fit: contain;
	}
	.logos {
		display: flex;
		gap: 0.75rem;
	}
	@media (min-width: 1024px) {
		/* .left-col { */
		/* 	text-align: center; */
		/* } */
		.top {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
			justify-content: center;
			gap: 2rem;
		}
		.bottom {
			flex-direction: initial;
		}
	}
	@media print {
		footer {
			display: none;
		}
	}
</style>
