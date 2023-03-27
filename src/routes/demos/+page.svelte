<script lang="ts">
	import Restaurant from './Restaurant.svelte';
	import Roleplay from './Roleplay.svelte';
	import Html from './Html.svelte';
	import Narration from './Narration.svelte';
	import { RadioGroup, RadioItem, CodeBlock } from '@skeletonlabs/skeleton';

	const demos = ['Restaurant', 'Roleplay', 'HTML', 'Narration'];

	let currentExample = 'restaurant';
</script>

<h1>Demos</h1>

<RadioGroup rounded="rounded-container-token" display="flex-col">
	{#each demos as value}
		<RadioItem type="radio" bind:group={currentExample} name="demo" value={value.toLowerCase()}
			>{value}</RadioItem
		>
	{/each}
</RadioGroup>

<p class="pl-4">
	Press <kbd class="kbd">Space</kbd> to continue the conversation
</p>

<main class="flex h-[600px] w-full flex-col items-start justify-center p-4">
	{#if currentExample == 'restaurant'}
		<Restaurant />
	{:else if currentExample == 'roleplay'}
		<Roleplay />
	{:else if currentExample == 'html'}
		<Html />
	{:else if currentExample == 'narration'}
		<Narration />
	{/if}
</main>
