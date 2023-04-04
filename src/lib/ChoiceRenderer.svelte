<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import type { ChoiceObject } from './types.js';
	export let choices: Array<ChoiceObject<string, string>>;
	export let choiceContainerClass: string;
	export let choiceClass: string;
	export let historyIndex: number;
	export let makeChoice: (e: SubmitEvent) => void;
	export let choiceIn: (node: Element, params: object) => TransitionConfig;
	export let choiceInOptions: object;
	export let choiceStaggerGap: number;
</script>

<form class={choiceContainerClass} on:submit|preventDefault={makeChoice}>
	{#each choices as choice, siblingIndex}
		{@const title = typeof choice.titleTag == 'function' ? choice.titleTag() : choice.titleTag}
		{@const disabled = typeof choice.disabled == 'function' ? choice.disabled() : choice.disabled}
		<button
			{title}
			{disabled}
			in:choiceIn={{
				...choiceInOptions,
				delay: siblingIndex * choiceStaggerGap
			}}
			type="submit"
			class={choiceClass}
			data-player-index={historyIndex}
			data-sibling-index={siblingIndex}
			data-text={choice.text}
		>
			{@html choice.label}
		</button>
	{/each}
</form>
