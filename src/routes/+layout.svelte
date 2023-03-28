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
			<a href="/" class="flex w-fit flex-row items-center gap-2 hover:text-primary-500">
				<svg
					class="h-6 w-6"
					width="99"
					height="118"
					viewBox="0 0 99 118"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_402_2)">
						<path
							d="M91.7998 15.5999C80.8998 -0.100083 59.1998 -4.70008 43.5998 5.19992L16.0998 22.7999C8.59976 27.4999 3.39976 35.1999 1.89976 43.8999C0.599758 51.1999 1.69976 58.6999 5.19976 65.1999C2.79976 68.7999 1.19976 72.7999 0.499758 76.9999C-1.10024 85.8999 0.999758 95.0999 6.19976 102.4C17.1998 118.1 38.7998 122.7 54.3998 112.8L81.8998 95.2999C89.3998 90.5999 94.5998 82.8999 96.0998 74.1999C97.3998 66.8999 96.2998 59.3999 92.7998 52.8999C95.1998 49.2999 96.7998 45.2999 97.4998 41.0999C99.1998 32.0999 97.0998 22.8999 91.7998 15.5999Z"
							fill="#FBE7D1"
						/>
						<path
							d="M40.9002 103.9C32.0002 106.2 22.7002 102.7 17.5002 95.2001C14.3002 90.8001 13.1002 85.3001 14.0002 79.9001C14.2002 79.0001 14.4002 78.2001 14.6002 77.3001L15.1002 75.7001L16.5002 76.7001C19.8002 79.1001 23.4002 80.9001 27.3002 82.1001L28.3002 82.4001L28.2002 83.4001C28.1002 84.8001 28.5002 86.3001 29.3002 87.5001C30.9002 89.8001 33.7002 90.9001 36.4002 90.2001C37.0002 90.0001 37.6002 89.8001 38.1002 89.5001L65.5002 72.0001C66.9002 71.1001 67.8002 69.8001 68.1002 68.2001C68.4002 66.6001 68.0002 64.9001 67.1002 63.6001C65.5002 61.3001 62.7002 60.3001 60.0002 61.0001C59.4002 61.2001 58.8002 61.4001 58.3002 61.7001L47.8002 68.4001C46.1002 69.5001 44.2002 70.3001 42.2002 70.8001C33.3002 73.1001 24.0002 69.6001 18.8002 62.1001C15.7002 57.7001 14.4002 52.2001 15.4002 46.8001C16.3002 41.6001 19.5002 36.9001 24.0002 34.1001L51.5002 16.6001C53.2002 15.5001 55.1002 14.7001 57.1002 14.1001C66.0002 11.8001 75.3002 15.3001 80.5002 22.8001C83.7002 27.2001 84.9002 32.7001 84.0002 38.1001C83.8002 39.0001 83.6002 39.8001 83.3002 40.7001L82.8002 42.3001L81.4002 41.3001C78.1002 38.9001 74.5002 37.1001 70.6002 35.9001L69.6002 35.6001L69.7002 34.6001C69.8002 33.2001 69.4002 31.7001 68.6002 30.5001C67.0002 28.2001 64.2002 27.2001 61.5002 27.9001C60.9002 28.1001 60.3002 28.3001 59.8002 28.6001L32.4002 46.1001C31.0002 47.0001 30.1002 48.3001 29.8002 49.9001C29.5002 51.5001 29.9002 53.2001 30.8002 54.5001C32.4002 56.8001 35.2002 57.8001 37.9002 57.1001C38.5002 56.9001 39.1002 56.7001 39.6002 56.4001L50.1002 49.7001C51.8002 48.6001 53.7002 47.8001 55.7002 47.2001C64.6002 44.9001 73.9002 48.4001 79.1002 55.9001C82.3002 60.3001 83.5002 65.8001 82.6002 71.2001C81.7002 76.4001 78.5002 81.1001 74.0002 83.9001L46.5002 101.4C44.8002 102.5 42.9002 103.3 40.9002 103.9Z"
							fill="#26211D"
						/>
					</g>
					<defs>
						<clipPath id="clip0_402_2">
							<rect width="98.1" height="118" fill="white" />
						</clipPath>
					</defs>
				</svg>
				<h3>Dialogue Tree</h3>
			</a>
			<svelte:fragment slot="trail">
				<div class="flex flex-row items-center gap-4">
					<a class="hover:text-primary-500" href="/installation">Installation</a>
					<a class="hover:text-primary-500" href="/docs">Docs</a>
					<a class="hover:text-primary-500" href="/demos">Demos</a>
					<a
						class="hover:text-primary-500"
						href="https://github.com/KutayGuler/svelte-dialogue-tree"
					>
						<svg
							class="h-6 w-6"
							width="98"
							height="96"
							viewBox="0 0 98 96"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
								fill="#FBE7D1"
							/></svg
						></a
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment> -->

	<slot><!-- optional fallback --></slot>
</AppShell>
