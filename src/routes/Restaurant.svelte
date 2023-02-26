<script lang="ts">
  import type { Choice, DialogueData } from "../lib/types";
  import Dialogue from "../lib/Dialogue.svelte";

  let inventory = ["🥧", "🍕", "🥣", "🍔"];
  let orderedItem = "";

  function checkItem(item: string): BranchKey {
    orderedItem = item;
    return inventory.includes(item) ? "success" : "failure";
  }

  function consumeOrderedItem() {
    inventory = inventory.filter((x) => x != orderedItem);
  }

  function listAvailableItems(): Array<Choice<BranchKey, CharacterKey>> {
    let choices: Array<Choice<BranchKey, CharacterKey>> = [];
    for (let item of inventory) {
      choices.push({
        label: item,
        text: `I would like to have a ${item}`,
        next: () => checkItem(item),
      });
    }
    return choices;
  }

  function bringOrderedItem() {
    return {
      text: `Your order is ready. Bon appetite! **Puts ${orderedItem} on the table ** This sentence won't be rendered as it is not between stars ** This will be rendered ** `,
      onSpawn: consumeOrderedItem,
    };
  }

  function orderOrLeave(): Array<Choice<BranchKey, CharacterKey>> {
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

  let dialogue: DialogueData<BranchKey, CharacterKey> = {
    characters: {
      cook: {
        name: "cook",
      },
    },
    tree: {
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
    },
  };
</script>

<Dialogue {dialogue} on:dialogueEnd={() => console.log("dialogue ended")} />
