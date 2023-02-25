export type CharacterCollection = {
  [id: string]: Character;
};

export interface Character {
  name: string;
  avatar?: {
    type: "img" | "svg" | "string" | "gif";
    data: any; // todo: replace
  };
}

export type TextObject =
  | {
      text: string;
      onSpawn: Function;
    }
  | {
      text: string;
      characterID: keyof CharacterCollection;
    };

export type BranchTextElement =
  | string
  | TextObject
  | (() => string)
  | (() => TextObject);

export type BranchChoiceElement<BranchKey> =
  | Array<Choice<BranchKey>>
  | (() => Array<Choice<BranchKey>>);

export type Branch<BranchKey> =
  | Array<BranchTextElement>
  | [
      ...texts: Array<BranchTextElement>,
      lastItem: BranchChoiceElement<BranchKey>
    ];

export type DialogueTree<BranchKey extends string | number | symbol = string> =
  {
    [key in BranchKey]: Branch<BranchKey>;
  };

export interface Choice<BranchKey> {
  label: string;
  text: string;
  next: BranchKey | Branch<BranchKey> | (() => BranchKey);
}
