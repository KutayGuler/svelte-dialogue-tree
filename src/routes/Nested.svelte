<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { DialogueTree } from "../lib/types";

  type BranchKey = "start";
  let dialogueTree: DialogueTree<BranchKey> = {
    start: [
      "nested",
      [
        {
          header: "xd",
          text: "xd",
          next: [
            "xd",
            [
              {
                header: "xd",
                text: "xd",
                next: [
                  "xd",
                  [
                    {
                      header: "xd",
                      text: "xd",
                      next: [[{ header: "xd", text: "xd", next: [] }]],
                    },
                  ],
                ],
              },
            ],
          ],
        },
      ],
    ],
  };
</script>

<Dialogue {dialogueTree} />
