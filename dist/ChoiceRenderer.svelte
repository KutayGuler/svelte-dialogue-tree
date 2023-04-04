<script>export let choices;
export let choiceContainerClass;
export let choiceClass;
export let historyIndex;
export let makeChoice;
export let choiceIn;
export let choiceInOptions;
export let choiceStaggerGap;
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
