<script lang="ts">
  import Restaurant from "./Restaurant.svelte";
  import Nested from "./Nested.svelte";
  import Roleplay from "./Roleplay.svelte";
  import Html from "./Html.svelte";
  import { CodeBlock } from "svhighlight";
  let currentExample = "restaurant";

  // TODO: Add different styles
  // let checked = false;
  let restaurantCode = `
  <script lang="ts">
  import type {
    CharacterCollection,
    ChoiceObject,
    DialogueTree,
  } from "$lib/types";
  import Dialogue from "$lib/Dialogue.svelte";

  let menu = ["🥧", "🍕", "🥣", "🍔"];
  let inventory = ["🥧"]; // "🍕", "🥣", "🍔"
  let orderedItem = "";

  function itemExists(item: string): boolean {
    return inventory.includes(item);
  }

  function consumeOrderedItem() {
    inventory = inventory.filter((x) => x != orderedItem);
  }

  function listAvailableItems(): Array<ChoiceObject<BranchKey, CharacterKey>> {
    let choices: Array<ChoiceObject<BranchKey, CharacterKey>> = [];
    for (let item of menu) {
      choices.push({
        label: item,
        text: \`I would like to have a \${item}\`,
        title: () =>
          !itemExists(item)
            ? \`The restaurant does not have any \${item}s left\`
            : \`Click to order \${item}\`,
        disabled: () => !itemExists(item),
        next: () => {
          orderedItem = item;
          return itemExists(item) ? "success" : "failure";
        },
      });
    }
    return choices;
  }

  function bringOrderedItem() {
    return {
      text: \`Your order is ready. Bon appetite! **Puts \${orderedItem} on the table ** This sentence won't be rendered as it is not between stars ** This will be rendered ** \`,
      onSpawn: consumeOrderedItem,
    };
  }

  function orderOrLeave(): Array<ChoiceObject<BranchKey, CharacterKey>> {
    return [
      {
        label: "Order another one",
        text: "I would like to make an order",
        next: "start",
      },
      { label: "Leave", text: "**You leave**", next: [] },
    ];
  }

  type BranchKey = "start" | "success" | "failure";
  type CharacterKey = "cook";

  let characters: CharacterCollection<CharacterKey> = {
    cook: {
      name: "Cook",
      avatarSrc: "https://picsum.photos/200/300",
    },
  };

  let tree: DialogueTree<BranchKey, CharacterKey> = {
    start: [
      { text: "What would you like to have?", characterID: "cook" },
      listAvailableItems,
    ],
    success: [
      { text: "Coming right up!", characterID: "cook" },
      bringOrderedItem,
      orderOrLeave,
    ],
    failure: [
      {
        text: "We are fresh out of that, Would you like to have something else",
        characterID: "cook",
      },
      orderOrLeave,
    ],
  };
<\/script>

<Dialogue {tree} {characters} on:dialogueEnd={() => alert("dialogue ended")} />

  `;
</script>

<div class="p-4">
  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="restaurant"
    />
    Restaurant
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="nested"
    />
    Nested
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="roleplay"
    />
    Roleplay
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="html"
    />
    HTML
  </label>
</div>

<main class="w-full h-[600px] flex items-start justify-center p-4">
  {#if currentExample == "restaurant"}
    <Restaurant />
  {:else if currentExample == "nested"}
    <Nested />
  {:else if currentExample == "roleplay"}
    <Roleplay />
  {:else if currentExample == "html"}
    <Html />
  {/if}
</main>
