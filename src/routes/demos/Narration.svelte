<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';
	import type { DialogueTree } from '$lib/types';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	const health = tweened(100, {
		duration: 400,
		easing: cubicOut
	});

	function fallFromCliff() {
		health.update((hp) => hp - 50);
	}

	const tree: DialogueTree<'start'> = {
		start: [
			'** You wake up near a cliff. **',
			{
				text: '** You panic and fall from the cliff. ** npc text',
				onSpawn: fallFromCliff
			},
			'** narration ** npc text ** narration **'
		]
	};
</script>

<ProgressBar height="h-4" labelledby="Health Bar" value={$health} meter="bg-success-600" />
<Dialogue {tree} on:dialogueEnd={() => alert('dialogue ended.')} />
