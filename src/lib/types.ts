import type { ComponentType } from 'svelte';

export interface ComponentLeaf {
	/**
	 * A Svelte component.
	 */
	component: ComponentType;
	/**
	 * TODO: args
	 */
	args?: object;
}

/**
 * @typeParam CharacterKey - String literals that are the keys of the CharacterCollection
 */
export type CharacterCollection<CharacterKey extends string> = {
	[id in CharacterKey]: Character;
};

export interface Character {
	/**
	 * TODO:
	 */
	name: string;
	/**
	 * TODO:
	 */
	avatarSrc?: string;
}

export type TextObject = { text: string };
export type WithOnSpawn = { onSpawn: Function };
export type WithCharacter<CharacterKey> = { character: CharacterKey };

export type TextLeaf<CharacterKey> =
	| string
	| (TextObject & WithOnSpawn)
	| (TextObject & WithCharacter<CharacterKey>)
	| (TextObject & WithOnSpawn & WithCharacter<CharacterKey>)
	| (() => string)
	| (() => TextObject & WithOnSpawn)
	| (() => TextObject & WithCharacter<CharacterKey>)
	| (() => TextObject & WithOnSpawn & WithCharacter<CharacterKey>);

export interface ChoiceObject<BranchKey, CharacterKey> {
	/**
	 * the text that will appear on the choice button.
	 */
	label: string;
	/**
	 * the content that will appear on the dialogue after choice is made.
	 */
	text: string;
	/**
	 *  the key of the branch dialogue will jump to. It can be a BranchKey, a function that returns a BranchKey or a nested branch.
	 * @example
	 * ```
	 * next: "yesBranch"
	 * ```
	 * ```
	 * next: next: () => "yesBranch"
	 * ```
	 * ```
	 * next: [
	 * 	"layer 1",
	 * 	[{ next: [
	 * 		"layer 2",
	 * 		[{ next: [
	 * 			"layer 3",
	 * 		]}]
	 * 	]}]
	 * ]
	 * ```
	 */
	next: BranchKey | Branch<BranchKey, CharacterKey> | (() => BranchKey) | [];
	/**
	 * the title that will appear when a mouse is hovered over the choice button. It can be a string or a function that returns a string.
	 * @example
	 * ```
	 * titleTag: "some title",
	 * ```
	 * ```
	 * titleTag: () => Math.random() < 0.5 ? "Not enough." : "Good enough.",
	 * ```
	 */
	titleTag?: string | (() => string);
	/**
	 * disabled determines whether the choice button is disabled or not. Can be boolean or a function that returns a boolean.
	 * @example
	 * ```
	 * disabled: true
	 * ```
	 * ```
	 * disabled: () => Math.random() < 0.5,
	 * ```
	 */
	disabled?: boolean | (() => boolean);
}

export type ChoiceLeaf<BranchKey, CharacterKey> =
	| Array<ChoiceObject<BranchKey, CharacterKey>>
	| (() => Array<ChoiceObject<BranchKey, CharacterKey>>);

export type Branch<BranchKey, CharacterKey> = [
	...texts: Array<TextLeaf<CharacterKey> | ComponentLeaf>,
	lastItem: ChoiceLeaf<BranchKey, CharacterKey> | TextLeaf<CharacterKey> | ComponentLeaf
];

/**
 * @typeParam BranchKey - String literals that are the keys of the DialogueTree
 * @typeParam CharacterKey - String literals that are the keys of the CharacterCollection
 */
export type DialogueTree<
	BranchKey extends string = string,
	CharacterKey extends string = string
> = {
	[key in BranchKey]: Branch<BranchKey, CharacterKey>;
};
