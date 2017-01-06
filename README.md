# YUIDoc Ember Theme

[![npm version](https://badge.fury.io/js/yuidoc-ember-theme.svg)](http://badge.fury.io/js/yuidoc-ember-theme)

An EmberJS based [YUIDoc](http://yui.github.io/yuidoc/) theme

[**Live Example**](http://offirgolan.github.io/ember-cp-validations/docs)

```sh
$ npm install yuidoc-ember-theme
```

## Notes

- This theme is to be used with [ember-cli-yuidoc](https://github.com/cibernox/ember-cli-yuidoc) which uses
[git-repo-version](https://github.com/cibernox/git-repo-version) to generate the project version.

### Configuration File

If your project uses a "yuidoc.json" file for configuration, add:

```js
"themedir" : "node_modules/yuidoc-ember-theme",
"helpers" : ["node_modules/yuidoc-ember-theme/helpers/helpers.js"]
```

Example:

```json
{
    "name": "Example",
    "url": "<GITHUB REPO URL>",
    "version": "0.1.0",
    "hideVersionTag": true,
    "markdownDirectory": "docs",
    "options": {
        "paths": "_location to parse_",
        "outdir": "build/docs",
        "exclude": "lib,docs,build",
        "themedir": "node_modules/yuidoc-ember-theme",
        "helpers": ["node_modules/yuidoc-ember-theme/helpers/helpers.js"]
    }
}
```

### Markdown

To have the body of the index page be markdown, simply put your markdown in a folder and set ` "markdownDirectory": "docs"` in your `yuidoc.json`

This will output a concatenation of these markdown files onto the index page of your docs

For example:

```
.
+-- app.js
+-- docs
|   +-- 0_intro.md
|   +-- 1_more.md
|   +-- 2_footer.md
+-- yuidoc.json
```
