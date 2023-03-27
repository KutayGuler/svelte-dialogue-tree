<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import type { CharacterCollection } from './types';
	export let text: string;
	export let character: string = '';
	export let characters: CharacterCollection<string> | undefined;
	export let npcClass: string;
	export let npcIn: (node: Element, params: object) => TransitionConfig;
	export let npcInOptions: (node: Element, params: object) => TransitionConfig;
</script>

<div class="flex flex-col gap-2" in:npcIn={npcInOptions}>
	{#if characters && character}
		{@const { name, avatarSrc } = characters[character]}
		<div class="flex flex-row items-center gap-2">
			{#if avatarSrc}
				<img class="h-8 w-8 rounded-full" src={avatarSrc} alt="avatar" />
			{/if}
			<p class="font-bold">
				{@html name}
			</p>
		</div>
	{/if}
	<p class={npcClass || 'sdt-npc'}>
		{@html text}
	</p>
</div>
