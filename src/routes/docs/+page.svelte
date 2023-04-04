<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { CodeBlock, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { typesData, propsData, eventsData } from './docsData';
	import TypeSection from './TypeSection.svelte';
	import Section from './Section.svelte';
	import Narration from './Narration.svelte';
	import Binding from './Binding.svelte';

	/**
	 * Required because of html rendering bug
	 * this code transforms the anchor tags
	 * without links into span tags
	 */
	onMount(() => {
		let links = [...document.getElementsByTagName('a')];
		links = links.filter((a) => !a.href);
		for (let link of links) {
			let span = document.createElement('span');
			span.innerHTML = link.innerHTML;
			link.parentNode?.replaceChild(span, link);
		}
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
		branch3: [
			// TextLeaf
			// ComponentLeaf
			// TextLeaf
			// ComponentLeaf
			// ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere
		],
		branch4: [
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
	
	type BranchKey = "branch1" | "branch3" | "branch4" | "invalid1" | "invalid2" ;
	type CharacterKey = "character1" | "character2";

	const tree: DialogueTree<BranchKey, CharacterKey> = {
		branch1: [ // 📌 dialogue starts from the tree's first key 
			// TextLeaf,
			// TextLeaf,
			// TextLeaf,
			// TextLeaf,
			// TextLeaf ✅ any number of TextLeafs can populate a branch
		],
		branch3: [
			// TextLeaf
			// ComponentLeaf
			// TextLeaf
			// ComponentLeaf
			// ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere
		],
		branch4: [
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
	let bindingTab = 0;

	// TODO: Responsive entire website
</script>

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
		<Section title="LAYOUT">
			<main class="h-fit w-full p-4">
				<div class="flex flex-col gap-2">
					<div class="text-error-500">containerClass</div>
					<div class="variant-ringed-error relative flex h-fit w-full flex-col gap-4 p-4">
						<div class="flex w-1/3 flex-col gap-2">
							<div class="text-primary-500">npcContainerClass</div>
							<div class="variant-ringed-primary relative h-fit p-4">
								<div class="flex flex-col gap-2">
									<div class="flex flex-col gap-2">
										<div class=" text-tertiary-500">charContainerClass</div>
										<div class="variant-ringed-tertiary relative h-fit p-4">
											<div class="flex flex-col gap-2">
												<div class="text-secondary-500">charAvatarClass</div>
												<div class="variant-ringed-secondary relative h-8" />
											</div>
											<div class="mt-4 flex flex-col gap-2">
												<div class=" text-secondary-500">charNameClass</div>
												<div class="variant-ringed-secondary relative h-8" />
											</div>
										</div>
									</div>
									<div class="mt-4 text-tertiary-500">npcTextClass</div>
									<div class="variant-ringed-tertiary relative h-8 p-4" />
								</div>
							</div>
						</div>
						<div class="flex w-1/3 flex-col gap-2 self-end">
							<div class="text-primary-500">playerTextClass</div>
							<div class="variant-ringed-primary relative h-8 w-full self-end" />
						</div>
						<div class="flex w-full flex-col gap-2">
							<div class="text-primary-500">narrationClass</div>
							<div class="variant-ringed-primary h-8 w-full" />
						</div>
						<div class="flex flex-col gap-2">
							<div class="text-primary-500">choiceContainerClass</div>
							<div class="variant-ringed-primary relative flex h-fit w-full flex-row self-end p-4">
								<div class="flex w-1/3 flex-col gap-2">
									<div class="text-tertiary-500">choiceClass</div>
									<div class="variant-ringed-tertiary relative h-8" />
								</div>
							</div>
						</div>
						<div class="flex w-1/3 flex-col gap-2 self-center">
							<div class="text-primary-500">jumperClass</div>
							<div class="variant-ringed-primary h-8 w-full" />
						</div>
					</div>
				</div>
			</main>
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
		<Section title="BINDINGS">
			<p>You can call <code>nextLine</code> by binding the Dialogue component to a variable</p>
			<!-- TODO: might need to update importing code after publishing -->

			<TabGroup>
				<Tab bind:group={bindingTab} name="tab1" value={0}>Code</Tab>
				<Tab bind:group={bindingTab} name="tab2" value={1}>Preview</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if bindingTab === 0}
						<CodeBlock
							language="svelte"
							code={`<script>
	import Dialogue from '$lib/Dialogue.svelte';

	const tree = {
		start: ['hello', 'world', 'what', 'is', 'up']
	};

	let dialogueComponent;

	function nextLine() {
		dialogueComponent.nextLine();
	}
<\/script>
	
<Dialogue {tree} bind:this={dialogueComponent} />

<button class="..." on:click={nextLine}>NEXT LINE</button>
				`}
						/>
					{:else if bindingTab === 1}
						<div class="h-72">
							<Binding />
						</div>
					{/if}
				</svelte:fragment>
			</TabGroup>
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
			onSpawn: () => console.log("fell from cliff")
		},
		'** narration ** npc text ** narration **'
	]
};`}
						/>
					{:else if narrationTab === 1}
						<div class="h-72">
							<Narration />
						</div>
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
			regionList="gap-0"
			target="#toc-target"
			width="w-56"
			allowedHeadings="h1, h3"
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
