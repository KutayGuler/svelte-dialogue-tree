<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';

	const tree = {
		start: [
			'** You wake up near a cliff. **',
			{
				text: '** You panic and fall from the cliff. ** npc text',
				onSpawn: () => console.log('fell from cliff')
			},
			'** narration ** npc text ** narration **'
		]
	};
</script>

<Dialogue {tree} />
