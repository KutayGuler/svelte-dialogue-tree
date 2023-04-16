export const restaurantCode = `<script lang="ts">
  import type { CharacterCollection, ChoiceObject, DialogueTree } from 'svelte-dialogue-tree';
  import { Dialogue } from 'svelte-dialogue-tree';

  let menu = ['🥧', '🍕', '🥣', '🍔'];
  let inventory = ['🥧', '🍕']; //  "🥣", "🍔"
  let orderedItem = '';

  function itemExists(item: string): boolean {
    return inventory.includes(item);
  }

  function consumeOrderedItem() {
    inventory = inventory.filter((x) => x != orderedItem);
  }

  function listAvailableItems(): Array<ChoiceObject<BranchKey, CharacterKey>> {
    let choices: Array<ChoiceObject<BranchKey, CharacterKey>> = [];
    for (let item of menu) {
      choices.push({
        label: item,
        text: \`I would like to have a \${item}\`,
        titleTag: () =>
          !itemExists(item)
            ? \`The restaurant does not have any \${item}s left\`
            : \`Click to order \${item}\`,
        disabled: () => !itemExists(item),
        next: () => {
          orderedItem = item;
          return itemExists(item) ? 'success' : 'failure';
        }
      });
    }
    choices.push({
      label: 'cancel',
      text: 'Nevermind',
      next: 'cancel'
    });
    return choices;
  }

  function bringOrderedItem() {
    return {
      text: \`** A few minutes pass ** Your order is ready. Bon appetite! **Puts \${orderedItem} on the table **\`,
      onSpawn: consumeOrderedItem
    };
  }

  function orderOrLeave(): Array<ChoiceObject<BranchKey, CharacterKey>> {
    return [
      {
        label: 'Order another one',
        text: 'I would like to make an order',
        next: 'start'
      },
      { label: 'Leave', text: '**You leave**', next: [] }
    ];
  }

  type BranchKey = 'start' | 'success' | 'failure' | 'cancel';
  type CharacterKey = 'cook';

  const characters: CharacterCollection<CharacterKey> = {
    cook: {
      name: 'Cook',
      avatarSrc: 'https://picsum.photos/200/300'
    }
  };

  const tree: DialogueTree<BranchKey, CharacterKey> = {
    start: [{ text: 'What would you like to have?', character: 'cook' }, listAvailableItems],
    success: [{ text: 'Coming right up!', character: 'cook' }, bringOrderedItem, orderOrLeave],
    failure: [
      {
        text: 'We are fresh out of that, Would you like to have something else',
        character: 'cook'
      },
      orderOrLeave
    ],
    cancel: [
      {
        text: 'Let me know if you need anything else.',
        character: 'cook'
      },
      orderOrLeave
    ]
  };
<\/script>

<Dialogue {tree} {characters} on:dialogueEnd={() => console.log('dialogue ended')} />
`;

export const roleplayCode = `<script lang="ts">
  import { Dialogue } from 'svelte-dialogue-tree';
  import type { DialogueTree } from 'svelte-dialogue-tree';
  import Roll from './Roll.svelte';

  type BranchKey = 'start' | 'success' | 'failure';
  let diceResult = 0;

  function branchDialogue(): BranchKey {
    return diceResult > 6 ? 'success' : 'failure';
  }

  const tree: DialogueTree<BranchKey> = {
    start: ['** You fall off from a cliff. **', { component: Roll }, branchDialogue],
    success: ['** You survived. **'],
    failure: ['** You died. **']
  };
</script>

<Dialogue
  {tree}
  on:dialogueEnd={() => console.log('dialogue ended')}
  on:componentEnd={(e) => {
    diceResult = e.detail.result;
  }}
/>
`;

export const htmlCode = `<script lang="ts">
  import { Dialogue } from 'svelte-dialogue-tree';
  import type { DialogueTree } from 'svelte-dialogue-tree';

  const tree: DialogueTree<'start'> = {
    start: [
      \`Check out the repo <a style="color: red;" href="https://github.com/KutayGuler/svelte-dialogue-tree" target="_blank" rel="noreferrer">here</a>\`
    ]
  };
</script>

<Dialogue {tree} on:dialogueEnd={() => console.log('dialogue ended')} />
`;

export const cyberpunkCode = `<script lang="ts">
import { Dialogue, type CharacterCollection, type DialogueTree } from 'svelte-dialogue-tree';

type BranchKey = 'start' | 'showChip' | 'sentByShawn' | 'drawWeapon' | 'moveIt';
type CharacterKey = 'royce' | 'jackie' | 'dumdum';

const characters: CharacterCollection<CharacterKey> = {
  royce: {
    name: 'Royce:',
    avatarSrc: 'royce2.png'
  },
  jackie: {
    name: 'Jackie:',
    avatarSrc: 'jackie.png'
  },
  dumdum: {
    name: 'Dum Dum:',
    avatarSrc: 'dumdum2.png'
  }
};

const tree: DialogueTree<BranchKey, CharacterKey> = {
  start: [
    {
      text: 'Two questions.',
      character: 'royce'
    },
    'What the fuck is going on? And who the fuck is this?',
    '** Royce and his men draw their weapons. **',
    [
      {
        label: 'Eddies are on this chip.',
        text: 'Got fifty large on this credchip.',
        next: 'showChip'
      },
      { label: 'Fuck you', text: '...', next: [], disabled: true },
      { label: 'Draw weapon', text: '...', next: [], disabled: true }
    ]
  ],
  showChip: [
    '** You show the credchip. **',
    {
      text: 'And you positively reek of Militech.',
      character: 'royce'
    },
    [
      {
        label: 'Dex sent me',
        text: 'Dexter DeShawn sent me.',
        next: 'sentByShawn'
      },
      { label: 'I am my own boss', text: '...', next: [], disabled: true }
    ]
  ],
  sentByShawn: [
    {
      text: 'Dexter DeShawn...',
      character: 'royce'
    },
    'Dreads? Gold-plate? Fat old fuck - that him?',
    {
      text: 'Hahahahaha...',
      character: 'dumdum'
    },
    [
      {
        label: 'Draw weapon',
        text: '** You draw your weapon. **',
        next: 'drawWeapon'
      }
    ]
  ],
  drawWeapon: [
    {
      text: 'We will pay for the bot and be on our way.',
      character: 'jackie'
    },
    {
      text: 'How much you say you had? 50k?',
      character: 'royce'
    },
    [
      {
        label: 'Fund is right here',
        text: 'Creds on this.',
        next: 'moveIt'
      }
    ]
  ],
  moveIt: [
    '** You give the credchip. **',
    '** Everyone lower their guards. **',
    {
      text: 'Move it.',
      character: 'royce'
    },
    {
      text: 'Woo! Not the smoothest of deals, but it worked out in the end right?',
      character: 'dumdum'
    },
    'Flathead is good gear. It will do the trick, whatever that trick is.',
    '** Lights go flickering in the building. **',
    {
      text: "Shit shit shit! Chip's got a vector, they are breaking in!",
      character: 'royce'
    },
    '** All electronics fail, the room goes dark. **',
    {
      text: "Knew I smelled Militech. Zero 'em now!",
      character: 'royce'
    },
    '** Guns go blazing. **'
  ]
};
</script>

<Dialogue
{tree}
{characters}
containerClass="cyberpunk-container flex flex-col h-full w-full p-4"
charNameClass="cyberpunk-char-name"
npcContainerClass="flex flex-row gap-2 "
npcTextClass="bg-transparent"
playerTextClass="bg-transparent self-end mr-4"
charAvatarClass="w-8 h-8 border border-black"
narrationClass="text-[#f9f002] self-center py-4"
choiceContainerClass="flex flex-col gap-2 items-center"
choiceClass="cyberpunk-choice bg-[#f9f002]"
on:dialogueEnd={() => console.log('dialogue ended')}
/>

<style>
:global(.cyberpunk-container) {
  --blue: #37ebf3;
  font-family: Cyberpunk;
  font-size: 1.5rem;
  color: var(--blue);
  overflow-y: auto;
  overflow-x: hidden;
}

:global(.cyberpunk-char-name) {
  --red: #fc3047;
  text-shadow: 0 0 7px var(--red), 0 0 10px var(--red), 0 0 21px var(--red);
  color: var(--red);
}

:global(.cyberpunk-choice) {
  --bg: #f9f002;
  color: black;
  font-weight: 600;
  border-right: black 2px solid;
  border-bottom: black 2px solid;
  width: 320px;
  padding: 8px;
}

:global(.cyberpunk-choice:hover, .cyberpunk-choice:focus) {
  box-shadow: 0 0 7px var(--bg), 0 0 10px var(--bg), 0 0 21px var(--bg);
  outline: none;
}
</style>

`;
