<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import CharacterRenderer from './CharacterRenderer.svelte';
	import type { CharacterCollection } from './types';
	export let text: string;
	export let character: string = '';
	export let characters: CharacterCollection<string> | undefined;
	export let npcClass: string;
	export let npcIn: (node: Element, params: object) => TransitionConfig;
	export let npcInOptions: (node: Element, params: object) => TransitionConfig;
	export let charInBubble = false;
</script>

<!-- TODO: turn tailwind classes to vanilla css -->
<div class="sdt-char-and-text-container" in:npcIn={npcInOptions}>
	{#if !charInBubble && characters && character}
		{@const { name, avatarSrc } = characters[character]}
		<CharacterRenderer {name} {avatarSrc} />
	{/if}
	<div class={npcClass || 'sdt-npc'}>
		{#if charInBubble && characters && character}
			{@const { name, avatarSrc } = characters[character]}
			<CharacterRenderer {name} {avatarSrc} />
		{/if}
		{@html text}
	</div>
</div>

<style>
	.sdt-char-and-text-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
