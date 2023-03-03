import type {
  ScaleParams,
  FadeParams,
  BlurParams,
  FlyParams,
  SlideParams,
  TransitionConfig,
} from "svelte/types/runtime/transition";

export type CharacterCollection<CharacterKey extends string> = {
  [id in CharacterKey]: Character;
};

export interface Character {
  name: string;
  avatarURL?: string;
}

export interface ComponentLeaf {
  component: Function;
  args?: object;
}

export type TextObject = { text: string };
export type WithOnSpawn = { onSpawn: Function };
export type WithCharacterID<CharacterKey> = { characterID: CharacterKey };

export type TextLeaf<CharacterKey extends string> =
  | string
  | (TextObject & WithOnSpawn)
  | (TextObject & WithCharacterID<CharacterKey>)
  | (TextObject & WithOnSpawn & WithCharacterID<CharacterKey>)
  | (() => string)
  | (() => TextObject & WithOnSpawn)
  | (() => TextObject & WithCharacterID<CharacterKey>)
  | (() => TextObject & WithOnSpawn & WithCharacterID<CharacterKey>);

export type ChoiceLeaf<BranchKey, CharacterKey extends string> =
  | Array<ChoiceObject<BranchKey, CharacterKey>>
  | (() => Array<ChoiceObject<BranchKey, CharacterKey>>);

export type Branch<BranchKey, CharacterKey extends string> =
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

export interface ChoiceObject<BranchKey, CharacterKey extends string> {
  label: string;
  text: string;
  next: BranchKey | Branch<BranchKey, CharacterKey> | (() => BranchKey);
  title?: string | (() => string);
  disabled?: boolean | (() => boolean);
}

// TRANSITION TYPES

export type TransitionParams =
  | ScaleParams
  | FadeParams
  | BlurParams
  | FlyParams
  | SlideParams;

export type TransitionFunction = (
  node: Element,
  params?: TransitionParams
) => TransitionConfig;
