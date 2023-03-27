<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';
	import type { DialogueTree } from '$lib/types';
	import DiceRoll from './DiceRoll.svelte';

	type BranchKey = 'start' | 'success' | 'failure';
	let diceResult = 0;

	function branchDialogue(): BranchKey {
		return diceResult > 4 ? 'success' : 'failure';
	}

	let tree: DialogueTree<BranchKey> = {
		start: ['You fall off from a cliff.', { component: DiceRoll }, branchDialogue],
		success: ['** You survived. **'],
		failure: ['** You died. **']
	};
</script>

<!-- TODO: mix roleplay and narration into roleplay -->

<Dialogue
	{tree}
	on:dialogueEnd={() => alert('dialogue ended')}
	on:componentEvent={(e) => console.log(e)}
	on:componentEnd={(e) => {
		diceResult = e.detail.result;
	}}
/>
