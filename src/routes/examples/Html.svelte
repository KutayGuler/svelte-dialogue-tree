<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueData } from "$lib/types";

  type BranchKey = "start";

  let dialogue: DialogueData<BranchKey> = {
    tree: {
      start: [
        `Check out my website <a style="color: red;" href="https://svelte.dev" target="_blank" rel="noreferrer">here</a>`,
      ],
    },
  };
</script>

<Dialogue {dialogue} on:dialogueEnd={() => alert("dialogue ended")} />
