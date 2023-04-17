<script lang="ts">
	import { Dialogue } from '$lib';
	import type { DialogueTree } from '$lib';
	import Dice from './Dice.svelte';

	type BranchKey = 'start' | 'success' | 'failure';
	let diceResult = 0;

	function branchDialogue(): BranchKey {
		return diceResult > 6 ? 'success' : 'failure';
	}

	const tree: DialogueTree<BranchKey> = {
		start: ['** You fall off from a cliff. **', { component: Dice }, branchDialogue],
		success: ['** You survived. **'],
		failure: ['** You died. **']
	};
</script>

<Dialogue
	{tree}
	on:dialogueEnd={() => console.log('dialogue ended')}
	on:componentEnd={(e) => {
		diceResult = e.detail.result;
	}}
/>
