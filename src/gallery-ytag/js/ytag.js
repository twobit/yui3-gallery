xtag.namespace = 'y-';

function YTag(config) {
    YTag.superclass.constructor.apply(this, arguments);
}

YTag.NAME = 'ytag';

Y.extend(YTag, Y.Base, {
    initializer: function(config) {
        this.register(config.name, config.content, config.selector, config.requires, config.create);
    },

    register: function(name, content, selector, requires, create) {
        xtag.register(name, {
            content: content,
            onInsert: function() {
                Y.one(this).plug(YTagPlugin, {selector: selector, requires: requires, create: create});
            }
        });
    }
});

function YTagPlugin(config) {
    YTagPlugin.superclass.constructor.apply(this, arguments);
}

YTagPlugin.NAME = 'ytagPlugin';
YTagPlugin.NS = 'ytag';
YTagPlugin.ATTRS = {
    instance: {}
};

Y.extend(YTagPlugin, Y.Plugin.Base, {
    initializer: function(config) {
        var node = this.get('host'),
            dataset = Y.merge(node.getDOMNode().dataset, {
                srcNode: node.one(config.selector ? config.selector : '*'),
                render: true
            }),
            self = this;

        Y.use.apply(Y, config.requires.concat(function(Y) {
            self.set('instance', config.create(Y, dataset));
        }));
    }
});

Y.YTag = YTag;