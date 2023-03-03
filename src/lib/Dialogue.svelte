<script lang="ts">
  import type {
    Branch,
    DialogueTree,
    CharacterCollection,
    ChoiceLeaf,
    TransitionFunction,
    TransitionParams,
  } from "./types";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fly, scale } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import TextRenderer from "./TextRenderer.svelte";
  import ChoiceRenderer from "./ChoiceRenderer.svelte";

  const dispatch = createEventDispatcher();
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

  type BranchKey = string;
  type CharacterKey = string;

  export let tree: DialogueTree<string>;
  export let characters: CharacterCollection<string> | undefined = {};

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
  export let dialogueIn: TransitionFunction = scale;
  export let dialogueInOptions: TransitionParams = {};

  // NPC TEXT TRANSITION
  export let npcIn: TransitionFunction = fly;
  export let npcInOptions: TransitionParams = { x: -200 };

  // USER TEXT TRANSITION
  export let userIn: TransitionFunction = fly;
  export let userInOptions: TransitionParams = { x: 200 };

  export let choiceIn: TransitionFunction = scale;
  export let choiceInOptions: TransitionParams = {};
  export let choiceStaggerGap: number = 200;

  let interacting = false;
  let index = -1;
  let key = "";
  let history: Branch<string, string> = [""];
  let userTextIndexes: Array<number> = [];

  function generateKey(): string {
    let key = "_" + Math.random().toString(36).substring(7);
    if (tree[key]) {
      return generateKey();
    }
    return key;
  }

  function flatten(key: BranchKey) {
    let choices = tree[key].at(-1);

    // confirming that it's a BranchChoiceElement
    if (Array.isArray(choices)) {
      for (let choice of choices) {
        if (!Array.isArray(choice.next)) continue;
        let generatedKey = generateKey();
        tree[generatedKey] = choice.next;
        choice.next = generatedKey;
        flatten(generatedKey);
      }
    }
  }

  onMount(() => {
    key = Object.keys(tree)[0];
    history = new Array(...tree[key]) as Branch<BranchKey, CharacterKey>;
    flatten(key);
    nextLine();
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
    let choicesArray = tree[key].at(-1) as ChoiceLeaf<BranchKey, CharacterKey>;

    if (typeof choicesArray == "function") {
      choicesArray = choicesArray();
    }

    let { next } = choicesArray[siblingIndex];

    if (!next) {
      dispatch("dialogueEnd");
    }

    /**
     * unmounts the choices from the DOM
     */
    history.pop();

    if (typeof next == "string") {
      key = next;
      history.push(text, ...(tree[key] as any));
    } else if (typeof next == "function") {
      key = next();
      history.push(text, ...(tree[key] as any));
    } else if (Array.isArray(next)) {
      history.push(text, ...(next as any));
    } else {
      dispatch("dialogueEnd");
      return;
    }

    userTextIndexes.push(userIndex);
    interacting = false;

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
    if (typeof onSpawn == "function") {
      onSpawn();
      parseNarrations(historyIndex, text);
    }
  }

  let cachedResults = new Map<number, any>();

  function choicesGenerated(node: Element) {
    node.remove();
    interacting = true;
  }

  function spawnedComponent(node: Element) {
    interacting = true;
    node.remove();
  }

  function changeKey(node: Element, newKey: BranchKey) {
    node.remove();
    key = newKey;
    history = [...history, ...tree[key]];
    index++;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (interacting || Array.isArray(history[index])) {
      interacting = true;
      return;
    }

    if (e.code == nextLineKey) {
      nextLine();
    }

    checkForEnd();
  }}
/>

<article
  in:dialogueIn|local={dialogueInOptions}
  bind:this={container}
  class={containerClass || "sdt-container"}
>
  {#each history as item, historyIndex (historyIndex)}
    {@const isUser = userTextIndexes.includes(historyIndex)}
    {@const isNarration =
      typeof item == "string" && item[0] == "*" && item.at(-1) == "*"}
    {#if index >= historyIndex}
      {#if Array.isArray(item) && item.length != 0}
        <ChoiceRenderer
          choices={item}
          {choiceIn}
          {makeChoice}
          {choiceClass}
          {historyIndex}
          {choiceInOptions}
          {choiceStaggerGap}
          {choiceContainerClass}
        />
      {:else if typeof item == "function"}
        {@const params =
          cachedResults.get(historyIndex) ||
          cachedResults.set(historyIndex, item()).get(historyIndex)}
        {#if Array.isArray(params)}
          <ChoiceRenderer
            choices={params}
            {choiceIn}
            {makeChoice}
            {choiceClass}
            {historyIndex}
            {choiceInOptions}
            {choiceStaggerGap}
            {choiceContainerClass}
          />
          <span use:choicesGenerated />
        {:else if typeof params == "string"}
          {#if tree[params]}
            <span use:changeKey={params} />
          {:else}
            <TextRenderer
              text={params}
              {npcIn}
              {npcClass}
              {characters}
              {npcInOptions}
              {historyIndex}
              {spawnedTextElement}
            />
          {/if}
        {:else}
          <TextRenderer
            {...params}
            {npcIn}
            {npcClass}
            {characters}
            {npcInOptions}
            {historyIndex}
            {spawnedTextElement}
          />
        {/if}
      {:else if typeof item == "object"}
        {#if item.component}
          <span use:spawnedComponent />
          <svelte:component
            this={item.component}
            {...item.args}
            on:componentEvent
            on:componentEnd={(e) => {
              dispatch("componentEnd", e.detail);
              interacting = false;
            }}
          />
        {:else}
          <TextRenderer
            {...item}
            {npcIn}
            {npcClass}
            {characters}
            {npcInOptions}
            {historyIndex}
            {spawnedTextElement}
          />
        {/if}
      {:else if typeof item == "string" && isNarration}
        {@const trimmed = item.replaceAll("*", "")}
        <p in:fly={{ y: -50 }} class={narrationClass || "sdt-narration"}>
          {@html trimmed}
        </p>
      {:else if isUser}
        <p
          class={userClass || "sdt-user"}
          in:userIn={userInOptions}
          out:userIn={{ duration: 0 }}
        >
          {@html item}
        </p>
      {:else}
        <p class={npcClass || "sdt-npc"} in:npcIn={npcInOptions}>
          {@html item}
        </p>
      {/if}
    {/if}
  {/each}
</article>
