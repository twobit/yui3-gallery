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
                var config = Y.merge(this.dataset, {
                        srcNode: Y.one(this).one(selector ? selector : '*'),
                        render: true
                    });

                Y.use.apply(Y, requires.concat(function(Y) {
                    instance = create(Y, config);
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

Y.YTag = YTag;