<script>
  import "../lib/lib.css";
  import "highlight.js/styles/vs2015.css";
</script>

<header class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/"
      >svelte-dialogue-tree</a
    >
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/installation">Installation</a></li>
      <li><a href="/demos">Demos</a></li>
      <li><a href="/docs">Docs</a></li>
      <li>
        <a
          href="https://github.com/KutayGuler/svelte-dialogue-tree"
          target="_blank"
          rel="noreferrer"
          ><img src="github-mark.svg" class="w-6 h-6" alt="github logo" />
        </a>
      </li>
    </ul>
  </div>
</header>

<slot><!-- optional fallback --></slot>
