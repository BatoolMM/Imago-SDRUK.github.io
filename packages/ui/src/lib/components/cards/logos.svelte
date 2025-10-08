<script lang="ts">
	let {
		logos
	}: {
		logos: {
			src: string
			href: string
		}[]
	} = $props()
</script>

<div class="logos">
	{#each logos as { href, src }}
		<a {href}> <img class="logo" {src} alt="" /> </a>
	{/each}
</div>

<style>
	.logo {
		/* height: clamp(1rem, 0.75rem + 1.25vw, 1.75rem); */
		height: 3.5rem;
		object-fit: contain;
	}
	.logos {
		display: flex;
		gap: 0.75rem;
	}
</style>
