Y.Tag.register('ybind, [ybind]', {
    created: function(config) {
        var selector = config.ybind || this.get('host').getAttribute('ybind'),
            target = this,
            events = [];

        function createdHelper() {
            var setFn = config.set ? this.setValue : this.setHTML;
            target = selector ? Y.one(selector).tag : this;

            Y.each(config, function(dummy, name) {
                if (name.indexOf('on') === 0) {
                    events.push(name.substr(2));
                }
            });

            if (this === target) {
                this.addAttr('value', {getter: function() {
                    return this.get('host').get('value');
                }});
            }

            Y.Array.each(events, function(name) {
                this.onHostEvent(name, target[config['on' + name]] || this._ybindUpdate, target);
            }, this);

            if (config.ref) {
                target.on(config.ref + 'Change', setFn, this);
                setFn.call(this, {newVal: target.get(config.ref)});
            }
        }

        if (selector ? Y.one(selector).tag : this) {
            createdHelper.call(this);
        } else {
            setTimeout(Y.bind(createdHelper, this), 0);
        }
    },

    _ybindUpdate: function(e) {
        this.set('value', e.target.get('value'));
    },

    setHTML: function(e) {
        this.get('host').setHTML(e.newVal);
    },

    setValue: function(e) {
        this.get('host').set('value', e.newVal);
    },

    test: function() {

    }
});