module.exports = {
  publicClasses: function(context, options) {
    'use strict';
    var ret = "";

    for (var i = 0; i < context.length; i++) {
      if (!context[i].itemtype && context[i].access === 'public') {
        ret = ret + options.fn(context[i]);
      } else if (context[i].itemtype) {
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
    var version = this.projectVersion || '';
    if(version.charAt(0).toLowerCase() === 'v') {
      return version;
    } else {
      return version.split('.').pop();
    }
  }
};
