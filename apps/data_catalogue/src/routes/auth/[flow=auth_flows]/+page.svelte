<script lang="ts">
	import { page } from '$app/state'
	import AuthForm from '$lib/ui/auth/auth_form.svelte'
	import AuthFormSettings from '$lib/ui/auth/auth_form_settings.svelte'
	// import { jstr } from '@arturoguzman/art-ui'
	import { BaseSection } from '@imago/ui'
	let { data } = $props()
</script>

<BaseSection style="bleed">
	<div class="register-section">
		<div class="left-col">
			<!-- <pre>{jstr(data)}</pre> -->
			<img src="/imago_logo.png" alt="" />
		</div>
		<div class="right-col">
			{#if page.params.flow === 'settings'}
				<AuthFormSettings form={data.form}></AuthFormSettings>
			{:else}
				<AuthForm form={data.form}></AuthForm>
			{/if}
		</div>
	</div>
</BaseSection>

<style>
	.register-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		/* gap: 2rem; */
	}
	.left-col {
		padding: 2rem;
		display: none;
		/* background-color: var(--secondary); */
	}
	.left-col pre {
		overflow: scroll;
		height: 90lvh;
		font-size: 0.8rem;
	}
	.right-col {
		padding: 2rem;
		background-color: var(--background-muted);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media (min-width: 768px) {
		.register-section {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
		.left-col {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.right-col {
			border-left: 1px solid var(--border);
		}
	}
</style>
