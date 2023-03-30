// TODO: fix html rendering problem with anchor tags

export const typesData: Array<{
	title: string;
	description: string;
	code: string;
	highlightLines?: string;
}> = [
	{
		title: 'TextLeaf',
		description:
			'A TextLeaf can be in following types: <code>string</code>, <a href="#TextObject">TextObject<a/>, a function that returns a <code>string</code>, a function that returns a <a href="#TextObject">TextObject<a/>',
		code: `
// string
"something"

// narration string
"** something is being narrated **"

// HTML string
"<a href="/something">something</a>"

// TextObject
{ text: "something", character: "jason" }

// function that returns a string
() => "something" 

// function that returns a TextObject
() => { text: "something", character: "jason" }}
`
	},
	{
		title: 'TextObject',
		description:
			'A TextObject requires a <code>text</code> property and at least one (1) additional property.<br/> Additional properties are: <a href="#TextObject.onSpawn">onSpawn<a/> and <a href="#TextObject.character">character<a/>',
		code: `
// TextObject  
{ 
	text: "something",
	character: "jason"
}

// TextObject  
{ 
	text: "something",
	onSpawn: () => console.log("something spawned.")
}

// TextObject (it can have both of the additional properties)
{ 
	text: "something",
	character: "jason",
	onSpawn: () => console.log("something spawned.")
}
`
	},
	{
		title: 'TextObject.text',
		description: 'The string that will be displayed.',
		highlightLines: '12',
		code: `
let health = 100;

function fallFromCliff() {
  health -= 50;
}

const tree = {
  start: [
    "** You wake up near a cliff. **",
    { 
      text: "** You panic and fall from the cliff. **", 
      onSpawn: fallFromCliff 
    }
  ]
}`
	},
	{
		title: 'TextObject.onSpawn',
		description:
			'The function that is assigned to <code>onSpawn</code> is executed when the <a href="#TextObject">TextObject<a/><span>enters the DOM<span/>',
		highlightLines: '12',
		code: `
let health = 100;

function fallFromCliff() {
  health -= 50;
}

const tree = {
  start: [
    "** You wake up near a cliff. **",
    { 
      text: "** You panic and fall from the cliff. **", 
      onSpawn: fallFromCliff 
    }
  ]
}`
	},
	{
		title: 'TextObject.character',
		highlightLines: '13',
		description:
			'<code>character</code> should be a key of a <a  href="#CharacterCollection">CharacterCollection<a/>',
		code: `
const characters = {
  gotrek: {
    name: "Gotrek the Trollslayer",
    avatarSrc: "gotrek.jpg"
  }
}

const tree = {
  start: [
    "** You open your eyes and see a dwarf looking at you in disdain **",
    { 
      text: "Wake up, manling.",
      character: "gotrek" 
    }
  ]
}`
	},
	{
		title: 'CharacterCollection',
		description:
			'<code>CharacterCollection</code> is an object which holds CharacterKeys as keys and Characters as values',
		code: `
const characters = {
  gotrek: {
    name: "Gotrek the Trollslayer",
    avatarSrc: "gotrek.jpg"
  }
}

const tree = {
  start: [
    "** You open your eyes and see a dwarf looking at you in disdain **"
    { text: "Wake up, manling.", character: "gotrek" }
  ]
}`
	},
	{
		title: 'ComponentLeaf',
		description:
			'A ComponentLeaf requires a <code>component</code> property which accepts a Svelte component. The other property is the optional <code>args</code> property, which is passed to the given component as a destructured argument.',
		code: `
import { Component } from "./Component.svelte";

// ComponentLeaf
{
	component: Component,
	args: { // ❔ optional
		count: 5,
		color: "red"
	}
}
    `
	},
	{
		title: 'ChoiceLeaf',
		description:
			'A ChoiceLeaf can be an array of <a  href="#ChoiceObject">ChoiceObject<a/>s or a function that returns an array of <a  href="#ChoiceObject">ChoiceObject<a/>s',
		code: `
// ChoiceLeaf
[
	// ChoiceObject
	// ChoiceObject
]

// ChoiceLeaf
() => [
	// ChoiceObject
	// ChoiceObject
]
`
	},
	{
		title: 'ChoiceObject',
		description: '',
		code: `
{ 
	/** REQUIRED */
	label: "YES",
	text: "I think that's right",
	next: "yesBranch"

	/** OPTIONAL */
	titleTag: "some title"
	disabled: true 
}
`
	},
	{
		title: 'ChoiceObject.label',
		description: '<code>label</code> is the text that will appear on the choice button.',
		code: `

{ 
	// code
	label: "YES",
}
`
	},
	{
		title: 'ChoiceObject.text',
		description:
			'<code>text</code> is the content that will appear on the dialogue after choice is made.',
		code: `

{ 
	// code
	text: "I think so.",
}
`
	},
	{
		title: 'ChoiceObject.next',
		description:
			'<code>next</code> is the key of the branch dialogue will jump to. You can use <code>next</code> in three (3) different ways: <br/> <ol class="list"><li><span>1.</span><span>BranchKey</span><li><span>2.</span><span>A function that returns a BranchKey</span></li></li><li><span>3.</span><span>A nested branch</span></li></ol>',
		code: `
// (1) A BranchKey (string)
{
	// code
	next: "yesBranch"
}

// (2) A function that returns a BranchKey
{
	// code
	next: () => "yesBranch" 
}

// (3) A nested branch
{
	// code
	next: [
		"Great! Let's go bowling."
		"How would you like to go?"
		[
			{ 
				label: "🚗",
				text: "How about we take your Honda?", 
				next: [
					"Oh, it's actually broken. We can take a cab though."
				]
			},
			{ 
				label: "🚶‍♀️",
				text: "It's not that far, we can walk.", 
				next: [
					"Sure!"
					"Would you like to race?"
					[
						{       
							label: "YES",
							text: "I don't know. ** You start running **", 
							next: [
								"** You win **"
								// Nesting can go forever 
							]
						},
						{       
							label: "No",
							text: "Nah, I don't feel like it.", 
							next: [
								"** You don't race **"
								// Nesting can go forever 
							]
						}
					]
				] 
			},
			{ 
				label: "Cancel the date",
				text: "You know what? I forgot I had some things to do.", 
				next: "cancelBranch" 
			},
		]
	]
}
    `
	},
	{
		title: 'ChoiceObject.titleTag',
		description:
			'<code>titleTag</code> is the title that will appear when a mouse is hovered over the choice button.',
		code: `

// a string
{ 
	// code
	titleTag: "some title",
}

// or a function that returns a string
{ 
	// code
	titleTag: () => Math.random() < 0.5 ? "Not enough." : "Good enough.",
}
`
	},
	{
		title: 'ChoiceObject.disabled',
		description:
			'<code>disabled</code> determines whether the choice button is disabled or not. Can be boolean or a function that returns a boolean.',
		code: `

// boolean
{ 
	// code
	disabled: true,
}

// or a function that returns a boolean
{ 
	// code
	disabled: () => Math.random() < 0.5,
}
`
	}
];

export const propsData = [
	{
		name: 'tree',
		type: 'object',
		value: '-',
		description: 'Pass the DialogueTree object.',
		required: true
	},
	{
		name: 'characters',
		type: 'object',
		value: '{}',
		description: 'Pass the CharacterCollection object.',
		required: false
	},
	{
		name: 'containerClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for the container of Dialogue component.',
		required: false
	},
	{
		name: 'choiceContainerClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for the container of choices.',
		required: false
	},
	{
		name: 'choiceClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for individual choice buttons.',
		required: false
	},
	{
		name: 'playerTextClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for player replies.',
		required: false
	},
	{
		name: 'npcTextClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for NPC (Non-Player Character) replies.',
		required: false
	},
	{
		name: 'narrationClass',
		type: 'string',
		value: '-',
		description: 'Provide classes for narration texts.',
		required: false
	},
	{
		name: 'npcIn',
		type: 'Function',
		value: 'fly',
		description: 'Provide intro functions for npc replies.',
		required: false
	},
	{
		name: 'npcInOptions',
		type: 'object',
		value: '{ x: -200 }',
		description: 'Provide options object for the npc intro function.',
		required: false
	},
	{
		name: 'playerIn',
		type: 'Function',
		value: 'fly',
		description: 'Provide intro functions for player replies.',
		required: false
	},
	{
		name: 'playerInOptions',
		type: 'object',
		value: '{ x: 200 }',
		description: 'Provide options object for the player intro function.',
		required: false
	},
	{
		name: 'choiceIn',
		type: 'Function',
		value: 'scale',
		description: 'Provide intro functions for choice buttons.',
		required: false
	},
	{
		name: 'choiceInOptions',
		type: 'object',
		value: '{}',
		description: 'Provide options object for the choice button intro function.',
		required: false
	},
	{
		name: 'choiceStaggerGap',
		type: 'number',
		value: '200',
		description: 'Provide a number in ms for staggering button intro function.',
		required: false
	},
	{
		name: 'narrationIn',
		type: 'Function',
		value: 'scale',
		description: 'Provide intro functions for narration texts.',
		required: false
	},
	{
		name: 'narrationInOptions',
		type: 'object',
		value: '{}',
		description: 'Provide options object for the narration text intro function.',
		required: false
	},
	{
		name: 'nextLineKey',
		type: 'string',
		value: 'Space',
		description: 'Provide an event code to trigger next line.',
		required: false
	}
];

export const eventsData = [
	{
		name: 'dialogueEnd',
		detail: '-',
		description: 'Fires when dialogue has ended.'
	},
	{
		name: 'componentEvent',
		detail: 'user defined',
		description: 'Fires when a component dispatches componentEvent. '
	},
	{
		name: 'componentEnd',
		detail: 'user defined',
		description:
			'Fires when a component dispatches componentEnd. If a component enters the Dialogue, Dialogue will not continue until this event is fired.'
	}
];
