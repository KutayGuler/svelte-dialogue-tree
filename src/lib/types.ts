export type CharacterCollection<CharacterKey extends string> = {
  [id in CharacterKey]: Character;
};

export interface Character {
  name: string;
  avatar?: {
    type: "img" | "svg" | "string" | "gif";
    data: any; // todo: replace
  };
}

export type TextWithOnSpawn = {
  text: string;
  onSpawn: Function;
};

export type TextWithCharacterID<CharacterKey> = {
  text: string;
  characterID: CharacterKey;
};

export type TextLeaf<CharacterKey extends string> =
  | string
  | TextWithOnSpawn
  | TextWithCharacterID<CharacterKey>
  | (() => string)
  | (() => TextWithOnSpawn)
  | (() => TextWithCharacterID<CharacterKey>);

export type ChoiceLeaf<BranchKey, CharacterKey extends string> =
  | Array<Choice<BranchKey, CharacterKey>>
  | (() => Array<Choice<BranchKey, CharacterKey>>);

export type Branch<BranchKey, CharacterKey extends string> =
  | Array<TextLeaf<CharacterKey>>
  | [
      ...texts: Array<TextLeaf<CharacterKey>>,
      lastItem: ChoiceLeaf<BranchKey, CharacterKey>
    ];

export interface DialogueData<
  BranchKey extends string = string,
  CharacterKey extends string = string
> {
  characters?: CharacterCollection<CharacterKey>;
  tree: Tree<BranchKey, CharacterKey>;
}

export type Tree<BranchKey extends string, CharacterKey extends string> = {
  [key in BranchKey]: Branch<BranchKey, CharacterKey>;
};

export interface Choice<BranchKey, CharacterKey extends string> {
  label: string;
  text: string;
  next: BranchKey | Branch<BranchKey, CharacterKey> | (() => BranchKey);
}
