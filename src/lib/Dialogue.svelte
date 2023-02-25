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
    type TransitionConfig,
  } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  type TransitionParams =
    | ScaleParams
    | FadeParams
    | BlurParams
    | FlyParams
    | SlideParams;

  type TransitionFunction = (
    node: Element,
    params?: TransitionParams
  ) => TransitionConfig;

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
  export let narrationClass = "";
  export let nextLineKey = "Space";
  export const nextLine = () => {
    index += 1;
  };

  // NPC TEXT TRANSITION
  export let npcIn: TransitionFunction = fly;
  export let npcInOptions: TransitionParams = { x: -200 };

  // USER TEXT TRANSITION
  export let userIn: TransitionFunction = fly;
  export let userInOptions: TransitionParams = { x: 200 };

  export let choiceIn: TransitionFunction = scale;
  export let choiceInOptions: TransitionParams = {};
  export let choiceStaggerGap: number = 200;

  let choosing = false;
  let index = -1;
  let key = "";
  let history: Branch<any> = [""];
  let userTextIndexes: Array<number> = [];

  function generateKey(): string {
    let key = "_" + Math.random().toString(36).substring(7);
    if (dialogueTree[key]) {
      return generateKey();
    }
    return key;
  }

  function flatten(key: BranchKey) {
    let choices = dialogueTree[key].at(-1);

    // confirming that it's a BranchChoiceElement
    if (Array.isArray(choices)) {
      for (let choice of choices) {
        if (!Array.isArray(choice.next)) continue;
        let generatedKey = generateKey();
        dialogueTree[generatedKey] = choice.next;
        choice.next = generatedKey;
        flatten(generatedKey);
      }
    }
  }

  onMount(() => {
    key = Object.keys(dialogueTree)[0];
    history = new Array(...dialogueTree[key]) as Branch<any>;
    flatten(key);
    nextLine();
    console.log(dialogueTree);
  });

  function checkForEnd() {
    if (!history[index]) {
      dispatch("dialogueEnd");
    }
  }

  function makeChoice(e: SubmitEvent) {
    let text = e.submitter?.dataset.text as string;
    let userIndex = +(e.submitter?.dataset.userIndex || -1);
    let siblingIndex = +(e.submitter?.dataset.siblingIndex || 0);

    let choicesArray = dialogueTree[key].at(
      -1
    ) as BranchChoiceElement<BranchKey>;

    console.log(choicesArray);

    if (typeof choicesArray == "function") {
      choicesArray = choicesArray();
    }

    let { next } = choicesArray[siblingIndex];
    console.log(next);

    if (!next) {
      dispatch("dialogueEnd");
    }

    /**
     * unmounts the choices from the DOM
     */
    history.pop();

    if (typeof next == "string") {
      key = next;
      history.push(text, ...dialogueTree[key]);
    } else if (typeof next == "function") {
      key = next();
      history.push(text, ...dialogueTree[key]);
    } else if (Array.isArray(next)) {
      history.push(text, ...next);
    } else {
      dispatch("dialogueEnd");
      return;
    }

    userTextIndexes.push(userIndex);
    choosing = false;

    /**
     * required to rerender the dom
     */
    history = history;
  }

  function parseNarrations(historyIndex: number, text: string) {
    const narrationRegex = /\*\*(.*?)\*\*/g;
    let narrations = text.match(narrationRegex);
    if (!narrations) return;
    history.splice(historyIndex + 1, 0, ...narrations);
  }

  function spawnedTextElement(
    node: Element,
    {
      onSpawn,
      text,
      historyIndex,
    }: { onSpawn: Function; text: string; historyIndex: number }
  ) {
    onSpawn();
    parseNarrations(historyIndex, text);
  }

  function spawnedChoiceElement(
    node: Element,
    {
      next,
      label,
      historyIndex,
    }: { next: Function; label: string; historyIndex: number }
  ) {
    console.log(next);
    console.log(label);

    next();
  }

  let cachedResults = new Map<number, any>();
</script>

<svelte:window
  on:keydown={(e) => {
    if (choosing || Array.isArray(history[index])) {
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
  {#each history as item, historyIndex (historyIndex)}
    {@const isUser = userTextIndexes.includes(historyIndex)}
    {@const isNarration =
      typeof item == "string" && item[0] == "*" && item.at(-1) == "*"}
    {#if index >= historyIndex}
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
              data-user-index={historyIndex}
              data-sibling-index={siblingIndex}
              data-text={choice.text}
            >
              {@html choice.label}
            </button>
          {/each}
        </form>
      {:else if isNarration}
        <p in:fly={{ y: -50 }} class={narrationClass || "sdt-narration"}>
          {@html item.replaceAll("*", "")}
        </p>
      {:else if isUser}
        <p
          class={userClass || "sdt-user"}
          in:userIn={userInOptions}
          out:userIn={{ duration: 0 }}
        >
          {@html item}
        </p>
      {:else if typeof item == "function"}
        {@const { text, onSpawn } =
          cachedResults.get(historyIndex) ||
          cachedResults.set(historyIndex, item()).get(historyIndex)}
        {#if onSpawn}
          {@const trimmed = text?.split("**")[0]}
          <p
            use:spawnedTextElement={{ onSpawn, text, historyIndex }}
            class={npcClass || "sdt-npc"}
            in:npcIn={npcInOptions}
          >
            {@html trimmed}
          </p>
        {:else}
          {@const choices =
            cachedResults.get(historyIndex) ||
            cachedResults.set(historyIndex, item()).get(historyIndex)}

          <form
            class={choiceContainerClass || "sdt-choiceContainer"}
            on:submit|preventDefault={makeChoice}
          >
            {#each choices as choice, siblingIndex}
              <button
                in:choiceIn={{
                  ...choiceInOptions,
                  delay: siblingIndex * choiceStaggerGap,
                }}
                type="submit"
                class={choiceClass || "sdt-choice"}
                data-user-index={historyIndex}
                data-sibling-index={siblingIndex}
                data-text={choice.text}
              >
                {@html choice.label}
              </button>
            {/each}
          </form>
        {/if}
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

  .sdt-narration {
    align-self: center;
    padding: 0.5rem;
    font-weight: 700;
  }
</style>
