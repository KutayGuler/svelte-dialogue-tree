<script>
  import "../lib/lib.css";
  import "highlight.js/styles/github-dark.css";

  const links = [
    { title: "Examples", href: "/examples" },
    { title: "Docs", href: "/docs" },
    {
      title: "Github",
      href: "https://github.com/KutayGuler/svelte-dialogue-tree",
    },
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
      {#each links as link}
        <li><a href={link.href}>{link.title}</a></li>
      {/each}
    </ul>
  </div>
</header>

<slot><!-- optional fallback --></slot>
