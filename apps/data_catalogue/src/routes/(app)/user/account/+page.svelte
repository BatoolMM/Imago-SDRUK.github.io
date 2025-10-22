<script lang="ts">
	import AuthFormSettings from '$lib/ui/auth/auth_form_settings.svelte'
	import { BaseSection } from '@imago/ui'

	let { data } = $props()
</script>

<BaseSection>
	<div class="account-section">
		<div class="left-col">
			<!-- <pre>{jstr(data)}</pre> -->
		</div>
		<div class="right-col">
			<AuthFormSettings form={data.form}></AuthFormSettings>
		</div>
	</div>
</BaseSection>

<style>
	.account-section {
		/* display: grid; */
		/* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); */
		font-size: 0.75rem;
	}
	.left-col {
		overflow: scroll;
	}
</style>
