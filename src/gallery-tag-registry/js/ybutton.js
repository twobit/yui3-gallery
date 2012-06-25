YUI.add('tag-ybutton', function(Y) {
    Y.namespace('Tag.Tags').ybutton = Y.Base.create('ybutton', Y.Base, [], {
        initializer: function(config) {
            this._node = this.get('host').appendChild('<button></button>');
            this._widget = new Y.Button(Y.merge(config, {srcNode: this._node}));
            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    });
}, '', {requires: ['button']});