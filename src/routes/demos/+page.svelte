<script lang="ts">
	import Restaurant from './Restaurant.svelte';
	import Roleplay from './Roleplay.svelte';
	import Html from './Html.svelte';
	import Narration from './Narration.svelte';
	import { RadioGroup, RadioItem, CodeBlock, Tab, TabGroup } from '@skeletonlabs/skeleton';

	const demos = ['Restaurant', 'Roleplay', 'HTML', 'Narration'];

	let currentExample = 'restaurant';
</script>

<main class="flex flex-col gap-4 p-4">
	<h1>Demos</h1>

	<p class="pl-4">
		Press <kbd class="kbd">Space</kbd> to continue the conversation
	</p>

	<TabGroup regionPanel="flex h-[600px] w-full flex-col items-start p-4">
		{#each demos as demo}
			<Tab bind:group={currentExample} name={demo.toLowerCase()} value={demo.toLowerCase()}
				>{demo}</Tab
			>
		{/each}
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if currentExample == 'restaurant'}
				<Restaurant />
			{:else if currentExample == 'roleplay'}
				<Roleplay />
			{:else if currentExample == 'html'}
				<Html />
			{:else if currentExample == 'narration'}
				<Narration />
			{/if}
		</svelte:fragment>
	</TabGroup>
</main>
