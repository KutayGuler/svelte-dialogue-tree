export type BranchElement<Keys> =
  | string
  | Array<Choice<Keys>>
  | { text: string; onSpawn: Function }
  | (() => string)
  | (() => Array<Choice<Keys>>)
  | (() => { text: string; onSpawn: Function });

export type Branch<BranchKey> = [
  ...texts: Array<BranchElement<BranchKey>>,
  lastItem: BranchElement<BranchKey>
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
