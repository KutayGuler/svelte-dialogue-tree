<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import type { BranchChoiceElement, DialogueTree } from "../lib/types";

  type BranchKey = "start";
  // TODO: Make nesting work (gotta find a way to detect layer depth)
  let dialogueTree: DialogueTree<BranchKey> = {
    start: [
      "nested",
      [
        {
          header: "choice0",
          text: "choice0",
          next: [
            // start_{autogen}
            "nest0",
            [
              {
                header: "choice00",
                text: "choice00",
                next: [
                  // start_{autogen}
                  "nest000",
                  [
                    {
                      header: "choice000",
                      text: "choice000",
                      next: ["nest000"], // start_{autogen}
                    },
                  ],
                ],
              },
              {
                header: "choice01",
                text: "choice01",
                next: [
                  // start_{autogen}
                  "nest010",
                  [
                    {
                      header: "choice010",
                      text: "choice010",
                      next: ["nest010"], // start_{autogen}
                    },
                  ],
                ],
              },
            ],
          ],
        },
        {
          header: "1",
          text: "1",
          next: [
            // c1_start
            "1",
            [
              {
                header: "2",
                text: "2",
                next: [
                  // c1__start
                  "2",
                  [
                    {
                      header: "3",
                      text: "3",
                      next: ["3"], // c1___start
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

  let generatedKeys = new Set<string>();

  function generateKey() {
    let key = "_" + Math.random().toString(36).substring(7);
    if (generatedKeys.has(key)) {
      return generateKey();
    }
    return key;
  }

  function flatten(key: BranchKey) {
    let choices = dialogueTree[key].at(-1);

    if (Array.isArray(choices)) {
      for (let choice of choices) {
        let generatedKey = generateKey();
        dialogueTree[generatedKey] = choice.next;
        choice.next = generatedKey;
        flatten(generatedKey);
      }
    }
  }

  flatten("start");

  console.log(dialogueTree);
</script>

<!-- <Dialogue {dialogueTree} /> -->
