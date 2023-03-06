<script lang="ts">
  import Restaurant from "./Restaurant.svelte";
  import Nested from "./Nested.svelte";
  import Roleplay from "./Roleplay.svelte";
  import Html from "./Html.svelte";
  import Narration from "./Narration.svelte";
  let currentExample = "restaurant";

  // TODO: Add different styles
</script>

<div class="p-4">
  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="restaurant"
    />
    Restaurant
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="nested"
    />
    Nested
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="roleplay"
    />
    Roleplay
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="html"
    />
    HTML
  </label>

  <label>
    <input
      type="radio"
      bind:group={currentExample}
      name="examples"
      value="narration"
    />
    Narration
  </label>
</div>

<main class="w-full h-[600px] flex items-start justify-center p-4">
  {#if currentExample == "restaurant"}
    <Restaurant />
  {:else if currentExample == "nested"}
    <Nested />
  {:else if currentExample == "roleplay"}
    <Roleplay />
  {:else if currentExample == "html"}
    <Html />
  {:else if currentExample == "narration"}
    <Narration />
  {/if}
</main>
