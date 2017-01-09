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
    "indexModule": "Welcome",
    "externalDocs": [{
        "name": "ember-validators",
        "path": "node_modules/ember-validators",
        "url": "https://github.com/offirgolan/ember-validators",
        "version": "master"
    }],
    "options": {
        "paths": "_location to parse_",
        "outdir": "build/docs",
        "exclude": "lib,docs,build",
        "themedir": "node_modules/yuidoc-ember-theme",
        "helpers": ["node_modules/yuidoc-ember-theme/helpers/helpers.js"]
    }
}
```


## Index Module

If `indexModule` is speficied in your yuidoc.json, the page will be forwarded to that module when a user loads the index page.

```json
{
    "indexModule": "Welcome"
}
```

## External Docs

If you have external documentation taken from dependencies, you may list them under the `externalDocs` option in your yuidoc.json. Doing so will setup the correct file names and paths.

```json
{
    "externalDocs": [{
        "name": "ember-validators",
        "path": "node_modules/ember-validators",
        "url": "https://github.com/offirgolan/ember-validators",
        "version": "master"
    }]
}
```
