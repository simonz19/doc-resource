# requirejs in Node

## require.main

When a file is run directly from Node.js, `require.main` is set to its module. That means that it is possible to determine whether a file has been run directly by testing `require.main` === module.

For a file foo.js, this will be true if run via node foo.js, but false if run by require('./foo').

## require.resolve

Use the internal require() machinery to look up the location of a module, but rather than loading the module, just return the resolved filename.

## require(xxx).default (by babel)

nodejs is not totally support es6, such as `import` and `export`, to use babel compile these syntax can totally fix this problem, but Babel@6 doesn't export default `module.exports` any more

Babel@6 transforms the following file

```javascript
export default "foo"; // es6
```

into

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "foo";
```

Therefore, it is a need to use the ugly .default in node.js.

```javascript
require("./bundle.js"); // { default: 'foo' }
require("./bundle.js").default; // 'foo'
```
> a babel plugin called `babel-plugin-add-module-exports` can make babel export default agin;

## require.ensure (by webpack)

for `code spliting`, webpack will create independent bundle js files rather than integrate them together.
