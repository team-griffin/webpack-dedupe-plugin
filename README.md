# @team-griffin/webpack-dudupe-plugin

[![npm version](https://badge.fury.io/js/%40team-griffin%2Fwebpack-dudupe-plugin.svg)](https://badge.fury.io/js/%40team-griffin%2Fwebpack-dudupe-plugin)

```sh
yarn add --dev @team-griffin/webpack-dudupe-plugin
npm i --save-dev @team-griffin/webpack-dudupe-plugin
pnpm i --save-dev @team-griffin/webpack-dudupe-plugin
```

*Note:* This project currently has webpack v4 as a peer dependency

## Why?

So node package managers such as yarn & npm cause a tonne of duplicate dependecies across child dependencies when your top level's dependency does not match.
An example of this is:

```
App:
  -- A@2.0.0
  -- B:
    -- A@1.0.0
  -- C:
    -- A@1.0.0
```

Due to how node's require algorithm works package managers are until to dedupe these packages, therefore you'll end up with 2 instances of A@1.0.0 in your webpack bundle.

## Usage

This plugin isn' a traditional webpack plugin due to really being a wrapper around an existing webpack plugin (NormalModuleReplacementPlugin).

```js
const createDedupe = require('@team-griffin/webpack-dudupe-plugin');

...

// webpack plugins
plugins: [
  createDedupe(),
],

```

## How does it work?

We leverage the webpack plugin `NormalModuleReplacementPlugin` to look at each import and replace any deduplicates with a "master".
Currently this only works on exact version matches.