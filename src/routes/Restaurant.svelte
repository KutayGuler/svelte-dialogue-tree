<script lang="ts">
  import type { DialogueTree } from "../lib/types";
  import Dialogue from "../lib/Dialogue.svelte";
  import { fly, scale } from "svelte/transition";

  let inventory = ["🥧", "🍕", "🥣"];
  let orderedItem = "";

  function checkItem(item: string): BranchKey {
    orderedItem = item;
    return inventory.includes(item) ? "success" : "failure";
  }

  function consumeOrderedItem() {
    inventory = inventory.filter((x) => x != orderedItem);
  }

  function listAvailableItems() {
    // TODO:
  }

  function bringOrderedItem() {
    return {
      text: `Your order is ready. Bon appetite! **Puts ${orderedItem} on the table**`,
      onSpawn: consumeOrderedItem,
    };
  }

  type BranchKey = "start" | "success" | "failure";

  let dialogueTree: DialogueTree<BranchKey> = {
    start: [
      "What would you like to have?",
      [
        {
          header: "Soup",
          text: "Soup",
          next: () => checkItem("🥣"),
        },
        {
          header: "Pie",
          text: "Pie",
          next: () => checkItem("🥧"),
        },
      ],
    ],
    success: [
      "Coming right up!",
      bringOrderedItem,
      [
        {
          header: "Order another one",
          text: "I would like to make an order",
          next: "start",
        },
        { header: "Leave", text: "**You leave**" },
      ],
    ],
    failure: [
      "We are fresh out of that, Would you like to have something else",
      [
        {
          header: "Order another one",
          text: "I would like to make an order",
          next: "start",
        },
        { header: "Leave", text: "**You leave**" },
      ],
    ],
  };
</script>

<Dialogue
  {dialogueTree}
  transitions={{
    container: {
      in: scale,
    },
    user: {
      in: fly,
    },
    npc: {
      in: fly,
    },
  }}
/>
