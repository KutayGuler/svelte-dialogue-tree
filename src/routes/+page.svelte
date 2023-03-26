<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';
	import type { DialogueTree } from '$lib/types';

	const tree: DialogueTree = {
		start: [{ text: '** something **', onSpawn: () => {} }]
	};
</script>

<Dialogue {tree} />
