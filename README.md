# yuidoc-ember-theme

A simple [YUIDoc](http://yui.github.io/yuidoc/) theme. Based off [yuidoc-bootstrap-theme](https://github.com/kevinlacotaco/yuidoc-bootstrap-theme).

```sh
$ npm install yuidoc-ember-theme
```

[**Live Example**](http://offirgolan.github.io/ember-cp-validations/docs/modules/Home.html)

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
    "url": "www.example.com",
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
