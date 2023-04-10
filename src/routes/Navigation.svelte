<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a on:click={drawerClose} href="/">Home</a></li>
		<li><a on:click={drawerClose} href="/installation">Installation</a></li>
		<li><a on:click={drawerClose} href="/docs">Docs</a></li>
		<li><a on:click={drawerClose} href="/demos">Demos</a></li>
	</ul>
</nav>
