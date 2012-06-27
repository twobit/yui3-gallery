var Tag = Y.namespace('Tag'),
    tags = {};

Tag.register = function(name, mixin) {
    Tag.unregister(name);

    tags[name] = {
        mixin: mixin,
        handle: Y.on('inserted', function(e) {
            e.target.fire('tag:inserted');
        }, name)
    };
};

Tag.unregister = function(name) {
    if (tags[name]) {
        tags[name].handle.detach();
        delete tags[name];
    }
};

Tag.registered = function(name) {
    return name ? tags[name] : Object.keys(tags);
};

function TagPlugin(config) {
    TagPlugin.superclass.constructor.apply(this, arguments);
}

TagPlugin.NAME = 'tagPlugin';
TagPlugin.NS = 'tag';
TagPlugin.ATTRS = {
    name: {
        valueFn: function() {
            return (this.get('host').get('tagName') || '').toLowerCase();
        }
    }
};

Y.extend(TagPlugin, Y.Plugin.Base, {
    initializer: function() {
        var tag = tags[this.get('name')];
        
        if (!tag) {return;}

        Y.mix(this, tag.mixin);

        if (tag.mixin.created) {
            tag.mixin.created.call(this, this.get('host').getData());
        }
    }
});

Y.Node.plug(TagPlugin);