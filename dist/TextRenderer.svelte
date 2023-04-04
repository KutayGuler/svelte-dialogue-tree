<script>export let text;
export let character = "";
export let characters;
export let npcContainerClass;
export let npcTextClass;
export let charContainerClass;
export let charAvatarClass;
export let charNameClass;
export let npcIn;
export let npcInOptions;
</script>

<div class={npcContainerClass} in:npcIn={npcInOptions}>
	{#if characters && character}
		{@const { name, avatarSrc } = characters[character]}
		<div class={charContainerClass}>
			{#if avatarSrc}
				<img class={charAvatarClass} src={avatarSrc} alt="avatar" />
			{/if}
			<div class={charNameClass}>
				{@html name}
			</div>
		</div>
	{/if}
	<div class={npcTextClass}>
		{@html text}
	</div>
</div>
