<script lang="ts">
	import AuthFormSettings from '$lib/ui/auth/auth_form_settings.svelte'
	import { BaseSection } from '@imago/ui'

	let { data } = $props()
</script>

<BaseSection>
	<div class="account-section">
		<AuthFormSettings form={data.form}></AuthFormSettings>
	</div>
</BaseSection>

<style>
	.account-section {
		/* display: grid; */
		/* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); */
		font-size: 0.75rem;
	}
</style>
