<script lang="ts">
  import Restaurant from "./Restaurant.svelte";
  import Nested from "./Nested.svelte";

  // TODO: Disabled buttons with explanations
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

<main class="w-full h-[600px] flex items-start justify-center p-4">
  {#if currentExample == "restaurant"}
    <Restaurant />
  {:else if currentExample == "nested"}
    <Nested />
  {/if}
</main>
