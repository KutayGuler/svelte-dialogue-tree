<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';
	import type { DialogueTree } from '$lib/types';

	const managers = [
		{ name: 'npm', installation: 'npm install svelte-dialogue-tree' },
		{ name: 'pnpm', installation: 'pnpm add svelte-dialogue-tree' },
		{ name: 'yarn', installation: 'yarn add svelte-dialogue-tree' },
		{ name: 'bun', installation: 'bun install svelte-dialogue-tree' }
	];

	function copyToClipboard(str: string) {
		navigator.clipboard.writeText(str);
	}

	function listAvailableManagers() {
		let choices = [];
		for (let { name, installation } of managers) {
			choices.push({
				label: name,
				text: name,
				next: () => {
					copyToClipboard(installation);
					return 'done';
				}
			});
		}
		return choices;
	}

	const tree: DialogueTree<'start' | 'done'> = {
		// @ts-expect-error
		start: ['Choose wisely.', listAvailableManagers],
		done: ['Pasted to your clipboard']
	};
</script>

<Dialogue {tree} containerClass="bg-transparent w-full p-4" />
