function YTag(config) {
    YTag.superclass.constructor.apply(this, arguments);
}

YTag.NAME = 'ytag';

Y.extend(YTag, Y.Base, {
    initializer: function(config) {
        var instance;

        xtag.register(config.name, {
            content: config.content,
            onInsert: function() {
                var config = Y.merge(this.dataset, {
                    srcNode: Y.one(this).one(config.selector ? config.selector : '*'),
                    render: true
                });

                Y.use.apply(Y, config.requires.concat(function(Y) {
                    instance = config.create(Y, config);
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

var REGISTRY = [
    {
        name: 'button',
        content: '<div></div>',
        requires: ['button'],
        create: function(Y, config) {
            return new Y.Button(config);
        }
    },
    {
        name: 'dial',
        content: '<div class="yui3-skin-sam"></div>',
        requires: ['dial'],
        create: function(Y, config) {
            return new Y.Dial(config);
        }
    },
    {
        name: 'suggest',
        content: '<div class="yui3-skin-sam"><input type="text" /></div>',
        selector: 'input',
        requires: ['autocomplete', 'autocomplete-highlighters'],
        create: function(Y, config) {
            config.srcNode.plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
            return config.srcNode;
        }
    }
];

xtag.namespace = 'y-';

Y.Array.each(REGISTRY, function(config) {
    new YTag(config);
});

Y.YTag = YTag;