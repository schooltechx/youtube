# Tiptap
HTML Editor ที่รองรับ รองรับ React, Vue2-3, Svelte

- ตัวอย่างการใช้งานกับ [SvelteKit](https://tiptap.dev/installation/svelte) 
- ตัวอย่างแบบต่างๆ [ตัวอย่าง](https://tiptap.dev/examples/default)
- ตัวอย่างการส่งค่า content กลับมา

$lib/Tiptap.svelte
``` html
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	export let content = '';
	let element: HTMLDivElement;
	let editor: Editor;
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: () => {
				content = editor.getHTML();
			}
		});
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}
<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>

```
+page.svelte
``` html
<script lang="ts">
import Tiptap from '$lib/Tiptap.svelte';
let content = "<h1> Hello oom </h1>"
</script>
<div >
    <Tiptap  bind:content={content}  />
</div>
<div>{@html content}</div>

```

# svelte-tiptap
[Svelte components](https://github.com/sibiraj-s/svelte-tiptap) สำหรับ tiptap v2