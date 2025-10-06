<script lang="ts">
	import Button from '$lib/ui/buttons/button.svelte'
	import Email from '$lib/ui/inputs/email.svelte'
	import Input from '$lib/ui/inputs/input.svelte'
	import Text from '$lib/ui/inputs/text.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import { Subtitle } from '@arturoguzman/art-ui'
	import { IconBrandGitlab } from '@tabler/icons-svelte'
</script>

<div class="register-section">
	<div class="left-col">
		<img src="/favicon.png" alt="" />
	</div>
	<div class="right-col">
		<form action="">
			<div class="form-header">
				<img class="logo" src="/favicon.png" alt="" />
				<Subtitle subtitle="Sign In"></Subtitle>
			</div>
			<div class="form-sso-buttons">
				<Button type="button">SSO</Button>
				<Button type="button">
					{#snippet leftCol()}
						<IconBrandGitlab></IconBrandGitlab>
					{/snippet}
					{#snippet rightCol()}
						Gitlab
					{/snippet}
				</Button>
			</div>

			<Input label_text="Name" layout={1} label_design={1}>
				<Text key="name" design={1}></Text>
			</Input>
			<Input label_text="Email" layout={1} label_design={1}>
				<Email key="email" design={1}></Email>
			</Input>
			<Button>Login</Button>
			<div class="form-bottom">
				<Paragraph>
					Don't have an account? <span><a href="/register">Sign Up</a></span>
				</Paragraph>
				<Paragraph>
					<span><a href="/password-reset">Forgot your password?</a></span>
				</Paragraph>
			</div>
		</form>
	</div>
</div>

<style>
	.register-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		height: 100lvh;
		/* gap: 2rem; */
	}
	.left-col {
		padding: 2rem;
		display: none;
		/* background-color: var(--secondary); */
	}
	.right-col {
		padding: 2rem;
		background-color: var(--theme-colour-primary);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.form-header {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		font-family: var(--font-paragraph);
	}
	.form-bottom {
		display: grid;
		font-family: var(--font-paragraph);
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		justify-items: end;
	}
	.logo {
		height: 2.5rem;
	}
	.form-sso-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-bottom: 1px solid var(--primary);
		padding-bottom: 1rem;
	}
	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		width: min(100%, 500px);
		padding: 2rem;
		background-color: var(--bg);
		border-radius: 0.35rem;
		box-shadow: 0px 0px 2px var(--bg);
	}
	a {
		font-family: var(--font-paragraph);
		font-weight: 600;
	}
	@media (min-width: 768px) {
		.left-col {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
