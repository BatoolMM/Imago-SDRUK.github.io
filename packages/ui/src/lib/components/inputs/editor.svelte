<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { Editor } from '@tiptap/core'
	import { StarterKit } from '@tiptap/starter-kit'

	import BubbleMenu from '@tiptap/extension-bubble-menu'
	import Button from '../buttons/button.svelte'
	import { Icon } from '$lib/icons'
	import { Markdown } from '@tiptap/markdown'

	let {
		content = $bindable(),
		style = 'border'
	}: { content?: string; style?: 'border' | 'floating' } = $props()
	let bubble_menu: HTMLDivElement | null = $state(null)
	let element: HTMLDivElement | null = $state(null)
	let editor_state: { editor: Editor | null } = $state({ editor: null })

	onMount(async () => {
		if (element) {
			editor_state.editor = new Editor({
				element: element,
				extensions: [
					StarterKit,
					BubbleMenu.configure({
						element: bubble_menu
					}),
					Markdown
				],
				content,
				contentType: 'markdown',
				onTransaction: ({ editor }) => {
					// Increment the state signal to force a re-render
					editor_state = { editor }
				},
				onUpdate: ({ editor }) => {
					content = editor.getMarkdown()
				}
			})
		}
	})

	onDestroy(() => {
		editor_state.editor?.destroy()
	})
</script>

<div class="editor" data-style={style}>
	{#if editor_state.editor}
		<div class="fixed-menu">
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				active={editor_state.editor.isActive('heading', { level: 1 })}
			>
				<Icon icon={{ icon: 'heading-01', set: 'hugeicons' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				active={editor_state.editor.isActive('heading', { level: 2 })}
			>
				<Icon icon={{ icon: 'heading-02', set: 'hugeicons' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().setParagraph().run()}
				active={editor_state.editor.isActive('paragraph')}
			>
				<Icon icon={{ icon: 'paragraph', set: 'hugeicons' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleBold().run()}
				active={editor_state.editor.isActive('bold')}
			>
				<Icon icon={{ icon: 'bold', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleItalic().run()}
				active={editor_state.editor.isActive('italic')}
			>
				<Icon icon={{ icon: 'italic', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleStrike().run()}
				active={editor_state.editor.isActive('strike')}
			>
				<Icon icon={{ icon: 'strikethrough', set: 'tabler' }}></Icon>
			</Button>
			<Button type="button" style="clean" onclick={() => editor_state.editor?.chain().undo().run()}>
				<Icon icon={{ icon: 'chevron-left', set: 'tabler' }}></Icon>
			</Button>

			<Button type="button" style="clean" onclick={() => editor_state.editor?.chain().redo().run()}>
				<Icon icon={{ icon: 'chevron-right', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleUnderline().run()}
				active={editor_state.editor.isActive('underline')}
			>
				<Icon icon={{ icon: 'underline', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleCode().run()}
				active={editor_state.editor.isActive('code')}
			>
				<Icon icon={{ icon: 'code', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleBulletList().run()}
				active={editor_state.editor.isActive('bulletList')}
			>
				<Icon icon={{ icon: 'list', set: 'tabler' }}></Icon>
			</Button>
			<Button
				type="button"
				style="clean"
				onclick={() => editor_state.editor?.chain().focus().toggleOrderedList().run()}
				active={editor_state.editor.isActive('orderedList')}
			>
				<Icon icon={{ icon: 'list-numbers', set: 'tabler' }}></Icon>
			</Button>
			<!-- <Button -->
			<!-- 	type="button" -->
			<!-- 	style="clean" -->
			<!-- 	onclick={() => editor_state.editor?.chain().focus().splitListItem('listItem').run()} -->
			<!-- 	disabled={!editor_state.editor.can().splitListItem('listItem')} -->
			<!-- > -->
			<!-- 	<Icon icon={{ icon: 'list-details', set: 'tabler' }}></Icon> -->
			<!-- </Button> -->
			<!-- <Button -->
			<!-- 	type="button" -->
			<!-- 	style="clean" -->
			<!-- 	onclick={() => editor_state.editor?.chain().focus().sinkListItem('listItem').run()} -->
			<!-- 	disabled={!editor_state.editor.can().sinkListItem('listItem')} -->
			<!-- > -->
			<!-- 	<Icon icon={{ icon: 'list-letters', set: 'tabler' }}></Icon> -->
			<!-- </Button> -->
			<!-- <Button -->
			<!-- 	type="button" -->
			<!-- 	style="clean" -->
			<!-- 	onclick={() => editor_state.editor?.chain().focus().liftListItem('listItem').run()} -->
			<!-- 	disabled={!editor_state.editor.can().liftListItem('listItem')} -->
			<!-- > -->
			<!-- 	<Icon icon={{ icon: 'list', set: 'tabler' }}></Icon> -->
			<!-- </Button> -->
		</div>
	{/if}

	<div bind:this={element}></div>
</div>

<style>
	.editor {
		position: relative;
		border-radius: 0.35rem;
		overflow: hidden;
		padding: 0.5rem 0.35rem;
		background-color: var(--background);
		border: 1px solid transparent;
		transition: border 0.3s ease-in-out;
		transition: color 0.3s ease-in-out;
		color: var(--text);
		width: 100%;
		font-family: var(--paragraph);
		padding: 0.5rem;
	}
	.editor[data-style='border'] {
		border: 1px solid var(--border);
	}

	.fixed-menu {
		display: flex;
		gap: 0.25rem;
		justify-content: flex-start;
		/* height: 2rem; */
		overflow: scroll;
		scrollbar-width: none;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}
</style>
