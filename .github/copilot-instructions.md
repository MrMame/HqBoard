# Copilot / AI agent instructions — HqBoard

Purpose: help AI coding agents become productive quickly in this small client-side TypeScript project.

Big picture
- **Runtime**: browser-only, single-page editor (no backend). Entry is the HTML at [www/index.html](www/index.html).
- **Build**: TypeScript source lives under [www/scripts](www/scripts); `npx tsc` (or `npm run build`) compiles `.ts` → `.js` into the same folder per `tsconfig.json`.
- **Main flow**: `www/scripts/main.ts` builds the grid, handles UI interactions and creates DOM elements. Persistence (XML load/save) lives in `www/scripts/Domain/BoardStorageService.ts`.

How to build & run
- Install dev deps: dependencies are only dev-time: TypeScript. Use `npm install` then `npm run build` to compile.
- Open `www/index.html` in a browser. NOTE: `tsconfig.json` uses `module: "ES6"` and the code uses `import`/`export` — ensure the generated `www/scripts/main.js` is loaded with `<script type="module" src="./scripts/main.js"></script>` in [www/index.html](www/index.html#L1-L20) or change `tsconfig.json` to compile to a non-module target or bundle.
- Source maps: enabled (`sourceMap: true`) so use Chrome/Edge DevTools to step through the original `.ts` files.

Project-specific conventions & patterns
- No framework: DOM-manipulation is imperative (createElement, appendChild). Use existing patterns in `main.ts` (drag/drop, dataset for x/y/type, classes `cell`, `placed`).
- Naming: some comments and UI labels are in German (e.g., `Abenteuerbeschreibung`), so keep messages consistent when editing UI text.
- Global instance exposure: `main.ts` creates `boardStorageService` and `index.html` calls `boardStorageService.saveXML()` from a button `onclick`. If you change module loading to ES modules, ensure the service is exposed to the global scope or change the HTML usage to work with modules.
- XML representation: objects are saved as `<object type="..." x="..." y="..." .../>`. See `BoardStorageService.saveXML()` for exact format and `loadXML()` for parsing logic.

Integration points & common pitfalls
- HTML ↔ TS: `index.html` expects DOM globals like `#board`, `#descriptionText`, `#loadFile`. Changing IDs must be mirrored in code.
- Module vs script mismatch: the project currently compiles ES modules but `index.html` doesn't use `type="module"`. Either add `type="module"` to the script tag or compile to a non-module bundle. This is the most frequent runtime problem.
- Save button mismatch: `index.html` triggers `boardStorageService.saveXML()` without an argument while `BoardStorageService.saveXML` accepts a `descriptionText` parameter. When editing save/load flows, verify parameter usage and the global variable binding.

Files to inspect for changes
- UI / app logic: [www/scripts/main.ts](www/scripts/main.ts)
- Persistence / XML: [www/scripts/Domain/BoardStorageService.ts](www/scripts/Domain/BoardStorageService.ts)
- Page skeleton: [www/index.html](www/index.html)
- Build config: [package.json](package.json) and [tsconfig.json](tsconfig.json)

Developer workflows
- Build: `npm run build` (runs `npx tsc`).
- Debug: open browser with DevTools (source maps enabled). If edits to module format are made, re-run `npm run build`.

What to avoid / be careful about
- Don't assume any server-side environment or bundler is present. Changes that introduce bundling (webpack, rollup, vite) are fine but update `index.html` and README accordingly.
- Keep DOM selectors and `data-*` attributes stable (e.g., `data-type`, `data-x`, `data-y`) because multiple functions rely on them.

If you make a change, include these quick sanity checks in the PR
- Does `npm run build` succeed and produce `www/scripts/main.js` and source maps?
- Can the browser open `www/index.html` and create the grid (19x26) without console errors?
- Saving and loading an XML file should not throw exceptions; test with a small map.

If anything in this file is unclear, tell me which area (build, runtime, XML format, or DOM conventions) you want expanded.
