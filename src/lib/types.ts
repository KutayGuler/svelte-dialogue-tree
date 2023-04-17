import type { ComponentType } from 'svelte';

export interface ComponentLeaf {
	/**
	 * A Svelte component.
	 */
	component: ComponentType;
	/**
	 * Arguments that will be passed to the component.
	 */
	args?: object;
}

/**
 * An object that holds the information about characters.
 * @typeParam CharacterKey - String literals that are the keys of the CharacterCollection
 *
 * @example
 * ```
 * const characters: CharacterCollection<CharacterKey> = {
 * 	royce: {
 * 		name: 'Royce:',
 * 		avatarSrc: 'royce2.png'
 * 	},
 * 	jackie: {
 * 		name: 'Jackie:',
 * 		avatarSrc: 'jackie.png'
 * 	},
 * }
 * ```
 */
export type CharacterCollection<CharacterKey extends string> = {
	[key in CharacterKey]: Character;
};

export interface Character {
	/**
	 * Name of the character.
	 *
	 * @example ```name: "Gotrek the Trollslayer"```
	 */
	name: string;
	/**
	 * URL source of the image.
	 *
	 * @example ```avatarSrc: "gotrek.png"```
	 */
	avatarSrc?: string;
}

export type TextObject = { text: string };
export type WithOnSpawn = {
	/**
	 * The function that will be fired when TextObject enters the dom.
	 */
	onSpawn: Function;
};
export type WithCharacter<CharacterKey> = {
	/**
	 * One of the keys of CharacterCollection object.
	 */
	character: CharacterKey;
};

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
	 * The text that will appear on the choice button.
	 */
	label: string;
	/**
	 * The content that will appear on the dialogue after choice is made.
	 */
	text: string;
	/**
	 * The branch dialogue will jump to. It can be a BranchKey, a function that returns a BranchKey or a nested branch.
	 *
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
	 * The title that will appear when a mouse is hovered over the choice button. It can be a string or a function that returns a string.
	 *
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
	 * Disabled determines whether the choice button is disabled or not. Can be boolean or a function that returns a boolean.
	 *
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
 * The prop that will be passed to the Dialogue component.
 *
 * @typeParam BranchKey - String literals that are the keys of the DialogueTree
 * @typeParam CharacterKey - String literals that are the keys of the CharacterCollection
 */
export type DialogueTree<
	BranchKey extends string = string,
	CharacterKey extends string = string
> = {
	[key in BranchKey]: Branch<BranchKey, CharacterKey>;
};
