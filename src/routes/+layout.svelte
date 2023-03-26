<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import '../lib/lib.css';
	import 'highlight.js/styles/vs2015.css';
	import hljs from 'highlight.js';
	import { hljsDefineSvelte } from './highlight-svelte';
	hljs.registerLanguage('svelte', hljsDefineSvelte);
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	import { AppRail, AppRailTile, AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- TODO: make this responsive -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>Skeleton</AppBar>
	</svelte:fragment>

	<slot><!-- optional fallback --></slot>
</AppShell>
