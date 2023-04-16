<script lang="ts">
	import { Dialogue } from '$lib';
	import type { DialogueTree } from '$lib';

	const tree: DialogueTree<'start'> = {
		start: [
			`Check out the repo <a style="color: red;" href="https://github.com/KutayGuler/svelte-dialogue-tree" target="_blank" rel="noreferrer">here</a>`
		]
	};
</script>

<Dialogue {tree} on:dialogueEnd={() => console.log('dialogue ended')} />
