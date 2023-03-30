# svelte-dialogue-tree

A Svelte library to create and interact with a branching dialogue.

## [Docs 📚](https://svelte-dialogue-tree.vercel.app/docs) | [Demos 💬](https://svelte-dialogue-tree.vercel.app/demos)

## Features

- Flexible tree schema 🎄
- Conditional branching 🌵
- Styleable Dialogue component 🎨
- Components as dialogue elements 🔶
- Typesafety option with generics 💙
- Characters 🧙
- ** Narration ** 🎭

## Installation

```
npm install svelte-dialogue-tree
```

```
pnpm add svelte-dialogue-tree
```

```
yarn add svelte-dialogue-tree
```

```
bun install svelte-dialogue-tree
```

## Usage

> If you want to use the default styles, import style.css in your layout file.

```
import 'svelte-dialogue-tree/style.css';
```

```
import { Dialogue } from 'svelte-dialogue-tree';
```

Pass a tree prop to Dialogue component. Check the schema for tree [here](https://svelte-dialogue-tree.vercel.app/docs#schema/)

```bash
<Dialogue {tree} />
```

## License

MIT
