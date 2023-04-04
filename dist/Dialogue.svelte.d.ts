import { SvelteComponentTyped } from "svelte";
import type { DialogueTree, CharacterCollection } from './types.js';
import { type TransitionConfig } from 'svelte/transition';
declare const __propDef: {
    props: {
        tree: DialogueTree<string, string>;
        characters?: CharacterCollection<string> | undefined;
        containerClass?: string | undefined;
        choiceContainerClass?: string | undefined;
        choiceClass?: string | undefined;
        playerTextClass?: string | undefined;
        npcContainerClass?: string | undefined;
        npcTextClass?: string | undefined;
        charContainerClass?: string | undefined;
        charAvatarClass?: string | undefined;
        charNameClass?: string | undefined;
        narrationClass?: string | undefined;
        jumperClass?: string | undefined;
        jumperText?: string | undefined;
        nextLineKey?: string | undefined;
        /**
             * This function mutates history
             * before the data is presented
             */ nextLine?: (() => void) | undefined;
        npcIn?: ((node: Element, params: object) => TransitionConfig) | undefined;
        npcInOptions?: object | undefined;
        playerIn?: ((node: Element, params: object) => TransitionConfig) | undefined;
        playerInOptions?: object | undefined;
        choiceIn?: ((node: Element, params: object) => TransitionConfig) | undefined;
        choiceInOptions?: object | undefined;
        choiceStaggerGap?: number | undefined;
        narrationIn?: ((node: Element, params: object) => TransitionConfig) | undefined;
        narrationInOptions?: object | undefined;
    };
    events: {
        componentEvent: any;
        componentEnd: CustomEvent<any>;
        dialogueEnd: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DialogueProps = typeof __propDef.props;
export type DialogueEvents = typeof __propDef.events;
export type DialogueSlots = typeof __propDef.slots;
export default class Dialogue extends SvelteComponentTyped<DialogueProps, DialogueEvents, DialogueSlots> {
    get nextLine(): () => void;
}
export {};
