<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';

	const tree = {
		start: ['hello', 'world', 'what', 'is', 'up']
	};

	let dialogueComponent: any;
</script>

<Dialogue {tree} bind:this={dialogueComponent} />

<button
	class="btn variant-filled-primary mt-4 w-full"
	on:click={() => {
		dialogueComponent.nextLine();
	}}>NEXT LINE</button
>
