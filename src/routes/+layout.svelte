<script>
  import "../lib/lib.css";

  const links = [
    { title: "Docs", href: "/docs" },
    {
      title: "Github",
      href: "https://github.com/KutayGuler/svelte-dialogue-tree",
    },
  ];
</script>

<header>
  <ul>
    {#each links as link}
      <li><a href={link.href}>{link.title}</a></li>
    {/each}
  </ul>
</header>

<slot><!-- optional fallback --></slot>
