<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { CodeBlock } from "svhighlight";
  import Narration from "../demos/Narration.svelte";

  // TODO: Change link when intersecting

  const typesData: Array<{
    title: string;
    description: string;
    code: string;
    highlightLines?: string;
  }> = [
    {
      title: "TextLeaf",
      description:
        'A TextLeaf can be in following types: <code class="p-1 bg-primary text-primary-content">string</code>, <a class="link link-primary font-bold" href="#TextObject">TextObject<a/>, a function that returns a <code class="p-1 bg-primary text-primary-content">string</code>, a function that returns a <a class="link link-primary font-bold" href="#TextObject">TextObject<a/>',
      code: `
// string
"something"

// narration string
"** something is being narrated **"

// HTML string
"<a href="/something">something</a>"

// TextObject
{ text: "something", character: "jason" }

// function that returns a string
() => "something" 

// function that returns a TextObject
() => { text: "something", character: "jason" }}
`,
    },
    {
      title: "TextObject",
      description:
        'A TextObject requires a <code class="p-1 bg-primary text-primary-content">text</code> property and at least one (1) additional property.<br/> Additional properties are: <a class="link link-primary font-bold" href="#TextObject.onSpawn">onSpawn<a/> and <a class="link link-primary font-bold" href="#TextObject.character">character<a/>',
      code: `

// TextObject  
{ 
  text: "something",
  character: "jason"
}

// TextObject  
{ 
  text: "something",
  onSpawn: () => console.log("something spawned.")
}

// TextObject (it can have both of the additional properties)
{ 
  text: "something",
  character: "jason",
  onSpawn: () => console.log("something spawned.")
}
  `,
    },
    // TODO: Highlight onSpawn
    {
      title: "TextObject.onSpawn",
      description:
        'The function that is assigned to <code class="p-1 bg-primary text-primary-content">onSpawn</code> is executed when the <a class="link link-primary font-bold" href="#TextObject">TextObject<a/> enters the DOM',
      highlightLines: "12",
      code: `<script>
  let health = 100;

  function fallFromCliff() {
    health -= 50;
  }

  const tree = {
    start: [
      "** You wake up near a cliff. **",
      { 
        text: "** You panic and fall from the cliff. **", 
        onSpawn: fallFromCliff 
      }
    ]
  }
<\/script>

<Dialogue {tree} />`,
    },
    {
      title: "TextObject.character",
      highlightLines: "13",
      description:
        '<code class="p-1 bg-primary text-primary-content">character</code> should be a key of a <a class="link link-primary font-bold" href="#CharacterCollection">CharacterCollection<a/>',
      code: `<script>
  const characters = {
    gotrek: {
      name: "Gotrek the Trollslayer",
      avatarSrc: "gotrek.jpg"
    }
  }

  const tree = {
    start: [
      "** You open your eyes and see a dwarf looking at you in disdain **",
      { 
        text: "Wake up, manling.",
        character: "gotrek" 
      }
    ]
  }
<\/script>

<Dialogue {tree} {characters} />`,
    },
    {
      title: "CharacterCollection",
      description:
        '<code class="p-1 bg-primary text-primary-content">CharacterCollection</code> is an object which holds CharacterKeys as keys and Characters as values',
      code: `<script>
  const characters = {
    gotrek: {
      name: "Gotrek the Trollslayer",
      avatarSrc: "gotrek.jpg"
    }
  }

  const tree = {
    start: [
      "** You open your eyes and see a dwarf looking at you in disdain **"
      { text: "Wake up, manling.", character: "gotrek" }
    ]
  }
<\/script>

<Dialogue {tree} {characters} />`,
    },
    {
      title: "ComponentLeaf",
      description:
        'A ComponentLeaf requires a <code class="p-1 bg-primary text-primary-content">component</code> property which accepts a Svelte component. The other property is the optional <code class="p-1 bg-primary text-primary-content">args</code> property, which is passed to the given component as an argument.',
      code: `
import { Component } from "./Component.svelte";

// ComponentLeaf
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
      description:
        'A ChoiceLeaf can be an array of <a class="link link-primary font-bold" href="#ChoiceObject">ChoiceObject<a/>s or a function that returns an array of <a class="link link-primary font-bold" href="#ChoiceObject">ChoiceObject<a/>s',
      code: `
// ChoiceLeaf
[
  // ChoiceObject
  // ChoiceObject
]

// ChoiceLeaf
() => [
  // ChoiceObject
  // ChoiceObject
]
  `,
    },
    {
      title: "ChoiceObject",
      description:
        'A choice object has three (3) required and two (2) optional parameters <br><b>Required parameters</b><br> <a class="link link-primary font-bold" href="#ChoiceObject.label">label<a/>, <a class="link link-primary font-bold" href="#ChoiceObject.text">text<a/>, <a class="link link-primary font-bold" href="#ChoiceObject.next">next<a/> <br><br><b>Optional parameters</b><br> <a class="link link-primary font-bold" href="#ChoiceObject.titleTag">titleTag<a/>, <a class="link link-primary font-bold" href="#ChoiceObject.disabled">disabled<a/> ',
      code: `
{ 
  /** REQUIRED */
  label: "YES",
  text: "I think that's right",
  next: "yesBranch"

  /** OPTIONAL */
  titleTag: "some title"
  disabled: true 
}
`,
    },
    {
      title: "ChoiceObject.label",
      description:
        '<code class="p-1 bg-primary text-primary-content">label</code> is the text that will appear on the choice button',
      code: `

{ 
  // code
  label: "YES",
  // code
}
`,
    },
    {
      title: "ChoiceObject.text",
      description:
        '<code class="p-1 bg-primary text-primary-content">text</code> is the content that will appear on the dialogue after choice is made',
      code: `

{ 
  // code
  label: "YES",
  // code
}
`,
    },
    {
      title: "ChoiceObject.next",
      description:
        '<code class="p-1 bg-primary text-primary-content">next</code> is the key of the branch dialogue will jump to. You can use <code class="p-1 bg-primary text-primary-content">next</code> in three (3) different ways: <br> (1) BranchKey <br> (2) A function that returns a BranchKey <br> (3) A nested branch',
      code: `
// (1) A BranchKey (string)
{
  // code
  next: "yesBranch"
}

// (2) A function that returns a BranchKey
{
  // code
  next: () => "yesBranch" 
}

// (3) A nested branch
{
  // code
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
    // TODO: Can be function
    {
      title: "ChoiceObject.titleTag",
      description:
        '<code class="p-1 bg-primary text-primary-content">titleTag</code> is the title that will appear when a mouse is hovered over the choice button',
      code: `

{ 
  // code
  titleTag: "some title",
}
`,
    },
    // TODO: Can be function
    {
      title: "ChoiceObject.disabled",
      description:
        '<code class="p-1 bg-primary text-primary-content">disabled</code> determines whether the choice button is disabled or not',
      code: `

{ 
  // code
  disabled: true,
}
`,
    },
  ];

  let schemaCode = `
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
    // ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere in the branch
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
  `;

  let schemaCodeT = `
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
    // ComponentLeaf ✅ any number of ComponentLeafs can be placed anywhere in the branch
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

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  let withGenerics = false;
  $: _schemaCode = withGenerics ? schemaCodeT : schemaCode;
</script>

<!-- TODO: Add intersection observer -->
<div class="flex flex-row items-start justify-center">
  <ul class="sticky top-0 menu bg-base-100 w-56 p-2 rounded-box">
    <li class="menu-title">
      <span>Schema</span>
    </li>
    <li><a href="#Schema">Schema</a></li>
    <li class="menu-title">
      <span>Types</span>
    </li>
    {#each typesData as { title }}
      <!-- class="active" -->
      <li><a href={"#" + title}>{title}</a></li>
      <!-- content here -->
    {/each}
    <li class="menu-title">
      <span>Misc</span>
    </li>
    <!-- <li><a>Item 1</a></li>
    <li><a class="active">Item 2</a></li>
    <li><a>Item 3</a></li> -->
  </ul>
  <div class="flex flex-col gap-16 w-[768px]">
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
      <div class="relative flex flex-col items-start gap-16">
        {#each typesData as { title, highlightLines, description, code }}
          {@const language = code.includes("script") ? "svelte" : "typescript"}
          <div class="relative flex flex-col gap-2 w-full">
            <h3 id={title} class="text-2xl font-bold">{title}</h3>
            <p>
              {@html description}
            </p>
            <CodeBlock
              showHeader={false}
              {language}
              {code}
              showFocusButtons
              focusType="highlight"
              {highlightLines}
              showLineNumbers={false}
            />
          </div>
        {/each}
      </div>
    {/if}

    <div class="divider">
      <h1 class="text-primary text-4xl font-bold">MISC</h1>
    </div>
    <p>Narration</p>
    <Narration />
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
