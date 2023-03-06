<script lang="ts">
  import Restaurant from "./Restaurant.svelte";
  import Nested from "./Nested.svelte";
  import Roleplay from "./Roleplay.svelte";
  import Html from "./Html.svelte";
  import Narration from "./Narration.svelte";
  let currentExample = "restaurant";
  let dialogueParams = {
    containerClass: "",
    choiceContainerClass: "",
    choiceClass: "",
    userClass: "",
    npcClass: "",
    narrationClass: "",
  };

  let demos = ["Restaurant", "Nested", "Roleplay", "HTML", "Narration"];

  // TODO: Add different styles
</script>

<!-- TODO: Add kbd Space to instruct -->

<div class="p-4">
  {#each demos as value}
    <label>
      <input
        type="radio"
        bind:group={currentExample}
        name="demo"
        value={value.toLowerCase()}
      />
      {value}
    </label>
  {/each}
</div>

<main class="w-full h-[600px] flex items-start justify-center p-4">
  {#if currentExample == "restaurant"}
    <Restaurant {dialogueParams} />
  {:else if currentExample == "nested"}
    <Nested {dialogueParams} />
  {:else if currentExample == "roleplay"}
    <Roleplay {dialogueParams} />
  {:else if currentExample == "html"}
    <Html {dialogueParams} />
  {:else if currentExample == "narration"}
    <Narration {dialogueParams} />
  {/if}
</main>

<style>
  /* TODO: Add cyberpunk */
</style>
