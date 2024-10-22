# Playwright Personal Project

## Setting up environment

### Dependencies

1. Should have installed the following
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/package/npm)

2. Install dependencies

```bash
npm install
```
The list of dependencies is:

- [playwright](https://www.npmjs.com/package/playwright)

### Running

**Using UI**

To run the script of the demo web page saucedemo, execute the following

```bash
npm run test:all
```

When the UI system shows up, click on the "Play" icon in the left "Tests" side menu.

**Headless**

To run the script headless, execute the following

```bash
npm run test:headless
```

The result of the tests will be shown on the IDE terminal

## Naming Conventions

- Use `lowerCameCase` for variables, properties, object files and folder names.
- Use prefix like `is`, `are`, `has` for bool variables.
- Use self explanatory names for variables, E.g `let username`.
- Always start a function with a verb and the entity being affected by it, E.g `async checkObjectText`.
