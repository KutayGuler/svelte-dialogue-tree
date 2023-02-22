<script lang="ts">
  import type { DialogueTree } from "../lib/types";
  import Dialogue from "../lib/Dialogue.svelte";
  import { fly } from "svelte/transition";

  let inventory = ["🥧", "🍕", "🥣"];
  let orderedItem = "";

  function checkOrderedItem(item: string) {
    orderedItem = item;
    return inventory.includes(item) ? "success" : "failure";
  }

  function consumeOrderedItem() {
    inventory = inventory.filter((x) => x != orderedItem);
    console.log(inventory);
  }

  function bringOrderedItem() {
    return {
      text: `Your order is ready. Bon appetite! **Puts ${orderedItem} on the table**`,
      onSpawn: consumeOrderedItem,
    };
  }

  let dialogueTree: DialogueTree = {
    start: [
      "What would you like to have?",
      [
        {
          header: "Soup",
          text: "Soup",
          next: () => checkOrderedItem("🥣"),
        },
        {
          header: "Pie",
          text: "Pie",
          next: () => checkOrderedItem("🥧"),
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
        { header: "Leave", text: "**You leave**", next: [""] },
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
        { header: "Leave", text: "**You leave**", next: [""] },
      ],
    ],
  };

  function reset() {
    location.reload();
  }
</script>

<main class="w-screen h-screen flex items-start justify-center p-4">
  <Dialogue
    {dialogueTree}
    containerClass="w-full h-full"
    on:dialogueEnd={reset}
    npcClass="bg-blue-50"
    userClass="bg-green-50"
    transitions={{
      user: {
        in: fly,
        out: fly,
      },
      reply: {
        in: fly,
        out: fly,
      },
    }}
  />
</main>
