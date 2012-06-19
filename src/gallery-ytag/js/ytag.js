var YTag = Y.namespace('YTag');

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

function register(config) {
    Y.on('inserted', function(e) {
        var node = e.target;

        if (config.content) {
            node.append(config.content);
        }

        node.plug(YTagPlugin, {selector: config.selector, requires: config.requires, create: config.create});
    }, 'y-' + config.name);
}

YTag.register = register;