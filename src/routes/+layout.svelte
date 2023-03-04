<script>
  import "../lib/lib.css";
  import "highlight.js/styles/github-dark.css";

  const links = [
    { title: "Examples", href: "/examples" },
    { title: "Docs", href: "/docs" },
  ];
</script>

<header class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/"
      >svelte-dialogue-tree 💬🌲</a
    >
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/examples">Demos</a></li>
      <li><a href="/docs">Docs</a></li>
      <li>
        <a href=""> <img src="github-mark.svg" class="w-6 h-6" /> </a>
      </li>
    </ul>

    <!-- TODO: Change Github to svg -->
  </div>
</header>

<slot><!-- optional fallback --></slot>
