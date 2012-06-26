var Tag = Y.namespace('Tag'),
    handles = {};

function TagPlugin(config) {
    TagPlugin.superclass.constructor.apply(this, arguments);
}

TagPlugin.NAME = 'tagPlugin';
TagPlugin.NS = 'tag';
TagPlugin.TAGS = {};
TagPlugin.ATTRS = {
    name: {
        valueFn: function() {
            return (this.get('host').get('tagName') || '').toLowerCase();
        }
    }
};

TagPlugin.register = function(name, mixin) {
    TagPlugin.unregister(name);
    
    // Setup tag inserted listener
    function registerTag(mixin) {
        TagPlugin.TAGS[name] = mixin;

        handles[name] = Y.on('inserted', function(e) {
            e.target.fire('tag:inserted');
        }, name);
    }

    // Check if mixin is directly available otherwise load dynamically
    if (mixin) {
        registerTag(mixin);
    } else {
        Y.use('tag-' + name, function(Y) {
            if (Y.namespace('Tag.Tags')[name]) {
                registerTag(Y.namespace('Tag.Tags')[name]);
            }
        });
    }
};

TagPlugin.unregister = function(name) {
    if (handles[name] && TagPlugin.TAGS[name]) {
        handles[name].detach();
        delete handles[name];
        delete TagPlugin.TAGS[name];
    }
};

Y.extend(TagPlugin, Y.Plugin.Base, {
    initializer: function() {
        var mixin = TagPlugin.TAGS[this.get('name')];

        if (mixin) {
            Y.mix(this, mixin);

            if (mixin.created) {
                mixin.created.call(this, this.get('host').getData());
            }
        }
    }
});

Y.Node.plug(TagPlugin);

Tag.register = TagPlugin.register;