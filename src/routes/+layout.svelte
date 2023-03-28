<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import '../lib/style.css';
	import 'highlight.js/styles/vs2015.css';
	import hljs from 'highlight.js';
	import { hljsDefineSvelte } from './highlight-svelte';
	hljs.registerLanguage('svelte', hljsDefineSvelte);
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	import {
		AppRail,
		AppRailTile,
		AppShell,
		AppBar,
		Drawer,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import Navigation from './Navigation.svelte';

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<Drawer>
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 p-4">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="h-4 w-4 fill-token">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
			</svelte:fragment>
			<h3>svelte-dialogue-tree</h3>
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment> -->

	<slot><!-- optional fallback --></slot>
</AppShell>
