Y.Tag.register('ybind, [ybind]', {
    created: function(config) {
        var node = Y.one(config.ybind || this.get('host').getAttribute('ybind')) || Y,
            events = [];

        Y.each(config, function(dummy, name) {
            if (name.indexOf('on') === 0) {
                events.push(name.substr(2));
            }
        });

        Y.Array.each(events, function(name) {
            node.on(name, this.update, this);
        }, this);
    },

    update: function(e) {
        this.get('host').setHTML(e.target.get('value'));
    }
});