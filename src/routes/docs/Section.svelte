<script lang="ts">
	export let title: string;
</script>

<section class="flex flex-col gap-4">
	<h1 class="self-center pb-8">{title}</h1>
	<slot />
</section>
