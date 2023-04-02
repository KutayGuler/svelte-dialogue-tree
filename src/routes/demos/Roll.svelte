<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { slide } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	let rolling = false;

	let result1 = 1;
	let result2 = 1;

	const map: Map<number, number> = new Map([
		[1, 1],
		[2, 5],
		[3, 6],
		[4, 3],
		[5, 4],
		[6, 2]
	]);

	function rollDice() {
		result1 = Math.floor(Math.random() * 6 + 1);
		result2 = Math.floor(Math.random() * 6 + 1);
		rolling = true;
		setTimeout(() => {
			dispatch('componentEnd', {
				// @ts-expect-error
				result: map.get(result1) + map.get(result2)
			});
		});
	}
</script>

<div class="flex w-full flex-col py-8">
	{#if !rolling}
		<button
			transition:slide|local
			disabled={rolling}
			class="btn variant-filled-primary self-center"
			on:click={rollDice}>Roll dice!</button
		>
	{/if}

	<div class="relative flex w-full flex-row items-center justify-center gap-12 py-4">
		<div id="dice1" class="dice show-{result1}">
			<div id="dice-one-side-one" class="side one">
				<div class="dot one-1" />
			</div>
			<div id="dice-one-side-two" class="side two">
				<div class="dot two-1" />
				<div class="dot two-2" />
			</div>
			<div id="dice-one-side-three" class="side three">
				<div class="dot three-1" />
				<div class="dot three-2" />
				<div class="dot three-3" />
			</div>
			<div id="dice-one-side-four" class="side four">
				<div class="dot four-1" />
				<div class="dot four-2" />
				<div class="dot four-3" />
				<div class="dot four-4" />
			</div>
			<div id="dice-one-side-five" class="side five">
				<div class="dot five-1" />
				<div class="dot five-2" />
				<div class="dot five-3" />
				<div class="dot five-4" />
				<div class="dot five-5" />
			</div>
			<div id="dice-one-side-six" class="side six">
				<div class="dot six-1" />
				<div class="dot six-2" />
				<div class="dot six-3" />
				<div class="dot six-4" />
				<div class="dot six-5" />
				<div class="dot six-6" />
			</div>
		</div>
		<div id="dice2" class="dice show-{result2}">
			<div id="dice-two-side-one" class="side one">
				<div class="dot one-1" />
			</div>
			<div id="dice-two-side-two" class="side two">
				<div class="dot two-1" />
				<div class="dot two-2" />
			</div>
			<div id="dice-two-side-three" class="side three">
				<div class="dot three-1" />
				<div class="dot three-2" />
				<div class="dot three-3" />
			</div>
			<div id="dice-two-side-four" class="side four">
				<div class="dot four-1" />
				<div class="dot four-2" />
				<div class="dot four-3" />
				<div class="dot four-4" />
			</div>
			<div id="dice-two-side-five" class="side five">
				<div class="dot five-1" />
				<div class="dot five-2" />
				<div class="dot five-3" />
				<div class="dot five-4" />
				<div class="dot five-5" />
			</div>
			<div id="dice-two-side-six" class="side six">
				<div class="dot six-1" />
				<div class="dot six-2" />
				<div class="dot six-3" />
				<div class="dot six-4" />
				<div class="dot six-5" />
				<div class="dot six-6" />
			</div>
		</div>
	</div>
</div>

<style>
	.dice {
		position: relative;
		width: 100px;
		height: 100px;
		transform-style: preserve-3d;
		transition: transform 1s;
	}

	.dot {
		position: absolute;
		width: 20px;
		height: 20px;
		margin: -10px 5px 5px -10px;
		border-radius: 20px;
		background-color: #f25f5c;
		box-shadow: inset 2px 2px #d90429;
	}

	.side {
		position: absolute;
		background-color: #fff;
		border-radius: 5px;
		width: 100px;
		height: 100px;
		border: 1px solid #e5e5e5;
		text-align: center;
		line-height: 2em;
	}

	.side:nth-child(1) {
		transform: translateZ(3.1em);
	}

	.side:nth-child(6) {
		transform: rotateY(90deg) translateZ(3.1em);
	}

	.side:nth-child(3) {
		transform: rotateY(-90deg) translateZ(3.1em);
	}

	.side:nth-child(4) {
		transform: rotateX(90deg) translateZ(3.1em);
	}

	.side:nth-child(5) {
		transform: rotateX(-90deg) translateZ(3.1em);
	}

	.side:nth-child(2) {
		transform: rotateY(-180deg) translateZ(3.1em);
	}

	.show-1 {
		transform: rotateX(720deg) rotateZ(-720deg);
	}

	.show-6 {
		transform: rotateX(-900deg) rotateZ(1080deg);
	}

	.show-3 {
		transform: rotateY(-450deg) rotateZ(-1440deg);
	}

	.show-4 {
		transform: rotateY(810deg) rotateZ(720deg);
	}

	.show-5 {
		transform: rotateX(-810deg) rotateZ(-1080deg);
	}

	.show-2 {
		transform: rotateX(450deg) rotateZ(-720deg);
	}

	.two-1,
	.three-1,
	.four-1,
	.five-1,
	.six-1 {
		top: 20%;
		left: 20%;
	}

	.four-3,
	.five-3,
	.six-4 {
		top: 20%;
		left: 80%;
	}

	.one-1,
	.three-2,
	.five-5 {
		top: 50%;
		left: 50%;
	}

	.four-2,
	.five-2,
	.six-3 {
		top: 80%;
		left: 20%;
	}

	.two-2,
	.three-3,
	.four-4,
	.five-4,
	.six-6 {
		top: 80%;
		left: 80%;
	}

	.six-2 {
		top: 50%;
		left: 20%;
	}

	.six-5 {
		top: 50%;
		left: 80%;
	}
</style>
