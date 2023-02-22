export type BranchElement =
  | string
  | { text: string; onSpawn: Function }
  | (() => string)
  | (() => { text: string; onSpawn: Function });

export type Branch = [
  ...texts: Array<BranchElement>,
  lastItem: BranchElement | Array<Choice>
];

export interface DialogueTree {
  [key: string]: Branch;
}

export interface Choice {
  header: string;
  text: string;
  next:
    | keyof DialogueTree
    | Branch
    // | (() => Branch)
    | (() => keyof DialogueTree);
}
