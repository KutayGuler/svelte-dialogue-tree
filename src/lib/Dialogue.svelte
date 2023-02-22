<script lang="ts">
  import type { Choice, DialogueTree } from "./types";
  import { createEventDispatcher, onMount } from "svelte";
  import type { EasingFunction, TransitionConfig } from "svelte/transition";
  const dispatch = createEventDispatcher();

  import { beforeUpdate, afterUpdate } from "svelte";

  let container: HTMLElement;
  let autoscroll = false;

  beforeUpdate(() => {
    autoscroll =
      container &&
      container.offsetHeight + container.scrollTop >
        container.scrollHeight - 32;
  });

  afterUpdate(() => {
    if (autoscroll) container.scrollTo(0, container.scrollHeight);
  });

  export let dialogueTree: DialogueTree;
  export let containerClass = "";
  export let choiceContainerClass = "";
  export let choiceClass = "";
  export let userClass = "";
  export let npcClass = "";
  export let nextLineKey = "Space";
  export const nextLine = () => {
    index++;
  };

  type DialogueTransitionsKey = "npc" | "user" | "choice" | "choiceContainer";

  type DialogueTransitions = {
    [key in DialogueTransitionsKey]: {
      in: EasingFunction;
      out: EasingFunction;
      options: TransitionConfig;
    };
  };

  export let transitions: DialogueTransitions = {
    npc: { in: () => 1, out: () => 1, options: {} },
    user: { in: () => 1, out: () => 1, options: {} },
    choice: { in: () => 1, out: () => 1, options: {} },
    choiceContainer: { in: () => 1, out: () => 1, options: {} },
  };

  // TEXT TRANSITION
  let npcInTransition = transitions?.npc?.in || (() => 1);
  let npcOutTransition = transitions?.npc?.out || (() => 1);
  let npcTransitionOpts = transitions?.npc?.options || {};

  // TEXT TRANSITION
  let userInTransition = transitions?.user?.in || (() => 1);
  let userOutTransition = transitions?.user?.out || (() => 1);
  let userTransitionOpts = transitions?.user?.options || {};

  // TEXT TRANSITION
  let choiceInTransition = transitions?.choice?.in || (() => 1);
  let choiceOutTransition = transitions?.choice?.out || (() => 1);
  let choiceTransitionOpts = transitions?.choice?.options || {};

  // TEXT TRANSITION
  let choiceContainerInTransition =
    transitions?.choiceContainer?.in || (() => 1);
  let choiceContainerOutTransition =
    transitions?.choiceContainer?.out || (() => 1);
  let choiceContainerTransitionOpts =
    transitions?.choiceContainer?.options || {};

  let choosing = false;
  let index = 0;
  let key = "";
  let currentDialogue: Array<string | Array<Choice>> = [""];
  let userTextIndexes: Array<number> = [];

  onMount(() => {
    key = Object.keys(dialogueTree)[0];
    currentDialogue = new Array(...dialogueTree[key]);
  });

  function checkForEnd() {
    console.log(currentDialogue[index]);
    if (!currentDialogue[index]) {
      dispatch("dialogueEnd");
    }
  }

  function makeChoice(e: SubmitEvent) {
    let text = e.submitter?.dataset.text;
    let userIndex = +(e.submitter?.dataset.userIndex || -1);
    let siblingIndex = +(e.submitter?.dataset.siblingIndex || 0);

    let onSelect = dialogueTree[key]?.at(-1)[siblingIndex]?.onSelect;
    let next = dialogueTree[key]?.at(-1)[siblingIndex]?.next;

    if (next) {
      currentDialogue.pop(); // removing choices from the view

      console.log(onSelect);
      console.log(next);

      if (typeof onSelect == "function") {
        onSelect();
      }

      if (typeof next == "function") {
        next = next();
      }

      key = next;
      currentDialogue = [...currentDialogue, text, ...dialogueTree[key]];
      choosing = false;
      userTextIndexes.push(userIndex);
    }

    if (!dialogueTree[next || ""]) {
      currentDialogue = [
        ...currentDialogue,
        `<b style="color: red;">SVELTE-DIALOGUE-TREE ERROR: </b> The dialogue tree does not have a key named ${next}`,
      ];
      nextLine();
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (choosing || Array.isArray(currentDialogue[index])) {
      choosing = true;
      return;
    }

    if (e.code == nextLineKey) {
      nextLine();
    }

    checkForEnd();
  }}
/>

<!-- class={classes.container || "sdt-container"} -->
<article
  bind:this={container}
  class="bg-slate-100 p-4 rounded-2xl flex flex-col items-start gap-2 w-1/2 h-full overflow-y-auto"
>
  {#each currentDialogue as item, i}
    {@const isUserReply = userTextIndexes.includes(i)}
    {#if index >= i}
      {#if Array.isArray(item)}
        <!-- class={choiceContainerClass || "sdt-choiceContainer"} -->
        <form
          class="flex flex-wrap gap-2 w-full"
          on:submit|preventDefault={makeChoice}
        >
          {#each item as choice, siblingIndex}
            <!-- class={choiceClass || "sdt-choice"} -->
            <button
              type="submit"
              class="p-2 bg-amber-200 rounded-xl w-full hover:bg-amber-300"
              data-user-index={i}
              data-sibling-index={siblingIndex}
              data-text={choice.text}
              data-next={choice.next}
            >
              {@html choice.header}
            </button>
          {/each}
        </form>
      {:else if isUserReply}
        <!-- class={userClass || "sdt-user"} -->
        <p
          class="bg-blue-200 p-4 rounded-xl self-end text-end max-w-xs"
          in:userInTransition={userTransitionOpts}
          out:userOutTransition={userTransitionOpts}
        >
          {@html item}
        </p>
      {:else}
        <!-- class={textClass || "sdt-text"} -->
        <p
          class="bg-blue-200 p-4 rounded-xl max-w-xs"
          in:npcInTransition={npcTransitionOpts}
          out:npcOutTransition={npcTransitionOpts}
        >
          {@html item}
        </p>
      {/if}
    {/if}
  {/each}
</article>

<style>
  /* .sdt-container {

  }

  .sdt-text {
  }

  .sdt-user {
  }

  .sdt-choice {
  }

  .sdt-choiceContainer {
  } */
</style>
