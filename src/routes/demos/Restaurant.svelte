<script lang="ts">
  import type {
    CharacterCollection,
    ChoiceObject,
    DialogueTree,
  } from "$lib/types";
  import Dialogue from "$lib/Dialogue.svelte";
  export let dialogueParams: any;

  let menu = ["🥧", "🍕", "🥣", "🍔"];
  let inventory = ["🥧"]; // "🍕", "🥣", "🍔"
  // TODO: Add to docs "might have all options disabled" as an edge case reminder
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
        text: `I would like to have a ${item}`,
        titleTag: () =>
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
    choices.push({
      label: "cancel",
      text: "Nevermind",
      next: "failure",
      // TODO: might add another branch as it doesn't make sense rn
    });
    return choices;
  }

  function bringOrderedItem() {
    return {
      text: `** A few minutes pass ** Your order is ready. Bon appetite! **Puts ${orderedItem} on the table **`,
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
      { text: "What would you like to have?", character: "cook" },
      listAvailableItems,
    ],
    success: [
      { text: "Coming right up!", character: "cook" },
      bringOrderedItem,
      orderOrLeave,
    ],
    failure: [
      {
        text: "We are fresh out of that, Would you like to have something else",
        character: "cook",
      },
      orderOrLeave,
    ],
  };
</script>

<Dialogue
  {tree}
  {characters}
  {...dialogueParams}
  on:dialogueEnd={() => alert("dialogue ended")}
/>
