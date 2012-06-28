YUI.add('tag-ybind', function(Y) {

Y.Tag.register('ybind', {
    created: function(config) {
        var node = this.get('host');

        if (config.on === 'valuechange') {
            node = node.one('input, textarea');
        }

        node.on(config.on, function(e) {
            Y.fire('target:' + config.name, e.target.get('value'));
        });

        if (config.init) {
            setTimeout(function() {
                Y.fire('target:' + config.name, config.init);
            }, 0);
        }
    }
});

Y.Tag.register('ytarget', {
    created: function(config) {
        Y.on('target:' + config.name, function(value) {
            this.get('host').setHTML(value);
        }, this);
    }
});


}, '@VERSION@' ,{requires:['gallery-tag', 'event']});
