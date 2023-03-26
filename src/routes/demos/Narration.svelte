<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';

	const tree = {
		start: [
			'Hi',
			'npc text ** narration1 ** npc text ** narration2 **',
			'** standalone narration **',
			'** not standalone narration ** npc text'
		]
	};
</script>

<div class="h-56">
	<Dialogue {tree} on:dialogueEnd={() => alert('dialogue ended')} />
</div>
