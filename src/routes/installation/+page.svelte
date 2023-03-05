<script lang="ts">
  import Dialogue from "$lib/Dialogue.svelte";
  import { onMount } from "svelte/internal";
  import { CodeBlock } from "svhighlight";

  let npm = `
npm i svelte-dialogue-tree
  `;

  let pnpm = `
pnpm add svelte-dialogue-tree
  `;

  let yarn = `
yarn add svelte-dialogue-tree
  `;
</script>

<div class="flex flex-col items-center justify-center">
  <CodeBlock
    dimensions="w-80"
    language="bash"
    headerText="npm"
    code={npm}
    showLineNumbers={false}
  />
  <CodeBlock
    dimensions="w-80"
    language="bash"
    headerText="pnpm"
    code={pnpm}
    showLineNumbers={false}
  />
  <CodeBlock
    dimensions="w-80"
    language="bash"
    headerText="yarn"
    code={yarn}
    showLineNumbers={false}
  />
</div>
