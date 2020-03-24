scss-theo-importer
==================

Basic importer for using Theo design token files directly in Sass

## Intention

Design tokens are great - but they are better when they can be used invisibly by
a variety of consumers. This Sass importer allows you to import design token files
(either yml or json), formatted according to https://github.com/salesforce-ux/theo,
directly in Sass, with the tokens converted into Sass variables.

## Installation

```bash
npm install scss-theo-importer
```

## Usage

```js
// .sassrc.js

const theoImporter = require('scss-theo-importer')

module.exports = {
	importer: [theoImporter()],
}
```

```yml
# src/tokens/_color.theo.yml

props:
    color-background:
        value: '{!gray}'
aliases:
    gray: '#eff4f6'
global:
    type: color
    category: color


# src/tokens/index.theo.yml

imports:
  - ./_color.theo.scss
```

```scss
// src/app.scss

@import './tokens/index.theo.yml';

body {
	background-color: $color-background;
}
```

## Options

The `theoImporter` function takes an optional object argument with the following
possible props:

### `opts.matcher`

The regex used to match token filenames
 - type: `RegExp`
 - default: `/\.theo\.(ya?ml|json)$/`

### `opts.transform`

The transform passed to the underlying Theo conversion (`file` is added dynamically)

 - type: see https://github.com/salesforce-ux/theo#transforms
 - default: `{type: 'web'}`

### `opts.format`

The format passed to the underlying Theo conversion

 - type: see https://github.com/salesforce-ux/theo#formats
 - default: `{ type: 'default.scss' }`
