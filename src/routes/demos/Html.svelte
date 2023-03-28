<script lang="ts">
	import { Dialogue } from '$lib';
	import type { DialogueTree } from '$lib';

	type BranchKey = 'start';

	let tree: DialogueTree<BranchKey> = {
		start: [
			`Check out my website <a style="color: red;" href="https://svelte.dev" target="_blank" rel="noreferrer">here</a>`
		]
	};
</script>

<Dialogue {tree} on:dialogueEnd={() => alert('dialogue ended')} />
