<script lang="ts">
	let { children } = $props()
</script>

<div class="content prose-sm lg:prose-base">
	{@render children()}
</div>

<style>
	.content {
		color: var(--text);
		font-family: var(--paragraph);
		display: flex;
		flex-direction: column;
		font-weight: 200;
		width: min(100%, 600px);
		/* margin-inline: auto; */
		/* font-size: clamp(0.85rem, 0.8rem + 0.25vw, 1rem); */
	}
	:global(.content > a, .content > * > a) {
		text-decoration: underline 1px;
	}
</style>
