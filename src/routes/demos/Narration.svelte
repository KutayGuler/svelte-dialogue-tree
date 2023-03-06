<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  export let dialogueParams: any;

  let tree = {
    start: [
      "Hi",
      "** This will be rendered ** This will not be rendered ** how **",
    ],
  };
</script>

<Dialogue {tree} {...dialogueParams} />
