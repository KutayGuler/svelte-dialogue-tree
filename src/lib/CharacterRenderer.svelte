<script lang="ts">
	export let name: string;
	export let avatarSrc: string | undefined;
	export let charContainerClass: string;
	export let charAvatarClass: string;
	export let charNameClass: string;
</script>

<div class={charContainerClass || 'sdt-char-container'}>
	{#if avatarSrc}
		<img class={charAvatarClass || 'sdt-char-avatar'} src={avatarSrc} alt="avatar" />
	{/if}
	<div class={charNameClass || 'sdt-char-name'}>
		{@html name}
	</div>
</div>
