<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueTree } from "$lib/types";
  import DiceRoll from "./DiceRoll.svelte";
  export let dialogueParams: any;

  type BranchKey = "start" | "success" | "failure";
  let diceResult = 0;

  function branchDialogue(): BranchKey {
    return diceResult > 4 ? "success" : "failure";
  }

  let tree: DialogueTree<BranchKey> = {
    start: ["nested", { component: DiceRoll }, branchDialogue],
    success: ["You survived."],
    failure: ["You died."],
  };
</script>

<Dialogue
  {tree}
  {...dialogueParams}
  on:dialogueEnd={() => alert("dialogue ended")}
  on:componentEvent={(e) => console.log(e)}
  on:componentEnd={(e) => {
    diceResult = e.detail.result;
  }}
/>
