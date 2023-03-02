<script lang="ts">
  import type { Choice, DialogueData } from "$lib/types";
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

  function listAvailableItems(): Array<Choice<BranchKey, CharacterKey>> {
    let choices: Array<Choice<BranchKey, CharacterKey>> = [];
    for (let item of menu) {
      choices.push({
        label: item,
        text: `I would like to have a ${item}`,
        title: () =>
          !itemExists(item)
            ? `The restaurant does not have any ${item}s left`
            : `Click to order ${item}`,
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
        name: "Cook",
        avatarURL: "https://picsum.photos/200/300",
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

<Dialogue {dialogue} on:dialogueEnd={() => alert("dialogue ended")} />
