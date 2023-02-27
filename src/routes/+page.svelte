<script lang="ts">
  import Restaurant from "./Restaurant.svelte";
  import Nested from "./Nested.svelte";
  import Roleplay from "./Roleplay.svelte";
  let currentExample = "restaurant";
</script>

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

<main class="w-full h-[600px] flex items-start justify-center p-4">
  {#if currentExample == "restaurant"}
    <Restaurant />
  {:else if currentExample == "nested"}
    <Nested />
  {:else if currentExample == "roleplay"}
    <Roleplay />
  {/if}
</main>
