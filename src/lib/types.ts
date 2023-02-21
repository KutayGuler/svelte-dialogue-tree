export type Branch = [...texts: string[], lastItem: string | Array<Choice>];

export interface DialogueTree {
  [key: string]: Branch;
}

export interface Choice {
  text: string;
  next: keyof DialogueTree;
}
