<script lang="ts">
  import { CodeBlock } from "svhighlight";

  let leaf = `
  function onSpawn() {
  console.log("spawned something");
}

"something"
{ text: "something", onSpawn }
() => "something"
() => { text: "something", onSpawn }}
  `;

  // TODO: Turn this into a conversation, blur, unblur code based on spawning stuff
  // TODO: Link types to github
</script>

<p>
  svelte-dialogue-tree has quite a flexible tree structure and that's why we
  will explore the leafs and branches first.
</p>
<p>Leafs 🍃</p>
<p>TextLeaf</p>
<p>
  A TextLeaf can be a string, an object or a function that returns a string or
  an object
</p>

<!-- TODO: Add daisyUI -->

<div class="flex flex-col w-full items-center justify-center">
  <div class="w-full">
    <CodeBlock language="typescript" code={leaf} showHeader={false} />
  </div>
</div>

<p>ChoiceLeaf</p>
<p>
  A ChoiceLeaf can be an array of Choice objects or a function that returns an
  array of choice objects
</p>

<p>
  svelte-dialogue-tree has quite a flexible tree structure and that's why we
  will explore the leafs and branches first.
</p>
<p>Branches 🌿</p>
<p />
<p>
  A TextLeaf can be a string, an object or a function that returns a string or
  an object
</p>
