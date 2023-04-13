export interface ComponentLeaf {
	component: Function;
	args?: object;
}

export type CharacterCollection<CharacterKey extends string> = {
	[id in CharacterKey]: Character;
};

export interface Character {
	name: string;
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
	label: string;
	text: string;
	next: BranchKey | Branch<BranchKey, CharacterKey> | (() => BranchKey);
	titleTag?: string | (() => string);
	disabled?: boolean | (() => boolean);
}

export type ChoiceLeaf<BranchKey, CharacterKey> =
	| Array<ChoiceObject<BranchKey, CharacterKey>>
	| (() => Array<ChoiceObject<BranchKey, CharacterKey>>);

export type Branch<BranchKey, CharacterKey> =
	| Array<TextLeaf<CharacterKey> | ComponentLeaf>
	| [
			...texts: Array<TextLeaf<CharacterKey> | ComponentLeaf>,
			lastItem: ChoiceLeaf<BranchKey, CharacterKey>
	  ];

export type DialogueTree<
	BranchKey extends string = string,
	CharacterKey extends string = string
> = {
	[key in BranchKey]: Branch<BranchKey, CharacterKey>;
};
