<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueData } from "$lib/types";
  import DiceRoll from "./DiceRoll.svelte";

  type BranchKey = "start" | "success" | "failure";
  let diceResult = 0;

  function branchDialogue(): BranchKey {
    return diceResult > 4 ? "success" : "failure";
  }

  let dialogue: DialogueData<BranchKey> = {
    tree: {
      start: ["nested", { component: DiceRoll }, branchDialogue],
      success: ["You survived."],
      failure: ["You died."],
    },
  };
</script>

<Dialogue
  {dialogue}
  on:dialogueEnd={() => console.log("dialogue ended")}
  on:componentEvent={(e) => console.log(e)}
  on:componentEnd={(e) => {
    diceResult = e.detail.result;
  }}
/>
