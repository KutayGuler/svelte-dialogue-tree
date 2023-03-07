<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  export let dialogueParams: any;

  let tree = {
    start: [
      "Hi",
      "npc text ** narration ** npc text ** narration **",
      "** standalone narration **",
      "** not standalone narration ** npc text",
    ],
  };
</script>

<Dialogue {tree} {...dialogueParams} />
