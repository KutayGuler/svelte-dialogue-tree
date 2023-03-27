<script lang="ts">
	export let name: string;
	export let avatarSrc: string | undefined;
</script>

<!-- TODO: charInfo class should be exported -->
<div class="sdt-char-container">
	{#if avatarSrc}
		<!-- TODO: imgClass should be exported -->
		<img class="sdt-char-avatar" src={avatarSrc} alt="avatar" />
	{/if}
	<!-- TODO: nameClass should be exported -->
	<div class="sdt-char-name">
		{@html name}
	</div>
</div>

<style>
	.sdt-char-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.sdt-char-name {
		font-weight: 700;
	}

	.sdt-char-avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
	}
</style>
