<script lang="ts">
	import ChoiceRenderer from '$lib/ChoiceRenderer.svelte';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Cyberpunk from '../demos/Cyberpunk.svelte';

	export let title: string;
	export let description: string;
	export let code: string;

	const choiceObjectProps = [
		{ prop: 'label', type: 'string', required: '✔' },
		{ prop: 'text', type: 'string', required: '✔' },
		{
			prop: 'next',
			type: 'BranchKey | Branch<BranchKey, CharacterKey> | (() => BranchKey)',
			required: '✔'
		},
		{ prop: 'titleTag', type: 'string | () => string', required: '' },
		{ prop: 'disabled', type: 'boolean | () => boolean', required: '' }
	];
</script>

<section class="relative flex w-full flex-col gap-4">
	{#if title.includes('.')}
		<h3 data-toc-ignore>{title}</h3>
	{:else}
		<h3 id={title}>{title}</h3>
	{/if}
	<p>{@html description}</p>
	{#if title == 'ChoiceObject'}
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Required</th>
					</tr>
				</thead>
				<tbody>
					{#each choiceObjectProps as { prop, type, required }, i}
						<tr>
							<td>{prop}</td>
							<td><code>{type}</code></td>
							<td>{required}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	<CodeBlock language="ts" {code} />
	{#if title.includes('disabled')}
		<div class="alert card variant-ghost-warning">
			If you are using functions to disable choices, make sure you have at least one choice that is
			never disabled to prevent freezing the conversation.
		</div>
	{/if}
</section>
