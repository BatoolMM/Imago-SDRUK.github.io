<script lang="ts">
	import Button from '$lib/ui/buttons/button.svelte'
	import Email from '$lib/ui/inputs/email.svelte'
	import Input from '$lib/ui/inputs/input.svelte'
	import Paragraph from '$lib/ui/text/paragraph.svelte'
	import { Subtitle } from '@arturoguzman/art-ui'
</script>

<div class="register-section">
	<div class="left-col">
		<img src="/favicon.png" alt="" />
	</div>
	<div class="right-col">
		<form action="">
			<div class="form-header">
				<img class="logo" src="/favicon.png" alt="" />
				<Subtitle subtitle="Password reset"></Subtitle>
			</div>
			<Input label_text="Email" layout={1} label_design={1}>
				<Email key="email" design={1}></Email>
			</Input>
			<Button>Request</Button>
			<div class="form-bottom">
				<Paragraph>
					<span><a href="/login">Cancel</a></span>
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
