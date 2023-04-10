<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DialogueTree } from '$lib';
	import Dialogue from '$lib/Dialogue.svelte';
	import { onMount } from 'svelte';

	function gotoDocs() {
		goto('/docs');
		return 'start';
	}

	function gotoInstallation() {
		goto('/installation');
		return 'start';
	}

	function gotoDemos() {
		goto('/demos');
		return 'start';
	}

	function gotoRepo() {
		goto('https://github.com/KutayGuler/svelte-dialogue-tree');
		return 'start';
	}

	const tree: DialogueTree = {
		start: [
			'The dialogue tree...',
			"you didn't ask for.",
			[
				{ label: 'Install', text: 'Take me to the installation.', next: gotoInstallation },
				{ label: 'Check the docs', text: 'Take me to the docs.', next: gotoDocs },
				{ label: 'Check the demos', text: 'Take me to the demos.', next: gotoDemos },
				{ label: 'Check the repo', text: 'Take me to the repo.', next: gotoRepo }
			]
		]
	};

	let dialogue: any;

	onMount(() => {
		setTimeout(() => {
			dialogue.nextLine();
		}, 1000);
		setTimeout(() => {
			dialogue.nextLine();
		}, 2000);
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.code == 'Space') {
			return;
		}
	}}
/>

<Dialogue
	{tree}
	containerClass="bg-transparent flex flex-col w-full gap-2 p-4"
	bind:this={dialogue}
/>
