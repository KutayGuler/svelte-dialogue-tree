<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { CodeBlock, ProgressBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Narration from '../demos/Narration.svelte';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { typesData, propsData, eventsData } from './docsData';
	import TypeSection from './TypeSection.svelte';
	import Section from './Section.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	let withGenerics = false;

	let schemaCode = `<script lang="ts">
	import Dialogue from "svelte-dialogue-tree";
	const tree = {
		branch1: [ // 📌 dialogue starts from the tree's first key 
			// TextLeaf
			// TextLeaf
			// TextLeaf
			// TextLeaf
			// TextLeaf ✅ any number of TextLeafs can populate a branch
		],
		branch2: [
			// TextLeaf
			// ComponentLeaf
			// TextLeaf
			// ComponentLeaf
			// ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere
		],
		branch3: [
			// TextLeaf
			// TextLeaf
			// ChoiceLeaf ✅ ChoiceLeafs should always be at the end of branches
		],
		invalid1: [
			// TextLeaf
			// ChoiceLeaf ❌ ChoiceLeafs should always be at the end of branches
			// TextLeaf
		],
		invalid2: [
			// TextLeaf
			// ChoiceLeaf 
			// ChoiceLeaf ❌ there cannot be more than one ChoiceLeaf in a single branch
		],
	};

	const characters = { // ❔ optional Dialogue parameter
		character1: {
			name: "name of character1",
			avatarSrc: "character1.jpg" // ❔ optional parameter 
		},
		character2: {
			name: "name of character2",
		},
	}
<\/script>
  
<!-- WITH CHARACTERS -->
<Dialogue {tree} {characters} /> ✅

<!-- OR WITHOUT CHARACTERS -->
<Dialogue {tree} /> ✅
`;

	let schemaCodeT = `<script lang="ts">
	import Dialogue from "svelte-dialogue-tree";
	
	type BranchKey = "branch1" | "branch2" | "branch3" | "invalid1" | "invalid2" ;
	type CharacterKey = "character1" | "character2";

	const tree: DialogueTree<BranchKey, CharacterKey> = {
		branch1: [ // 📌 dialogue starts from the tree's first key 
			// TextLeaf,
			// TextLeaf,
			// TextLeaf,
			// TextLeaf,
			// TextLeaf ✅ any number of TextLeafs can populate a branch
		],
		branch2: [
			// TextLeaf
			// ComponentLeaf
			// TextLeaf
			// ComponentLeaf
			// ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere
		],
		branch3: [
			// TextLeaf,
			// TextLeaf,
			// ChoiceLeaf ✅ ChoiceLeafs should always be at the end of branches
		],
		invalid1: [
			// TextLeaf,
			// ChoiceLeaf, ❌ ChoiceLeafs should always be at the end of branches
			// TextLeaf
		],
		invalid2: [
			// TextLeaf,
			// ChoiceLeaf, 
			// ChoiceLeaf, ❌ there cannot be more than one ChoiceLeaf in a single branch
		],
		invalid3: // [ ❌ Type error: "invalid3" is not of type BranchKey
			// TextLeaf,
			// TextLeaf,
			// TextLeaf,
		],
	};

	const characters: CharacterCollection<CharacterKey> = { // ❔ optional Dialogue parameter
		character1: {
			name: "name of character1",
			avatarSrc: "character1.jpg" // ❔ optional parameter 
		},
		character2: {
			name: "name of character2",
		},
	}
<\/script>

<!-- WITH CHARACTERS -->
<Dialogue {tree} {characters} /> ✅

<!-- OR WITHOUT CHARACTERS -->
<Dialogue {tree} /> ✅
`;

	$: _schemaCode = withGenerics ? schemaCodeT : schemaCode;

	let narrationTab = 0;
</script>

<!-- TODO: Responsive entire website -->

<!-- TODO: fix html rendering problem with anchor tags -->

<div class="relative flex flex-row items-start justify-center gap-4">
	<div id="toc-target" class="flex w-[768px] flex-col gap-24 py-4">
		<Section title="SCHEMA">
			<div>
				<SlideToggle active="bg-success-500" name="generics" bind:checked={withGenerics}>
					{withGenerics ? 'With Generics' : 'Without Generics'}
				</SlideToggle>
				{#if withGenerics}
					<div
						transition:slide
						class="alert card variant-ghost-success mt-2 flex flex-col items-start gap-2"
					>
						<p>
							Autocomplete branch and character keys ✔<br />Type errors on inexistent branch and
							character keys ✔
						</p>
					</div>
				{/if}
			</div>
			{#key withGenerics}
				<CodeBlock language="svelte" code={_schemaCode} />
			{/key}
		</Section>
		<Section title="TYPES">
			<div class="relative flex flex-col items-start gap-16">
				{#each typesData as { title, description, code }}
					<TypeSection {title} {description} {code} />
				{/each}
			</div>
		</Section>
		<Section title="PROPS">
			<div class="table-container">
				<!-- Native Table Element -->
				<table class="table-hover table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Value</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each propsData as { name, type, value, description, required }, i}
							<tr>
								<td
									>{name}
									{#if required}
										<span class="badge variant-filled-warning ml-1">Required</span>
									{/if}</td
								>
								<td><code>{type}</code> </td>
								<td>{value}</td>
								<td>{description}</td>
							</tr>
						{/each}
					</tbody>
					<!-- <tfoot>
								<tr>
									<th colspan="3">Calculated Total Weight</th>
									<td>{totalWeight}</td>
								</tr>
							</tfoot> -->
				</table>
			</div>
		</Section>
		<Section title="EVENTS">
			<div class="table-container">
				<!-- Native Table Element -->
				<table class="table-hover table-compact table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Detail</th>
							<th class="table-cell-fit">Description</th>
						</tr>
					</thead>
					<tbody>
						{#each eventsData as { name, detail, description }, i}
							<tr>
								<td>{name}</td>
								<td>{detail}</td>
								<td class="table-cell-fit">{description}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</Section>
		<Section title="NARRATION">
			<p>
				You can use narration to convey information as a third person. Wrap the content in double
				asterisk (**) to render it as a narration text.
			</p>
			<blockquote>
				TIP: You can include multiple narration texts inside a string. They will be rendered
				seperately.
			</blockquote>
			<TabGroup>
				<Tab bind:group={narrationTab} name="tab1" value={0}>Code</Tab>
				<Tab bind:group={narrationTab} name="tab2" value={1}>Preview</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if narrationTab === 0}
						<CodeBlock
							language="ts"
							code={`
	const tree = {
	start: [
		'** You wake up near a cliff. **',
		{
			text: '** You panic and fall from the cliff. ** npc text',
			onSpawn: fallFromCliff
		},
		'** narration ** npc text ** narration **'
	]
};`}
						/>
					{:else if narrationTab === 1}
						<Narration />
					{/if}
				</svelte:fragment>
			</TabGroup>
			<div class="alert card variant-ghost-warning">
				<p>
					<a href="#TextObject.character">TextObject.character</a> information will not be rendered
					if <a href="#TextObject.text">TextObject.text</a> is inside double asterisks.
				</p>
			</div>
		</Section>
	</div>
	<div class="sticky top-0 py-4">
		<TableOfContents
			regionList="p-1"
			spacing="space-y-4"
			target="#toc-target"
			width="w-56"
			allowedHeadings="h1, h2, h3"
		/>
	</div>
</div>

<style>
	:global(.sdt-container-docs) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		/* background-color: rgb(241 245 249); */
		/* padding: 1rem; */
		border-radius: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
		gap: 0.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
