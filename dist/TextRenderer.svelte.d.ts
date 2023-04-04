import { SvelteComponentTyped } from "svelte";
import type { TransitionConfig } from 'svelte/transition';
import type { CharacterCollection } from './types.js';
declare const __propDef: {
    props: {
        text: string;
        character?: string | undefined;
        characters: CharacterCollection<string> | undefined;
        npcContainerClass: string;
        npcTextClass: string;
        charContainerClass: string;
        charAvatarClass: string;
        charNameClass: string;
        npcIn: (node: Element, params: object) => TransitionConfig;
        npcInOptions: object;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextRendererProps = typeof __propDef.props;
export type TextRendererEvents = typeof __propDef.events;
export type TextRendererSlots = typeof __propDef.slots;
export default class TextRenderer extends SvelteComponentTyped<TextRendererProps, TextRendererEvents, TextRendererSlots> {
}
export {};
