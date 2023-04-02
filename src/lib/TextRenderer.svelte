<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import type { CharacterCollection } from './types';
	export let text: string;
	export let character = '';
	export let characters: CharacterCollection<string> | undefined;
	export let npcContainerClass: string;
	export let npcTextClass: string;
	export let charContainerClass: string;
	export let charAvatarClass: string;
	export let charNameClass: string;
	export let npcIn: (node: Element, params: object) => TransitionConfig;
	export let npcInOptions: object;
</script>

<div class={npcContainerClass} in:npcIn={npcInOptions}>
	{#if characters && character}
		{@const { name, avatarSrc } = characters[character]}
		<div class={charContainerClass}>
			{#if avatarSrc}
				<img class={charAvatarClass} src={avatarSrc} alt="avatar" />
			{/if}
			<div class={charNameClass}>
				{@html name}
			</div>
		</div>
	{/if}
	<div class={npcTextClass}>
		{@html text}
	</div>
</div>
