<script lang="ts">
	import { Dialogue, type ChoiceLeaf, type ChoiceObject } from '$lib';
	import type { DialogueTree } from '$lib';
	import Instruction from '../Instruction.svelte';
	import { CodeBlock, Tab, TabGroup } from '@skeletonlabs/skeleton';

	const managers = [
		{ name: 'npm', installation: 'npm install svelte-dialogue-tree' },
		{ name: 'pnpm', installation: 'pnpm add svelte-dialogue-tree' },
		{ name: 'yarn', installation: 'yarn add svelte-dialogue-tree' },
		{ name: 'bun', installation: 'bun install svelte-dialogue-tree' }
	];

	let code = '';

	function getConfirmationMessage() {
		return `Pasted <code>${code}</code> to your clipboard.`;
	}

	type BranchKey = 'start' | 'done';

	function listAvailableManagers(): Array<ChoiceObject<BranchKey, string>> {
		let choices = [];
		for (let { name, installation } of managers) {
			choices.push({
				label: name,
				text: name,
				next: () => {
					code = installation;
					navigator.clipboard.writeText(installation);
					return 'done' as BranchKey;
				}
			});
		}
		return choices;
	}

	const tree: DialogueTree<BranchKey> = {
		start: ['Choose your package manager, traveler.', listAvailableManagers],
		done: [
			getConfirmationMessage,
			[
				{ label: 'Thanks!', text: 'Thanks!', next: ['Your welcome, traveler.'] },
				{
					label: 'Change manager',
					text: 'I changed my mind. I want to choose another package manager.',
					next: 'start'
				}
			]
		]
	};

	let tabSet = 0;
</script>

<main class="p-4">
	<TabGroup regionList="text-5xl font-heading-token" regionPanel="flex flex-col gap-4">
		<Tab bind:group={tabSet} name="tab1" value={0}>Installation</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Usage</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Instruction />
				<Dialogue
					{tree}
					containerClass="bg-transparent w-full h-96 flex flex-col gap-2 overflow-y-auto overflow-x-hidden"
				/>
			{:else if tabSet === 1}
				<blockquote>
					If you want to use the default styles, import style.css in your layout file.
				</blockquote>
				<CodeBlock
					language="svelte"
					code={`// +layout.js
<script>
	import 'svelte-dialogue-tree/style.css';
<\/script>
		`}
				/>
				<p>
					Pass a tree prop to Dialogue, check the <a href="/docs/#schema">schema</a> to create an advanced
					dialogue tree.
				</p>
				<CodeBlock
					language="svelte"
					code={`// +page.js
<script>
	import { Dialogue } from "svelte-dialogue-tree";

	const tree = {
		start: ["sample text."]
	}
<\/script>

<Dialogue {tree} />
				`}
				/>
			{/if}
		</svelte:fragment>
	</TabGroup>
</main>

<!-- <main class="flex flex-col gap-4 p-4">
	<h1>Installation</h1>
</main> -->
