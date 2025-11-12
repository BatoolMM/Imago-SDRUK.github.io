<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { notify } from '$lib/stores/notify.js'
	import { BaseSection, Button, Input, Text } from '@imago/ui'
	let { data } = $props()
</script>

<BaseSection style="bleed">
	<form
		action="?/access"
		use:enhance={() => {
			return async ({ result }) => {
				if ('data' in result) {
					notify.send(String(result.data?.message))
				}
				applyAction(result)
			}
		}}
		method="post"
	>
		<div class="img-wrapper">
			<img src="/imago_logo.png" alt="logo" />
		</div>
		<div class="form-elements">
			<div class="fields">
				<Input label="Invite code">
					<Text type="password" name="token"></Text>
				</Input>
			</div>
			<div class="buttons">
				<Button>Access</Button>
			</div>
		</div>
	</form>
</BaseSection>

<style>
	form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(100% - 2rem, 600px);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.img-wrapper {
		display: flex;
		height: 8rem;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	img {
		height: 100%;
		object-fit: contain;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}
	.form-elements {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
