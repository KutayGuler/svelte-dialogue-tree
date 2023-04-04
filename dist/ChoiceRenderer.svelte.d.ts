import { SvelteComponentTyped } from "svelte";
import type { TransitionConfig } from 'svelte/transition';
import type { ChoiceObject } from './types.js';
declare const __propDef: {
    props: {
        choices: Array<ChoiceObject<string, string>>;
        choiceContainerClass: string;
        choiceClass: string;
        historyIndex: number;
        makeChoice: (e: SubmitEvent) => void;
        choiceIn: (node: Element, params: object) => TransitionConfig;
        choiceInOptions: object;
        choiceStaggerGap: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ChoiceRendererProps = typeof __propDef.props;
export type ChoiceRendererEvents = typeof __propDef.events;
export type ChoiceRendererSlots = typeof __propDef.slots;
export default class ChoiceRenderer extends SvelteComponentTyped<ChoiceRendererProps, ChoiceRendererEvents, ChoiceRendererSlots> {
}
export {};
