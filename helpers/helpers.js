var PROJECT;

module.exports = {
  log: function() {
    var slicedArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    console.log.apply(console, slicedArgs);
  },

  parseImport: function(item) {
    return item.replace(/^addon/, PROJECT.projectName).replace(/^app/, 'your-app-name').replace(/\.js$/, '');
  },

  setupGlobals: function() {
    PROJECT = this;
    return '';
  },

  setupClass: function() {
    var classes = this.classes;

    for(var i = 0; i < classes.length; i++) {
      if(classes[i].name === this.name) {
        this.isPrivate = !isPublic(classes[i]);
        break;
      }
    }
  },

  setupModule: function() {
    var self = this;
    var moduleClasses = [];

    this.classes.forEach(function(c) {
      if(c.module === self.name) {
        moduleClasses.push(c);
      }
    });

    this.filteredModuleClasses = moduleClasses;
  },

  isPrivate: function(context, options) {
    return isPublic(context) ? options.inverse(this) : options.fn(this);
  },

  publicClasses: function(context, options) {
    'use strict';
    var ret = "";

    for (var i = 0; i < context.length; i++) {
      if (isPublic(context[i])) {
        ret = ret + options.fn(context[i]);
      }
    }

    return ret;
  },

  /**
   * Hack for:
   * https://github.com/yui/yuidoc/issues/198
   *
   * Usage:
   *   {{#crossLinkWrapper type}}{{#crossLink type}}{{/crossLink}}{{/crossLinkWrapper}}
   */
  crossLinkWrapper: function(context, options) {
    if (!context) return '';
    var types_raw = context.split('|');
    var types_linked = options.fn(this).split('|');

    return types_raw.map(function(type, i) {
      if (/\[\]/.test(type)) {
        if (/<\/a>/.test(types_linked[i])) {
          return types_linked[i].replace('</a>', '[]</a>');
        } else {
          return types_linked[i].trim() + '[]';
        }
      } else {
        return types_linked[i];
      }
    }).join(' | ');
  },

  notEmpty: function(context, options) {
    'use strict';

    if(context && Array.isArray(context)) {
      return context.length > 0 ? options.fn(this) : options.inverse(this);
    } else {
      return (!context || !String(context).replace(/\s/g, '')) ? options.inverse(this) : options.fn(this);
    }
  },

  hasStaticMethods: function(context, options) {
    'use strict';
    var hasStatic = false;
    if (!context) return '';
    for (var i = 0; i < context.length; i++) {
      if (context[i]['static']) {
        hasStatic = true;
        break;
      }
    }
    if (hasStatic) {
      return options.fn(this);
    }
    return '';
  },

  hasInstanceMethods: function(context, options) {
    'use strict';
    var hasInstance = false;
    if (!context) return '';
    for (var i = 0; i < context.length; i++) {
      if (!context[i]['static']) {
        hasInstance = true;
        break;
      }
    }
    if (hasInstance) {
      return options.fn(this);
    }
    return '';
  },

  search: function(classes, modules) {
    'use strict';
    var ret = '';

    for (var i = 0; i < classes.length; i++) {
      if (i > 0) {
        ret += ', ';
      }
      ret += "\"" + 'classes/' + classes[i].displayName + "\"";
    }

    if (ret.length > 0 && modules.length > 0) {
      ret += ', ';
    }

    for (var j = 0; j < modules.length; j++) {
      if (j > 0) {
        ret += ', ';
      }
      ret += "\"" + 'modules/' + modules[j].displayName + "\"";
    }

    return ret;
  },

  or: function(a, b, options) {
    if(a || b) {
      return options.fn(this);
    }
    return '';
  },

  eq: function(v1, v2, options) {
    if(v1 == v2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  deEmberifiedName: function() {
    var name = this.projectName || '';

    var delimiter = name.indexOf('-') > -1 ? '-' : ' ';
    var segments = name.split(delimiter);

    if(segments[0].toLowerCase() === 'ember') {
      name = segments.slice(1, segments.length).join(delimiter).trim();
    }

    return name;
  },

  projectTag: function() {
    return getTagFromVersion(PROJECT.projectVersion);
  },

  githubFoundAt: function() {
    var meta = getFileMeta(this.file);
    return generateGhFileUrl(meta.url, meta.version, meta.file, this.line);
  },

  fileName: function() {
    var meta = getExternalFileMeta(this.file);
    return meta ? this.file.replace(new RegExp(meta.path, 'i'), meta.name) : this.file;
  },

  forwardToIndexModule: function() {
    return '<script type="text/javascript">' +
              'window.location.replace("modules/' + this.projectIndexModule + '.html");' +
           '</script>'
  }
};

function getTagFromVersion(version) {
  if (version === 'master' || version.charAt(0).toLowerCase() === 'v') {
    return version;
  } else {
    return version.split('.').pop();
  }
}

function isPublic(context) {
  return context.itemtype || (!context.itemtype && context.access === 'public');
}

function getFileMeta(file) {
  var externalMeta = getExternalFileMeta(file)

  if (externalMeta) {
    return {
      file: file.replace(new RegExp(externalMeta.path, 'i'), ''),
      version: getTagFromVersion(externalMeta.version),
      url: externalMeta.url
    };
  } else {
    return {
      file: file,
      version: getTagFromVersion(PROJECT.projectVersion),
      url: PROJECT.projectUrl
    };
  }
}

function getExternalFileMeta(file) {
  var externalDocs = PROJECT.projectExternalDocs || [];

  return externalDocs.find(function(externalDoc) {
    return !!(file || '').match(new RegExp(externalDoc.path, 'i'));
  });
}

function generateGhFileUrl(baseUrl, version, file, line) {
  return baseUrl + '/blob/' + version + '/' + file + '#L' + line;
}
