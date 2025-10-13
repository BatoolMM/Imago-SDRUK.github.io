<script lang="ts">
	import { Button, Email, Input, Text, Paragraph, Icon } from '@imago/ui'
	import { Subtitle } from '@imago/ui'
</script>

<div class="register-section">
	<div class="left-col">
		<img src="/favicon.png" alt="" />
	</div>
	<div class="right-col">
		<form action="">
			<div class="form-header">
				<img class="logo" src="/favicon.png" alt="" />
				<Subtitle text="Sign In"></Subtitle>
			</div>
			<div class="form-sso-buttons">
				<Button type="button">SSO</Button>
				<Button type="button">
					{#snippet leftCol()}
						<Icon icon={{ icon: 'brand-gitlab', set: 'tabler' }}></Icon>
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
	}
	.left-col {
		padding: 2rem;
		display: none;
	}
	.right-col {
		padding: 2rem;
		background-color: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.form-header {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		font-family: var(--paragraph);
	}
	.form-bottom {
		display: grid;
		font-family: var(--paragraph);
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
		border-bottom: 1px solid var(--border-muted);
		padding-bottom: 1rem;
	}
	form {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		width: min(100%, 500px);
		padding: 2rem;
		background-color: var(--background);
		border-radius: 0.35rem;
		box-shadow: 0px 0px 2px var(--background);
	}
	a {
		font-family: var(--paragraph);
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
