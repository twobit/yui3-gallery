YUI.add('gallery-tag', function(Y) {

var Tag = Y.namespace('Tag');

function TagPlugin(config) {
    TagPlugin.superclass.constructor.apply(this, arguments);
}

TagPlugin.NAME = 'tagPlugin';
TagPlugin.NS = 'tag';
TagPlugin.TAGS = [];
TagPlugin.ATTRS = {
    name: {
        valueFn: function() {
            return (this.get('host').get('tagName') || '').toLowerCase();
        }
    }
};

TagPlugin.listen = function(name) {
    Y.on('inserted', function(e) {
        e.target.fire('tag:inserted');
    }, name);
};

TagPlugin.register = function(name, mixin) {
    if (mixin) {
        TagPlugin.TAGS[name] = mixin;
        TagPlugin.listen(name);
    } else { // Need to load mixin
        Y.use('tag-' + name, function(Y) {
            if (Y.namespace('Tag.Tags')[name]) {
                TagPlugin.TAGS[name] = Y.namespace('Tag.Tags')[name];
                TagPlugin.listen(name);
            }
        });
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


}, '@VERSION@' ,{skinnable:false, requires:['node', 'base', 'plugin', 'gallery-event-inserted']});
