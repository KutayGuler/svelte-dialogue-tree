<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueTree } from "$lib/types";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { CodeBlock, type FocusBlock } from "svhighlight";

  function createFocusStore() {
    const { set, subscribe, update } = writable(0);

    return {
      set,
      subscribe,
      update,
      increment: () =>
        update((state) => {
          state += 1;
          return state;
        }),
    };
  }

  const typesData: Array<{
    title: string;
    code: string;
    tree: DialogueTree;
    activeFocusBlockStore: Writable<number> | null | undefined;
    focusBlocks: FocusBlock[];
    next: Function;
  }> = [
    {
      title: "TextLeaf",
      code: `
"something"
{ text: "something", characterID: "jason" }
() => "something"
() => { text: "something", characterID: "jason" }}
  `,
      tree: {
        start: [
          "A TextLeaf can be a string",
          "a TextObject",
          "a function that returns a string",
          "or a function that returns a TextObject",
        ],
      },
      focusBlocks: [
        { lines: "0" },
        { lines: "0,1" },
        { lines: "0-2" },
        { lines: "0-3" },
      ],
      activeFocusBlockStore: createFocusStore(),
      next: () => {
        typesData[0].activeFocusBlockStore.increment();
        components[0].nextLine();
      },
    },
    {
      title: "ChoiceLeaf",
      code: `
[
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]

() => [
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]
  `,
      tree: {
        start: [
          "A ChoiceLeaf can be an array of ChoiceObjects",
          "or a function that returns an array of ChoiceObjects",
        ],
      },
      focusBlocks: [{ lines: "0-3" }, { lines: "0-8" }],
      activeFocusBlockStore: createFocusStore(),
      next: () => {
        typesData[1].activeFocusBlockStore.increment();
        components[1].nextLine();
      },
    },
  ];

  let schemaCode = `
let tree: DialogueTree = {
  branch1: [ // 📌 dialogue starts from the tree's first key 
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf ✅ any number of TextLeafs can populate a branch
  ],
  branch2: [
    // TextLeaf,
    // TextLeaf,
    // ChoiceLeaf ✅ ChoiceLeaf at the end of the branch
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
};
  
let characters: CharacterCollection = { // ❔ optional Dialogue parameter
  character1: {
    name: "name of character1",
    avatarSrc: "character1.jpg" // ❔ optional parameter 
  },
  character2: {
    name: "name of character2",
  },
}
  `;

  let schemaCodeT = `
type BranchKey = "branchOne" | "branchTwo" ;
type CharacterKey = "character1" | "character2";

let tree: DialogueTree<BranchKey, CharacterKey> = {
  branch1: [ // 📌 dialogue starts from the tree's first key 
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf ✅ any number of TextLeafs can populate a branch
  ],
  branch2: [
    // TextLeaf,
    // TextLeaf,
    // ChoiceLeaf ✅ ChoiceLeaf at the end of the branch
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
};

let characters: CharacterCollection<CharacterKey> = { // ❔ optional component argument
  character1: {
    name: "name of character1",
    avatarSrc: "character1.jpg" // ❔ optional parameter 
  },
  character2: {
    name: "name of character2",
  },
}
`;
  // TODO: Check if it needs to change to /character.jpg

  let svelteCode = `
<script lang="ts">
  import Dialogue from "svelte-dialogue-tree";
  import { tree, characters } from "./DialogueData.ts"
<\/script>
  
<!-- WITH CHARACTERS -->
<Dialogue {tree} {characters} /> ✅

<!-- OR WITHOUT CHARACTERS -->
<Dialogue {tree} /> ✅
  `;

  let components = new Array(typesData.length).fill(null);

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  let withGenerics = false;
  $: _schemaCode = withGenerics ? schemaCodeT : schemaCode;
</script>

<div>
  <div class="divider">
    <h1 class="text-primary text-4xl font-bold">SCHEMA</h1>
  </div>
  <!-- <div class="form-control w-1/2">
    <label class="label cursor-pointer">
      <span class="label-text">With Generics</span>
      <input
        type="radio"
        class="radio checked:bg-red-500"
        value="with"
        bind:group={showSchema}
      />
    </label>
  </div>
  <div class="form-control w-1/2">
    <label class="label cursor-pointer">
      <span class="label-text">Without Generics</span>
      <input
        type="radio"
        class="radio checked:bg-blue-500"
        value="without"
        bind:group={showSchema}
      />
    </label>
  </div> -->

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text"
        >{withGenerics ? "With Generics" : "Without Generics"}</span
      >
      <input
        type="checkbox"
        class="toggle toggle-success"
        bind:checked={withGenerics}
      />
    </label>
  </div>
  {#if withGenerics}
    <p>Benefits:</p>
    <!-- TODO: design this -->
  {/if}

  {#key withGenerics}
    <CodeBlock
      language="typescript"
      code={_schemaCode}
      headerText="DialogueData.ts"
    />
  {/key}
  <CodeBlock
    language="typescript"
    code={svelteCode}
    headerText="+page.svelte"
  />
</div>

<div class="divider">
  <h1 class="text-primary text-4xl font-bold">TYPES</h1>
</div>

{#if mounted}
  {#each typesData as { title, code, tree, focusBlocks, activeFocusBlockStore, next }, i}
    <div
      class="relative flex flex-row items-start gap-2 justify-start bg-primary px-4 pt-12 pb-24 rounded-lg duration-200 ease-out"
    >
      <h2 class="absolute top-4 text-primary-content text-2xl font-bold">
        {title}
      </h2>
      <div class="flex flex-col w-full">
        <!-- bind:this={component} -->
        <Dialogue
          bind:this={components[i]}
          containerClass="sdt-container-docs"
          {tree}
          nextLineKey=""
        />
      </div>
      <div class="flex flex-col w-full h-full gap-2">
        <CodeBlock
          language="typescript"
          {code}
          showHeader={false}
          {activeFocusBlockStore}
          {focusBlocks}
        />
      </div>
      <div
        class="absolute w-full -bottom-4 right-0 flex items-center justify-center"
      >
        <button class="btn w-1/2" on:click={() => next()}>NEXT</button>
      </div>
    </div>
  {/each}
{/if}

<!-- <div>
  <h2 class="text-primary text-2xl font-bold">TextObject</h2>
  <div class="flex flex-row h-72 items-start gap-2 justify-start">
    <Dialogue
      bind:this={textDialogue}
      containerClass="sdt-container-docs"
      tree={textTree}
      nextLineKey=""
    />
    <div class="flex flex-col w-full h-full gap-2">
      <CodeBlock
        language="typescript"
        code={textCode}
        showHeader={false}
        activeFocusBlockStore={textFocus}
        focusBlocks={textFocusBlocks}
      />
      <button class="btn w-full flex-grow" on:click={nextText}>NEXT</button>
    </div>
  </div>
</div>

<div>
  <h2 class="text-primary text-2xl font-bold">ChoiceLeaf</h2>
  <div class="flex flex-row h-72 items-start gap-2 justify-start">
    <Dialogue
      bind:this={choiceDialogue}
      containerClass="sdt-container-docs"
      tree={choiceTree}
      nextLineKey=""
    />
    <div class="flex flex-col w-full h-full gap-2">
      <CodeBlock
        language="typescript"
        code={choiceCode}
        showHeader={false}
        activeFocusBlockStore={choiceFocus}
        focusBlocks={choiceFocusBlocks}
      />
      <button class="btn w-full flex-grow fill" on:click={nextChoice}
        >NEXT</button
      >
    </div>
  </div>
</div>

<div>
  <h2 class="text-primary text-2xl font-bold">ChoiceObject</h2>
  <div class="flex flex-row h-72 items-start gap-2 justify-start">
    <Dialogue
      bind:this={choiceDialogue}
      containerClass="sdt-container-docs"
      tree={choiceTree}
      nextLineKey=""
    />
    <div class="flex flex-col w-full h-full gap-2">
      <CodeBlock
        language="typescript"
        code={choiceCode}
        showHeader={false}
        activeFocusBlockStore={choiceFocus}
        focusBlocks={choiceFocusBlocks}
      />
      <button class="btn w-full flex-grow fill" on:click={nextChoice}
        >NEXT</button
      >
    </div>
  </div>
</div>

<div>
  <div class="divider">
    <h1 class="text-primary text-4xl font-bold">MISC</h1>
  </div>
  <h2 class="text-primary text-2xl font-bold">Narration</h2>
  <div class="flex flex-row h-72 items-start gap-2 justify-start">
    <Dialogue
      bind:this={textDialogue}
      containerClass="sdt-container-docs"
      tree={textTree}
      nextLineKey=""
    />
    <div class="flex flex-col w-full h-full gap-2">
      <CodeBlock
        language="typescript"
        code={textCode}
        showHeader={false}
        activeFocusBlockStore={textFocus}
        focusBlocks={textFocusBlocks}
      />
      <button class="btn w-full flex-grow" on:click={nextText}>NEXT</button>
    </div>
  </div>
</div> -->
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
