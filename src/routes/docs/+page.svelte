<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { CodeBlock } from "svhighlight";
  import Narration from "../demos/Narration.svelte";

  const typesData: Array<{
    title: string;
    code: string;
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
      title: "ComponentLeaf",
      code: `
import { Component } from "./Component.svelte";

// A ComponentLeaf
{
  component: Component,
  args: { // ❔ optional
    count: 5,
    color: "red"
  }
}
      `,
    },
    {
      title: "ChoiceLeaf",
      code: `
/** 
 * A ChoiceLeaf can be an array of ChoiceObjects
*/
[
  // ChoiceObject
  // ChoiceObject
]

/** 
 * or a function that returns an array of ChoiceObjects
*/
() => [
  // ChoiceObject
  // ChoiceObject
]
  `,
    },
    {
      title: "ChoiceObject",
      code: `
// A choice object has three (3) required and two (2) optional parameters
{ 
  // The text that will appear on the choice button
  label: "YES", ❕ required

  // The content that will appear on the dialogue after choice is made
  text: "I think that's right", ❕ required

  // The key of the branch dialogue will jump to
  next: "yesBranch" ❕ required

  // The title that will appear when a mouse is hovered over the choice button
  titleTag:  ❔ optional 

  // Whether the choice button is disabled or not
  disabled: true ❔ optional 
}

// You can use the "next" prop's two (2) alternative types:

// (1) A function that returns a BranchKey
{
  /** 
   * code
  */

  next: () => "yesBranch" 
}

// (2) A nested branch
{
  /** 
   * code
  */

  next: [
    "Great! Let's go bowling."
    "How would you like to go?"
    [
      { 
        label: "🚗",
        text: "How about we take your Honda?", 
        next: [
          "Oh, it's actually broken. We can take a cab though."
        ]
      },
      { 
        label: "🚶‍♀️",
        text: "It's not that far, we can walk.", 
        next: [
          "Sure!"
          "Would you like to race?"
          [
            {       
              label: "YES",
              text: "I don't know. ** You start running **", 
              next: [
                "** You win **"
                // Nesting can go forever 
              ]
            },
            {       
              label: "No",
              text: "Nah, I don't feel like it.", 
              next: [
                "** You don't race **"
                // Nesting can go forever 
              ]
            }
          ]
        ] 
      },
      { 
        label: "Cancel the date",
        text: "You know what? I forgot I had some things to do.", 
        next: "cancelBranch" 
      },
    ]
  ]
}
`,
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
type BranchKey = "branch1" | "branch2" | "branch3" | "invalid1" | "invalid2" ;
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
    // TextLeaf
    // ComponentLeaf
    // TextLeaf
    // ComponentLeaf
    // ComponentLeaf ✅ Just like TextLeafs, any number of ComponentLeafs can be placed anywhere in the branch
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

  let narrationCode = `
    
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
    <div class="relative flex flex-col items-start gap-2 justify-start">
      {#each typesData as { title, code }}
        <CodeBlock
          showHeader
          headerText={title}
          headerClasses="bg-gray-800 text-white/80 text-2xl font-bold"
          language="typescript"
          {code}
          showFocusButtons
          showLineNumbers={false}
        />
      {/each}
    </div>
  {/if}

  <div class="divider">
    <h1 class="text-primary text-4xl font-bold">MISC</h1>
  </div>
  <p>Narration</p>
  <!-- TODO: Narration -->
  <Narration />
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
