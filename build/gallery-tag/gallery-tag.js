YUI.add('gallery-tag', function(Y) {

/**
 * Provides methods for registering mixins with types of Nodes.
 *
 * @module gallery-tag
 */
var Tag = Y.namespace('Tag'),
    registered = {},
    has_attrs = false; // Attribute support is a slower code path

/**
 * @method register
 * @description N/A
 * @param {string} name N/A
 * @param {object} mixin N/A
 */
Tag.register = function(name, mixin) {
    name = name.toLowerCase();

    if (name.indexOf('[')) {
        has_attrs = true;
    }

    registered[name] = {
        mixin: mixin,
        handle: Y.on('inserted', function(e) {
            e.target.fire('tag:inserted');
        }, name)
    };
};

/**
 * @method unregister
 * @description N/A
 * @param {string} name N/A
 */
Tag.unregister = function(name) {
    name = name.toLowerCase();
    if (registered[name]) {
        registered[name].handle.detach();
        delete registered[name];
    }
};

/**
 * @method registered
 * @description N/A
 * @param {string} name N/A
 */
Tag.registered = function(name) {
    name = name.toLowerCase();
    return name ? name in registered : Object.keys(registered);
};

function TagPlugin(config) {
    TagPlugin.superclass.constructor.apply(this, arguments);
}

TagPlugin.NAME = 'tagPlugin';
TagPlugin.NS = 'tag';
TagPlugin.ATTRS = {};

// YUI doesn't properly camelize data attrs (#2532464)
function groupAttrs(raw) {
    var attrs = {
        grouped: {
            data: {}
        },
        ungrouped: {}
    };

    // Helper to camelize names
    function formatName(name) {
        return name.replace(/-([a-z])/g, function(s, l) {return l.toUpperCase();});
    }

    // Helper to parse ints
    function formatValue(value) {
        var match = /^i:(-?[0-9]+)$/.exec(value);

        if (match) {
            return parseInt(match[1], 10);
        }

        return value;
    }

    Y.Array.each(raw, function(attr) {
        var name = attr.name,
            value = attr.value,
            data = 'data-',
            index = name.indexOf(':'),
            group;

        if (name.indexOf(data) === 0) { // data attributes
            name = formatName(name.substr(data.length));
            attrs.grouped.data[name] = formatValue(value);
        } else if (index >= 0) {    // namespaced attributes (x:y)
            group = name.substr(0, index);
            if (!attrs.grouped[group]) {attrs.grouped[group] = {};}
            name = formatName(name.substr(index + 1));
            attrs.grouped[group][name] = formatValue(value);
        }
        else {
            attrs.ungrouped[name] = formatValue(value);
        }
    });

    return attrs;
}

Y.extend(TagPlugin, Y.Plugin.Base, {
    // This function needs to be fast since it gets called on Node creation.
    initializer: function() {
        var host = this.get('host'),
            tag = (host.get('tagName') || '').toLowerCase(),
            mixins = [],
            attrs;

        // Look for a registered tag
        if (registered[tag]) {
            attrs = attrs || groupAttrs(host.getDOMNode().attributes);
            mixins.push({obj: registered[tag].mixin, config: attrs.grouped.data});
        }

        if (has_attrs) {
            attrs = attrs || groupAttrs(host.getDOMNode().attributes);
            // Look for a registered attribute
            Y.each(attrs.ungrouped, function(dummy, attr) {
                var selector = '[' + attr + ']';
                if (selector in registered) {
                    mixins.push({obj: registered[selector].mixin, config: attrs.grouped[attr] || {}});
                }
            });
        }

        if (mixins.length) {
            Y.Array.each(mixins, function(mixin) {
                Y.mix(this, mixin.obj);

                if (mixin.obj.created) {
                    mixin.obj.created.call(this, mixin.config);
                }
            }, this);
        }
    }
});

Y.Node.plug(TagPlugin);


}, '@VERSION@' ,{skinnable:false, requires:['node', 'base', 'plugin', 'gallery-event-inserted']});
