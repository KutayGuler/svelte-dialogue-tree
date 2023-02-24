export type BranchTextElement =
  | string
  | { text: string; onSpawn: Function }
  | (() => string)
  | (() => { text: string; onSpawn: Function });

export type BranchChoiceElement<BranchKey> = Array<Choice<BranchKey>>;
// | (() => Array<Choice<BranchKey>>); // todo:

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

export type NextBranch<BranchKey> =
  | BranchKey
  | Branch<BranchKey>
  | (() => Branch<BranchKey>) // todo:
  | (() => BranchKey);

export interface Choice<BranchKey> {
  header: string;
  text: string;
  next?: NextBranch<BranchKey>;
}
