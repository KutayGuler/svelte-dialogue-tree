<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	const dispatch = createEventDispatcher();
	let rolling = false;
	let result = 0;

	function random() {
		return Math.floor(Math.random() * 5 + 1);
	}

	async function roll() {
		return new Promise((resolve) => {
			setTimeout(() => {
				result = random();
				resolve(result);
			}, 2000);
		});
	}

	function rollOver(node: Element) {
		dispatch('componentEnd', {
			result
		});
	}
</script>

<div class="h-80 w-1/2 rounded border-black bg-white">
	{#if rolling}
		{#await roll()}
			<p>Rolling...</p>
		{:then result}
			<p use:rollOver>You rolled {result}</p>
		{/await}
	{:else}
		<button on:click={() => (rolling = true)}>ROLL DICE</button>
	{/if}
</div>
