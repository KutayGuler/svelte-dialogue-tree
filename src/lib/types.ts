export type BranchTextElement =
  | string
  | { text: string; onSpawn: Function }
  | (() => string)
  | (() => { text: string; onSpawn: Function });

export type BranchChoiceElement<BranchKey> =
  | Array<Choice<BranchKey>>
  | (() => Array<Choice<BranchKey>>);

export type Branch<BranchKey> =
  | Array<BranchTextElement>
  | [
      ...texts: Array<BranchTextElement>,
      lastItem: BranchChoiceElement<BranchKey>
    ];

export type DialogueTree<BranchKey extends string | number | symbol> = {
  [key in BranchKey]: Branch<BranchKey>;
};

export interface Choice<BranchKey> {
  header: string;
  text: string;
  next?:
    | BranchKey
    | Branch<BranchKey>
    // | (() => Branch)
    | (() => BranchKey);
}
