<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import type { ChoiceObject } from './types';
	export let choices: Array<ChoiceObject<string, string>>;
	export let choiceContainerClass: string;
	export let choiceClass: string;
	export let historyIndex: number;
	export let makeChoice: (e: SubmitEvent) => void;
	export let choiceIn: (node: Element, params: object) => TransitionConfig;
	export let choiceInOptions: object;
	export let choiceStaggerGap: number;
</script>

<form class={choiceContainerClass || 'sdt-choice-container'} on:submit|preventDefault={makeChoice}>
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
			class={choiceClass || 'sdt-choice'}
			data-user-index={historyIndex}
			data-sibling-index={siblingIndex}
			data-text={choice.text}
		>
			{@html choice.label}
		</button>
	{/each}
</form>

<style>
	:root {
		--sdt-bubble-bg: #26211d;
		--sdt-bubble-color: #fbe7d1;
		--sdt-choice-bg: #b06514;
		--sdt-choice-bg-hover: #b8d6a6;
		--sdt-choice-color: var(--sdt-bubble-color);
		--sdt-choice-color-hover: #4a6551;
	}

	.sdt-choice-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 0.5rem;
	}

	.sdt-choice {
		background-color: var(--sdt-choice-bg);
		padding: 1rem;
		width: 100%;
		border-radius: 0.75rem;
	}

	.sdt-choice:hover,
	.sdt-choice:focus {
		background-color: var(--sdt-choice-bg-hover);
		color: var(--sdt-choice-color-hover);
	}

	.sdt-choice:disabled {
		opacity: 50%;
	}

	.sdt-choice:disabled:hover {
		background-color: var(--sdt-choice-bg);
	}
</style>
