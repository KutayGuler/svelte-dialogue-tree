<script lang="ts">
	import Restaurant from './Restaurant.svelte';
	import Roleplay from './Roleplay.svelte';
	import Html from './Html.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Instruction from '../Instruction.svelte';
	import Cyberpunk from './Cyberpunk.svelte';

	const demos = ['Restaurant', 'Roleplay', 'HTML', 'Cyberpunk'];

	let currentExample = 'restaurant';
</script>

<main class="flex flex-col gap-4 rounded p-4">
	<h1>Demos</h1>
	<Instruction />
	<TabGroup regionPanel="flex h-[600px] w-full flex-col items-start">
		{#each demos as demo}
			<Tab bind:group={currentExample} name={demo.toLowerCase()} value={demo.toLowerCase()}
				>{demo}</Tab
			>
		{/each}
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="absolute -z-10 h-full w-full bg-surface-700" />
			{#if currentExample == 'restaurant'}
				<Restaurant />
			{:else if currentExample == 'roleplay'}
				<Roleplay />
			{:else if currentExample == 'html'}
				<Html />
			{:else if currentExample == 'cyberpunk'}
				<Cyberpunk />
			{/if}
		</svelte:fragment>
	</TabGroup>
</main>
