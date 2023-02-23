<script lang="ts">
  import type { BranchElement, Choice, DialogueTree } from "./types";
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

  export let dialogueTree: DialogueTree<string>;
  export let containerClass = "";
  export let choiceContainerClass = "";
  export let choiceClass = "";
  export let userClass = "";
  export let npcClass = "";
  export let nextLineKey = "Space";
  export const nextLine = () => {
    index++;
  };

  type DialogueTransitionsKey =
    | "container"
    | "npc"
    | "user"
    | "choice"
    | "choiceContainer";

  type DialogueTransitions = {
    [key in DialogueTransitionsKey]: {
      in: EasingFunction;
      options: TransitionConfig;
    };
  };

  export let transitions: DialogueTransitions;

  // TEXT TRANSITION
  let npcTransition = transitions?.npc?.transition || (() => 1);
  let npcTransitionOpts = transitions?.npc?.options || {};

  // TEXT TRANSITION
  let userTransition = transitions?.user?.transition || (() => 1);
  let userTransitionOpts = transitions?.user?.options || {};

  // TEXT TRANSITION
  let containerTransition = transitions?.container?.transition || (() => 1);
  let containerTransitionOpts = transitions?.container?.options || {};

  // TEXT TRANSITION
  let choiceTransition = transitions?.choice?.transition || (() => 1);
  let choiceTransitionOpts = transitions?.choice?.options || {};

  // TEXT TRANSITION
  let choiceContainerTransition =
    transitions?.choiceContainer?.transition || (() => 1);
  let choiceContainerTransitionOpts =
    transitions?.choiceContainer?.options || {};

  let choosing = false;
  let index = 0;
  let key = "";
  let currentBranchElements: Array<BranchElement> = [""];
  let userTextIndexes: Array<number> = [];

  onMount(() => {
    key = Object.keys(dialogueTree)[0];
    currentBranchElements = new Array(...dialogueTree[key]);
  });

  function checkForEnd() {
    console.log(currentBranchElements[index]);
    if (!currentBranchElements[index]) {
      dispatch("dialogueEnd");
    }
  }

  function makeChoice(e: SubmitEvent) {
    let text = e.submitter?.dataset.text;
    let userIndex = +(e.submitter?.dataset.userIndex || -1);
    let siblingIndex = +(e.submitter?.dataset.siblingIndex || 0);

    // TODO: TYPESAFE STUFF
    // FIXME: Transitions not working properly

    let next = dialogueTree[key]?.at(-1)[siblingIndex]?.next;
    console.log(next);

    if (next) {
      currentBranchElements.pop(); // removing choices from the view

      if (typeof next == "function") {
        next = next();
      }

      key = next;
      console.log(dialogueTree[key]);
      currentBranchElements.push(text);
      if (dialogueTree[key]) {
        currentBranchElements.push(...dialogueTree[key]);
      }
      currentBranchElements = currentBranchElements;

      // currentDialogue = [...currentDialogue, text, ...dialogueTree[key]];
      choosing = false;
      userTextIndexes.push(userIndex);
    } else {
      dispatch("dialogueEnd");
    }

    // if (!dialogueTree[key || ""]) {
    //   currentBranchElements = [
    //     ...currentBranchElements,
    //     `<b style="color: red;">SVELTE-DIALOGUE-TREE ERROR: </b> The dialogue tree does not have a key named ${next}`,
    //   ];
    //   nextLine();
    // }
  }

  function spawned(node, fn) {
    console.log("spawned");

    fn();
  }

  let cachedResults = new Map<number, any>();
</script>

<svelte:window
  on:keydown={(e) => {
    if (choosing || Array.isArray(currentBranchElements[index])) {
      choosing = true;
      return;
    }

    if (e.code == nextLineKey) {
      nextLine();
    }

    checkForEnd();
  }}
/>

<article bind:this={container} class={containerClass || "sdt-container"}>
  {#each currentBranchElements as item, i}
    {@const isUserReply = userTextIndexes.includes(i)}
    {#if index >= i}
      {#if Array.isArray(item)}
        <form
          class={choiceContainerClass || "sdt-choiceContainer"}
          in:choiceContainerTransition={choiceContainerTransitionOpts}
          on:submit|preventDefault={makeChoice}
        >
          {#each item as choice, siblingIndex}
            <button
              type="submit"
              class={choiceClass || "sdt-choice"}
              data-user-index={i}
              data-sibling-index={siblingIndex}
              data-text={choice.text}
            >
              {@html choice.header}
            </button>
          {/each}
        </form>
      {:else if isUserReply}
        <p
          class={userClass || "sdt-user"}
          in:userTransition={userTransitionOpts}
        >
          {@html item}
        </p>
      {:else if typeof item == "function"}
        {@const { text, onSpawn } =
          cachedResults.get(i) || cachedResults.set(i, item()).get(i)}
        <p
          use:spawned={onSpawn}
          class={npcClass || "sdt-npc"}
          in:npcTransition={npcTransitionOpts}
        >
          {@html text}
        </p>
      {:else}
        <p class={npcClass || "sdt-npc"} in:npcTransition={npcTransitionOpts}>
          {@html item}
        </p>
      {/if}
    {/if}
  {/each}
</article>

<style>
  /* class="bg-slate-100 p-4 rounded-2xl flex flex-col items-start gap-2 w-1/2 h-full overflow-y-auto" */
  .sdt-container {
    --tw-bg-opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    background-color: rgb(241 245 249 / var(--tw-bg-opacity));
    padding: 1rem;
    border-radius: 1rem;
    overflow-y: auto;
    gap: 0.5rem;
  }

  /* class="bg-blue-200 p-4 rounded-xl max-w-xs" */
  .sdt-npc {
    padding: 1rem;
    background-color: #bfdbfe;
    max-width: 20rem;
    border-radius: 0.75rem;
  }

  /* class="bg-blue-200 p-4 rounded-xl self-end text-end max-w-xs" */
  .sdt-user {
    padding: 1rem;
    background-color: #bfdbfe;
    align-self: flex-end;
    max-width: 20rem;
    border-radius: 0.75rem;
  }

  /* class="p-2 bg-amber-200 rounded-xl w-full hover:bg-amber-300" */
  .sdt-choice {
    background-color: #fde68a;
    padding: 0.5rem;
    width: 100%;
    border-radius: 0.75rem;
  }

  .sdt-choice:hover {
    background-color: #fcd34d;
  }

  /* class="flex flex-wrap gap-2 w-full" */
  .sdt-choiceContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;
  }
</style>
