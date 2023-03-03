<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueTree } from "$lib/types";
  import { writable } from "svelte/store";
  import { CodeBlock, type FocusBlock } from "svhighlight";

  let textCode = `
"something"
{ text: "something", characterID: "jason" }
() => "something"
() => { text: "something", characterID: "jason" }}
  `;

  // TODO: Turn this into a conversation, blur, unblur code based on spawning stuff
  // TODO: Link types to github

  let textTree: DialogueTree = {
    start: [
      "A TextLeaf can be a string",
      "a TextObject",
      "a function that returns a string",
      "or a function that returns a TextObject",
    ],
  };

  let choiceCode = `
[
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]

() => [
  { label: "YES", text: "I think that's right", next: "yesBranch" },
  { label: "NO", text: "I don't think so", next: "noBranch" },
]
  `;

  let choiceTree: DialogueTree = {
    start: [
      "A ChoiceLeaf can be an array of ChoiceObjects",
      "or a function that returns an array of ChoiceObjects",
    ],
  };

  let textFocusBlocks: FocusBlock[] = [
    { lines: "0" },
    { lines: "0,1" },
    { lines: "0-2" },
    { lines: "0-3" },
  ];

  function nextText() {
    $textFocus += 1;
    textDialogue.nextLine();
  }

  let textDialogue: any;
  let textFocus = writable(0);

  let choiceFocusBlocks: FocusBlock[] = [{ lines: "0-3" }, { lines: "0-8" }];

  function nextChoice() {
    $choiceFocus += 1;
    choiceDialogue.nextLine();
  }

  let choiceDialogue: any;
  let choiceFocus = writable(0);

  let schemaCode = `
let tree = {
  branchOne: [ // 📌 dialogue starts from the tree's first key 
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf,
    // TextLeaf ✅ any number of TextLeafs can populate a branch
  ],
  branchTwo: [
    // TextLeaf,
    // TextLeaf,
    // ChoiceLeaf ✅ ChoiceLeaf at the end of the branch
  ],
  invalidOne: [
    // TextLeaf,
    // ChoiceLeaf, ❌ ChoiceLeafs should always be at the end of branches
    // TextLeaf
  ],
  invalidTwo: [
    // TextLeaf,
    // ChoiceLeaf, 
    // ChoiceLeaf, ❌ there cannot be more than one ChoiceLeaf in a single branch
  ],
};
  `;
</script>

<div>
  <h1 class="text-primary text-4xl font-bold">Schema 📝</h1>
  <CodeBlock language="typescript" code={schemaCode} showHeader={false} />
</div>

<div>
  <h2 class="text-primary text-2xl font-bold">TextLeaf</h2>
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
