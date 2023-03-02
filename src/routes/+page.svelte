<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";

  const dialogue = {
    tree: {
      start: [
        "Greetings traveler",
        "Where would you like to visit next?",
        [
          {
            label: "Go to docs",
            text: "I would like to make an order",
            next: "start",
          },
          { label: "Visit Github", text: "**You leave**", next: [] },
        ],
      ],
    },
  };
</script>

<Dialogue {dialogue} />
