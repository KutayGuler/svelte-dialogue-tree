<script lang="ts">
	import Restaurant from './Restaurant.svelte';
	import Roleplay from './Roleplay.svelte';
	import Html from './Html.svelte';
	import { CodeBlock, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Instruction from '../Instruction.svelte';
	import Cyberpunk from './Cyberpunk.svelte';
	import { cyberpunkCode, htmlCode, restaurantCode, roleplayCode } from './demoCodes';
	const demos = ['Restaurant', 'Roleplay', 'HTML', 'Cyberpunk'];
	let currentExample = 'restaurant';
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.code == 'Space' && e.target == document.body) {
			e.preventDefault();
		}
	}}
/>

<main class="flex flex-col gap-4 rounded p-4">
	<h1>Preview</h1>
	<Instruction />
	<TabGroup regionPanel="w-full h-[560px]">
		{#each demos as demo}
			{@const value = demo.toLowerCase()}
			<Tab bind:group={currentExample} name={value} {value}>{demo}</Tab>
		{/each}
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
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

	<h1>Code</h1>
	{#if currentExample == 'restaurant'}
		<CodeBlock language="svelte" code={restaurantCode} />
	{:else if currentExample == 'roleplay'}
		<CodeBlock language="svelte" code={roleplayCode} />
	{:else if currentExample == 'html'}
		<CodeBlock language="svelte" code={htmlCode} />
	{:else if currentExample == 'cyberpunk'}
		<CodeBlock language="svelte" code={cyberpunkCode} />
	{/if}
</main>
