<script lang="ts">
  import type { Choice, TransitionFunction, TransitionParams } from "./types";
  export let choices: Array<Choice<string, string>>;
  export let choiceContainerClass: string;
  export let choiceClass: string;
  export let historyIndex: number;
  export let makeChoice: (e: SubmitEvent) => void;
  export let choiceIn: TransitionFunction;
  export let choiceInOptions: TransitionParams;
  export let choiceStaggerGap: number;
</script>

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
  <slot name="generated" />
</form>
