# @bin-ntc/bin-utils

## 🧰 Lightweight, Modern Utility Functions for JavaScript & TypeScript

`@bin-ntc/bin-utils` is a zero-dependency utility library providing the most commonly-used helper functions for objects, arrays, strings, dates, async operations, and validation — all fully typed and tree-shakeable.

Perfect for any JavaScript/TypeScript project that needs clean, reusable utilities without the bloat.

---

## 🚀 Features

- ⚡ **Zero dependencies** — small, fast, reliable
- 🧠 **TypeScript-first** — excellent typings
- 🎯 **Utility-based** — import only what you need
- 📦 **Covers everyday scenarios**
  - Object utilities
  - Array helpers
  - String formatting
  - Date helpers
  - Async patterns
  - Validation tools

---

## 📦 Installation

```bash
npm install @bin-ntc/bin-utils
# or
yarn add @bin-ntc/bin-utils
# or
pnpm add @bin-ntc/bin-utils
```

## 📚 Usage

Import only the utilities you need:

```ts
import { unique, pick, retry, toCamelCase } from '@bin-ntc/bin-utils';
```

### 🧠 Code Examples

#### 1. Deep merging objects

```ts
import { deepMerge } from '@bin-ntc/bin-utils';

const a = { user: { name: 'John', roles: ['admin'] } };
const b = { user: { roles: ['editor'] } };

deepMerge(a, b);
// Result: { user: { name: "John", roles: ["admin", "editor"] } }
```

#### 2. Safe async handling

```ts
import { to } from "@bin-ntc/bin-utils";

const [err, user] = await to(fetchUser());

#### 3. Group items
import { groupBy } from "@bin-ntc/bin-utils";

const users = [
  { type: "admin", name: "A" },
  { type: "user", name: "B" },
  { type: "admin", name: "C" }
];

groupBy(users, u => u.type);
```

#### 4. Format a date

```ts
import { formatDate } from '@bin-ntc/bin-utils';

formatDate(new Date(), 'vi-VN'); // "01/02/2025"
```

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome!
Feel free to open an issue or create a pull request.

## ⭐ Support

If this package helps you, please consider:

- 🌟 Giving the repo a star
- 📦 Using it in your real projects
- 🗣 Sharing your feedback or ideas
  Your support helps keep this project alive.
