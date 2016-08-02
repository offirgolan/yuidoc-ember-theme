# YUIDoc Ember Theme

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
    "options": {
        "paths": "_location to parse_",
        "outdir": "build/docs",
        "exclude": "lib,docs,build",
        "themedir": "node_modules/yuidoc-ember-theme",
        "helpers": ["node_modules/yuidoc-ember-theme/helpers/helpers.js"]
    }
}
```
