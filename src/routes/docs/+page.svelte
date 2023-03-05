<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueTree } from "$lib/types";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { slide } from "svelte/transition";
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

  // TODO: Add rest of the data
  const typesData: Array<{
    title: string;
    code: string;
    tree?: DialogueTree;
    activeFocusBlockStore?: Writable<number> | null | undefined;
    focusBlocks?: FocusBlock[];
    next?: Function;
  }> = [
    {
      title: "TextLeaf",
      code: `
// A TextLeaf can be the following:

// string
"something"

// HTML string
"<a href="/something">something</a>"

// TextObject
{ text: "something", characterID: "jason" }

// function that returns a string
() => "something" 

// function that returns a TextObject
() => { text: "something", characterID: "jason" }}
`,
    },
    {
      title: "TextObject",
      code: `
// A TextObject should have a text property
// and at least one (1) additional property
    
{ 
  text: "something", // ❕ required
  characterID: "jason" // additional
}

{ 
  text: "something", // ❕ required
  onSpawn: () => console.log("something spawned.") // additional
}

// it can have both of the additional properties
{ 
  text: "something", // ❕ required
  characterID: "jason", // additional
  onSpawn: () => console.log("something spawned.") // additional
}
  `,
    },
    {
      title: "ChoiceLeaf",
      code: `
// A ChoiceLeaf can be an array of ChoiceObjects
[
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]

// or a function that returns an array of ChoiceObjects
() => [
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]
  `,
    },
    {
      title: "ChoiceObject",
      code: `
// A choice object has three (3) required and two (2) optional parameters
{ 
  label: "YES", ❕ required
  text: "I think that's right", ❕ required
  next: "yesBranch" ❕ required
}`,
    },
  ];

  let schemaCode = `
let tree: DialogueTree = {
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
    // ComponentLeaf ✅ Just like TextLeafs, any number of ComponentLeafs can be placed anywhere in the branch
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

<div class="p-4 flex flex-col gap-16">
  <div>
    <div class="divider">
      <h1 class="text-primary text-4xl font-bold">SCHEMA</h1>
    </div>

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
      <div
        transition:slide
        class="w-full bg-success text-success-content p-4 rounded-lg"
      >
        <h2 class="text-2xl font-bold">Benefits</h2>
        <p>Autocomplete branch and character keys ☑</p>
        <p>Type errors on inexistent branch and character keys ☑</p>
      </div>
      <!-- TODO: Might add example here -->
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
    {#each typesData as { title, code }}
      <div class="relative flex flex-col items-start gap-2 justify-start">
        <CodeBlock
          showHeader
          headerText={title}
          headerClasses="bg-gray-800 text-white/80 text-2xl font-bold"
          language="typescript"
          {code}
          showFocusButtons
          showLineNumbers={false}
        />
      </div>
    {/each}
  {/if}

  <div class="divider">
    <h1 class="text-primary text-4xl font-bold">MISC</h1>
  </div>

  <!-- TODO: Narration -->
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
