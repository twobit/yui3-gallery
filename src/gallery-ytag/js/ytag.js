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
        var instance;

        xtag.register(name, {
            content: content,
            onInsert: function() {
                var node = Y.one(this),
                    config = Y.merge(this.dataset, {
                        srcNode: node.one(selector ? selector : '*'),
                        render: true
                    });

                Y.use.apply(Y, requires.concat(function(Y) {
                    instance = create(Y, config);
                    node.plug(YTagPlugin, {instance: instance});
                }));
            },
            getters: {
                ytag: function() {
                    return instance;
                }
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
        this.set('instance', config.instance);
    }
});

Y.YTag = YTag;