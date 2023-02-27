<script lang="ts">
  import type {
    CharacterCollection,
    TransitionFunction,
    TransitionParams,
  } from "./types";
  export let text: string;
  export let onSpawn: Function = () => {};
  export let characterID: string = "";
  export let characters: CharacterCollection<string> | undefined;
  export let spawnedTextElement: Function;
  export let historyIndex: number;
  export let npcClass: string;
  export let npcIn: TransitionFunction;
  export let npcInOptions: TransitionParams;
</script>

<!-- TODO: export classes -->
<div class="flex flex-col gap-2" in:npcIn={npcInOptions}>
  {#if characters && characterID}
    {@const { name, avatarURL } = characters[characterID]}
    <div class="flex flex-row gap-2 items-center">
      {#if avatarURL}
        <img class="w-8 h-8 rounded-full" src={avatarURL} alt="avatar" />
      {/if}
      <p class="font-bold">
        {@html characters[characterID].name}
      </p>
    </div>
  {/if}
  <p
    use:spawnedTextElement={{ onSpawn, text, historyIndex }}
    class={npcClass || "sdt-npc"}
  >
    {@html text?.split("**")[0]}
  </p>
</div>
