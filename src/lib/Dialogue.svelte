<script lang="ts">
	import type {
		Branch,
		DialogueTree,
		CharacterCollection,
		ChoiceLeaf,
		TextObject,
		WithOnSpawn
	} from './types.js';
	import { beforeUpdate, afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import { fly, scale, type TransitionConfig } from 'svelte/transition';
	import TextRenderer from './TextRenderer.svelte';
	import ChoiceRenderer from './ChoiceRenderer.svelte';

	type BranchKey = string;
	type CharacterKey = string;

	// DATA
	export let tree: DialogueTree<BranchKey, CharacterKey>;
	export let characters: CharacterCollection<CharacterKey> | undefined = {};

	// CLASSES
	export let containerClass = 'sdt-container';
	export let choiceContainerClass = 'sdt-choice-container';
	export let choiceClass = 'sdt-choice';
	export let playerTextClass = 'sdt-player';
	export let npcContainerClass = 'sdt-npc-container';
	export let npcTextClass = 'sdt-npc';
	export let charContainerClass = 'sdt-char-container';
	export let charAvatarClass = 'sdt-char-avatar';
	export let charNameClass = 'sdt-char-name';
	export let narrationClass = 'sdt-narration';
	export let jumperClass = 'sdt-jumper';
	export let jumperText = 'JUMP TO BOTTOM';

	// NEXT LINE STUFF
	export let nextLineKey = 'Space';
	/**
	 * This function mutates history
	 * before the data is presented
	 */
	export const nextLine = () => {
		let upcoming = history[index + 1];
		if (typeof upcoming == 'string' && upcoming.includes('**')) {
			let splittedText = splitText(upcoming);
			if (splittedText.length > 0) {
				history.splice(index + 1, 1, ...splittedText);
			}
		} else if (typeof upcoming == 'function') {
			const ret = upcoming();
			if (Array.isArray(ret)) {
				history[index + 1] = ret;
				interacting = true;
			} else if (typeof ret == 'string') {
				/**
				 * add branch to the history if ret is
				 * a BranchKey
				 */
				if (tree[ret]) {
					/**
					 * removing function from history
					 */
					history.pop();
					// @ts-expect-error
					history = [...history, ...tree[ret]];
				} else {
					history[index + 1] = ret;
				}
				// @ts-expect-error
			} else if (typeof ret == 'object' && !ret.component) {
				let splittedText = splitText((ret as TextObject).text);
				if (splittedText.length > 0) {
					history.splice(index + 1, 1, ...splittedText);
				}
				if ((ret as TextObject & WithOnSpawn).onSpawn) {
					(ret as TextObject & WithOnSpawn).onSpawn();
				}
			}
		} else if (!Array.isArray(upcoming) && typeof upcoming == 'object' && !upcoming.component) {
			let splittedText = splitText((upcoming as TextObject).text);
			if (splittedText.length > 0) {
				history.splice(index + 1, 1, ...splittedText);
			}

			if ((upcoming as TextObject & WithOnSpawn).onSpawn) {
				(upcoming as TextObject & WithOnSpawn).onSpawn();
			}
		}

		index += 1;
	};

	// NPC TEXT TRANSITION
	export let npcIn: (node: Element, params: object) => TransitionConfig = fly;
	export let npcInOptions: object = { x: -200 };

	// PLAYER TEXT TRANSITION
	export let playerIn: (node: Element, params: object) => TransitionConfig = fly;
	export let playerInOptions: object = { x: 200 };

	// CHOICE BUTTON TRANSITION
	export let choiceIn: (node: Element, params: object) => TransitionConfig = scale;
	export let choiceInOptions: object = {};
	export let choiceStaggerGap: number = 200;

	// NARRATION TRANSITION
	export let narrationIn: (node: Element, params: object) => TransitionConfig = fly;
	export let narrationInOptions: object = { y: -50 };

	const narrationRegex = /\*\*(.*?)\*\*/g;

	function splitText(text: string): Array<string> {
		let narrations = text.match(narrationRegex);
		if (!narrations) return [];
		let splitted = text.split('*');

		for (let i = 0; i < splitted.length; i++) {
			if (i == 0 || i == splitted.length - 1) continue;
			if (splitted[i - 1] == '' && splitted[i + 1] == '') {
				let narration = '**'.concat(splitted[i], '**');
				splitted.splice(i - 1, 3, narration);
			}
		}

		return splitted.filter((s) => !s.split('').every((x) => x == '' || x == ' '));
	}

	const dispatch = createEventDispatcher();
	let container: HTMLElement;
	let autoscroll = false;
	let showJumper = false;

	beforeUpdate(() => {
		autoscroll =
			container &&
			container.offsetHeight + container.scrollTop >
				container.scrollHeight - container.offsetHeight * 0.1;
	});

	afterUpdate(() => {
		if (autoscroll) {
			container.scrollTo(0, container.scrollHeight);
		}
	});

	let interacting = false;
	let index = -1;
	let key = '';
	let history: Branch<string, string> = [''];
	let playerTextIndexes: Array<number> = [];

	function generateKey(): string {
		let key = '_' + Math.random().toString(36).substring(7);
		if (tree[key]) {
			return generateKey();
		}
		return key;
	}

	/**
	 * Flattens the tree if it has nested branches
	 */
	function flatten(key: BranchKey) {
		let choices = tree[key].at(-1);

		// confirming that it's an array of ChoiceObjects
		if (Array.isArray(choices)) {
			for (let choice of choices) {
				if (!Array.isArray(choice.next)) continue;
				let generatedKey = generateKey();
				tree[generatedKey] = choice.next;
				choice.next = generatedKey;
				flatten(generatedKey);
			}
		}
	}

	onMount(() => {
		key = Object.keys(tree)[0];
		history = new Array(...tree[key]) as Branch<BranchKey, CharacterKey>;
		flatten(key);
		nextLine();
	});

	function checkForEnd() {
		if (!history[index]) {
			dispatch('dialogueEnd');
		}
	}

	function makeChoice(e: SubmitEvent) {
		let text = e.submitter?.dataset.text as string;
		let playerIndex = +(e.submitter?.dataset.playerIndex || -1);
		let siblingIndex = +(e.submitter?.dataset.siblingIndex || 0);
		let choicesArray = tree[key].at(-1) as ChoiceLeaf<BranchKey, CharacterKey>;

		if (typeof choicesArray == 'function') {
			choicesArray = choicesArray();
		}

		let { next } = choicesArray[siblingIndex];

		if (!next) {
			dispatch('dialogueEnd');
		}

		/**
		 * unmounts the choices from the DOM
		 */
		history.pop();

		if (typeof next == 'string') {
			key = next;
			history.push(text, ...(tree[key] as any));
		} else if (typeof next == 'function') {
			key = next();
			history.push(text, ...(tree[key] as any));
		} else if (Array.isArray(next)) {
			history.push(text, ...(next as any));
		} else {
			dispatch('dialogueEnd');
			return;
		}

		playerTextIndexes.push(playerIndex);
		interacting = false;

		/**
		 * required to rerender the DOM
		 */
		history = history;
	}

	function spawnedComponent(node: Element) {
		interacting = true;
		node.remove();
	}

	function handle(code: string) {
		if (interacting || Array.isArray(history[index])) {
			interacting = true;
			return;
		}

		if (code == nextLineKey) {
			nextLine();
		}

		checkForEnd();
	}

	function handleClick(e: MouseEvent) {
		if ((e.target as HTMLButtonElement)?.nodeName == 'BUTTON') return;
		handle(nextLineKey);
	}
</script>

<svelte:window on:keydown={(e) => handle(e.code)} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={handleClick}
	on:scroll={() => {
		showJumper =
			container &&
			container.scrollHeight != container.offsetHeight &&
			container.offsetHeight + container.scrollTop <
				container.scrollHeight - container.offsetHeight * 0.1;
	}}
	bind:this={container}
	class={containerClass}
>
	{#each history as item, historyIndex (historyIndex)}
		{@const isPlayer = playerTextIndexes.includes(historyIndex)}
		{@const isChoice = Array.isArray(item) && item.length != 0}
		{@const isNarration = typeof item == 'string' && item.includes('**')}
		{#if index >= historyIndex}
			{#if isChoice}
				<ChoiceRenderer
					choices={item}
					{choiceIn}
					{makeChoice}
					{choiceClass}
					{historyIndex}
					{choiceInOptions}
					{choiceStaggerGap}
					{choiceContainerClass}
				/>
			{:else if typeof item == 'object'}
				{#if item.component}
					<span use:spawnedComponent />
					<svelte:component
						this={item.component}
						{...item.args}
						on:componentEvent
						on:componentEnd={(e) => {
							dispatch('componentEnd', e.detail);
							interacting = false;
						}}
					/>
				{:else}
					<TextRenderer
						{...item}
						{npcIn}
						{npcContainerClass}
						{npcTextClass}
						{characters}
						{npcInOptions}
						{charContainerClass}
						{charAvatarClass}
						{charNameClass}
					/>
				{/if}
			{:else if isNarration}
				<div in:narrationIn={narrationInOptions} class={narrationClass}>
					{@html item.replaceAll('**', '')}
				</div>
			{:else if isPlayer}
				<div class={playerTextClass} in:playerIn={playerInOptions} out:playerIn={{ duration: 0 }}>
					{@html item}
				</div>
			{:else}
				<div class={npcTextClass} in:npcIn={npcInOptions}>
					{@html item}
				</div>
			{/if}
		{/if}
	{/each}
	{#if showJumper}
		<!-- "btn variant-filled-primary sticky bottom-0 self-center" -->
		<button
			class={jumperClass}
			on:click={() => {
				container.scrollTo(0, container.scrollHeight);
			}}>{jumperText}</button
		>
	{/if}
</div>
