<script lang="ts">
  import type {
    Branch,
    BranchChoiceElement,
    BranchTextElement,
    DialogueTree,
    NextBranch,
  } from "./types";
  import { beforeUpdate, afterUpdate } from "svelte";
  import {
    fly,
    scale,
    type BlurParams,
    type FadeParams,
    type FlyParams,
    type ScaleParams,
    type SlideParams,
  } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  type TransitionParams =
    | ScaleParams
    | FadeParams
    | BlurParams
    | FlyParams
    | SlideParams;

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

  type BranchKey = keyof typeof dialogueTree;

  export let containerClass = "";
  export let choiceContainerClass = "";
  export let choiceClass = "";
  export let userClass = "";
  export let npcClass = "";
  export let nextLineKey = "Space";
  export const nextLine = () => {
    index += 1;
  };

  // NPC TEXT TRANSITION
  export let npcIn = fly;
  export let npcInOptions: TransitionParams = { x: -200 };

  // USER TEXT TRANSITION
  export let userIn = fly;
  export let userInOptions: TransitionParams = { x: 200 };

  export let choiceIn = scale;
  export let choiceInOptions: TransitionParams = {};
  export let choiceStaggerGap: number = 200;

  let choosing = false;
  let index = -1;
  let key = "";
  let currentBranchElements: Branch<any> = [""];
  let userTextIndexes: Array<number> = [];

  onMount(() => {
    key = Object.keys(dialogueTree)[0];
    currentBranchElements = new Array(...dialogueTree[key]) as Branch<any>;
    nextLine();
  });

  function checkForEnd() {
    console.log(currentBranchElements[index]);
    if (!currentBranchElements[index]) {
      console.log("dialogueEnd");
      dispatch("dialogueEnd");
    }
  }

  function makeChoice(e: SubmitEvent) {
    let text = e.submitter?.dataset.text;
    let userIndex = +(e.submitter?.dataset.userIndex || -1);
    let siblingIndex = +(e.submitter?.dataset.siblingIndex || 0);

    if (!dialogueTree[key]) return;

    let lastItem: BranchTextElement | BranchChoiceElement<BranchKey> =
      dialogueTree[key].at(-1) as any & undefined;

    if (!lastItem) return;

    // TODO: complete this

    // it's of type BranchChoiceElement
    if (Array.isArray(lastItem)) {
    }

    let next: NextBranch<BranchKey> = lastItem[siblingIndex]?.next;
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
      // currentDialogue = [...currentDialogue, text, ...dialogueTree[key]];
      choosing = false;
      userTextIndexes.push(userIndex);
      console.log(userTextIndexes);

      currentBranchElements = currentBranchElements;
    } else {
      dispatch("dialogueEnd");
    }

    // if (!dialogueTree[key || ""]) {
    // // use console.warn() instead
    //   currentBranchElements = [
    //     ...currentBranchElements,
    //     `<b style="color: red;">SVELTE-DIALOGUE-TREE ERROR: </b> The dialogue tree does not have a key named ${next}`,
    //   ];
    //   nextLine();
    // }
  }

  function spawned(node: Element, fn: Function) {
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

<article
  in:scale|local
  bind:this={container}
  class={containerClass || "sdt-container"}
>
  {#each currentBranchElements as item, i (i)}
    {@const isUser = userTextIndexes.includes(i)}
    {#if index >= i}
      {#if Array.isArray(item)}
        <form
          class={choiceContainerClass || "sdt-choiceContainer"}
          on:submit|preventDefault={makeChoice}
        >
          {#each item as choice, siblingIndex}
            <button
              in:choiceIn={{
                ...choiceInOptions,
                delay: siblingIndex * choiceStaggerGap,
              }}
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
      {:else if isUser}
        <p class={userClass || "sdt-user"} transition:userIn={userInOptions}>
          {@html item}
        </p>
      {:else if typeof item == "function"}
        {@const { text, onSpawn } =
          cachedResults.get(i) || cachedResults.set(i, item()).get(i)}
        <p
          use:spawned={onSpawn}
          class={npcClass || "sdt-npc"}
          in:npcIn={npcInOptions}
        >
          {@html text}
        </p>
      {:else}
        <p class={npcClass || "sdt-npc"} in:npcIn={npcInOptions}>
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
    overflow-x: hidden;
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
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
  }
</style>
