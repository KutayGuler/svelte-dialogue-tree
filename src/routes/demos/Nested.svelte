<script lang="ts">
	import Dialogue from '$lib/Dialogue.svelte';
	import type { DialogueTree } from '$lib/types';

	type BranchKey = 'start';

	let tree: DialogueTree<BranchKey> = {
		start: [
			'nested',
			[
				{
					label: 'choice0',
					text: 'choice0',
					next: [
						'nest0',
						[
							{
								label: 'choice00',
								text: 'choice00',
								next: [
									'nest000',
									[
										{
											label: 'choice000',
											text: 'choice000',
											next: ['nest000']
										}
									]
								]
							},
							{
								label: 'choice01',
								text: 'choice01',
								next: [
									'nest010',
									[
										{
											label: 'choice010',
											text: 'choice010',
											next: ['nest010']
										}
									]
								]
							}
						]
					]
				},
				{
					label: '1',
					text: '1',
					next: [
						'1',
						[
							{
								label: '2',
								text: '2',
								next: [
									'2',
									[
										{
											label: '3',
											text: '3',
											next: ['3']
										}
									]
								]
							}
						]
					]
				}
			]
		]
	};
</script>

<Dialogue {tree} on:dialogueEnd={() => alert('dialogue ended')} />
