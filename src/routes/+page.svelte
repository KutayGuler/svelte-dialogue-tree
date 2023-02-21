<script lang="ts">
  import type { DialogueTree } from "../lib/types";
  import Dialogue from "../lib/Dialogue.svelte";
  let dialogueTree: DialogueTree = {
    start: [
      "What would you like to have?",
      [
        { text: "Soup", next: "success" },
        { text: "Pie", next: "lol" },
      ],
    ],
    success: ["Coming right up!"],
  };
</script>

<Dialogue {dialogueTree} containerClass="w-5 h-5 bg-red-300" />
