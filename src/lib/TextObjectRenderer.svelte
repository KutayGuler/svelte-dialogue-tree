<script lang="ts">
  import ChoiceRenderer from "./ChoiceRenderer.svelte";
  import type {
    CharacterCollection,
    TransitionFunction,
    TransitionParams,
  } from "./types";
  export let text: string;
  export let onSpawn: Function;
  export let characterID: string;

  export let characters: CharacterCollection<string>;
  export let spawnedTextElement: Function;
  export let historyIndex: number;
  export let npcClass: string;
  export let npcIn: TransitionFunction;
  export let npcInOptions: TransitionParams;
</script>

{#if characterID}
  <p class="font-bold">{characters[characterID].name}</p>
{/if}
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
  {@const trimmed = text?.split("**")[0]}
  <p class={npcClass || "sdt-npc"} in:npcIn={npcInOptions}>
    {@html trimmed}
  </p>
{/if}
