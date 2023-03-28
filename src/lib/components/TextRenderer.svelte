<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import type { CharacterCollection } from '../types';
	import CharacterRenderer from '../CharacterRenderer.svelte';
	export let text: string;
	export let charInBubble = false;
	export let character: string = '';
	export let characters: CharacterCollection<string> | undefined;
	export let npcClass: string;
	export let charContainerClass: string;
	export let charAvatarClass: string;
	export let charNameClass: string;
	export let npcIn: (node: Element, params: object) => TransitionConfig;
	export let npcInOptions: (node: Element, params: object) => TransitionConfig;
</script>

<div class="sdt-char-and-text-container" in:npcIn={npcInOptions}>
	{#if !charInBubble && characters && character}
		{@const { name, avatarSrc } = characters[character]}
		<CharacterRenderer {charContainerClass} {charAvatarClass} {charNameClass} {name} {avatarSrc} />
	{/if}
	<div class={npcClass || 'sdt-npc'}>
		{#if charInBubble && characters && character}
			{@const { name, avatarSrc } = characters[character]}
			<CharacterRenderer
				{charContainerClass}
				{charAvatarClass}
				{charNameClass}
				{name}
				{avatarSrc}
			/>
		{/if}
		{@html text}
	</div>
</div>
