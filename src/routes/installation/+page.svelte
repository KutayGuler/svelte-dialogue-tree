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

<!-- display: flex; flex-direction: column; align-items: flex-start; width: 100%; height: 100%;
background-color: #bfb9b9; padding: 1rem; border-radius: 1rem; overflow-y: auto; overflow-x: hidden;
gap: 0.5rem; -->
<!-- <div class="flex h-full w-full flex-col items-start gap-2 rounded bg-surface-700 p-4">
	<button
		class="max-w-xs rounded-xl bg-primary-700 p-4 hover:bg-secondary-700 focus:bg-secondary-700"
		>asfsdfs</button
	>
	<div class="max-w-xs self-end rounded-xl bg-surface-800 p-4">dfdsdsf</div>
</div> -->

<Dialogue {tree} containerClass="bg-transparent w-full p-4" />
