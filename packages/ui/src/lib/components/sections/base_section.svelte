<!-- <script lang="ts"> -->
<!-- 	import type { Snippet } from 'svelte' -->
<!-- 	import { fly } from 'svelte/transition' -->
<!-- 	let { children }: { children?: Snippet } = $props() -->
<!-- </script> -->
<!---->
<!-- <section in:fly={{ y: 40 }}> -->
<!-- 	{@render children?.()} -->
<!-- </section> -->
<!---->
<!-- <style> -->
<!-- 	section { -->
<!-- 		padding: 1rem 1rem 4rem 1rem; -->
<!-- 		width: min(100lvw - 4rem, 1440px); -->
<!-- 		margin-inline: auto; -->
<!-- 		position: relative; -->
<!-- 	} -->
<!-- </style> -->

<!--
  @component *Section*
  This should be the upmost wrapper before the page - a block that aligns the content
  to fit inside the margins of the page.

  Styles
  - bleed: content will use the full width and height of the page
  - break: content will use the full width of the page
-->

<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Snippet } from 'svelte'
	let {
		style,
		children
	}: { children?: Snippet; style?: 'base' | 'bleed' | 'break' | 'full-page' | 'slim' | 'large' } =
		$props()
</script>

<section data-style={style} in:fly={{ y: 40 }}>
	{@render children?.()}
</section>

<style>
	section {
		padding: 1rem 1rem 4rem 1rem;
		width: min(100lvw - 4rem, 1440px);
		margin-inline: auto;
		position: relative;
	}

	section[data-style='base'] {
		width: min(100lvw - 1rem, 1280px);
		margin-inline: auto;
		background-color: var(--bg);
		padding: 1rem;
	}

	section[data-style='bleed'] {
		/* max-width: 100lvw; */
		width: 100%;
		min-height: 100lvh;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		padding: 0;
	}

	section[data-style='break'] {
		width: 100lvw;
		padding: 0;
	}

	section[data-style='full-page'] {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		min-height: 100lvh;
	}

	section[data-style='slim'] {
		width: min(100lvw - 1rem, 1024px);
		margin-inline: auto;
	}

	section[data-style='large'] {
		width: min(100lvw - 1rem, 1440px);
		margin-inline: auto;
	}

	@media (min-width: 768px) {
		section {
			padding: 2rem;
		}
		section[data-style='break'] {
			padding: 0;
		}
		section[data-style='bleed'] {
			padding: 0;
		}
		section[data-style='full-page'] {
			padding: 0 2rem;
		}
	}
</style>
