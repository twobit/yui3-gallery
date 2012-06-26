YUI.add('tag-ybutton', function(Y) {
    Y.namespace('Tag.Tags').ybutton = {
        created: function(config) {
            var self = this;

            this._node = this.get('host').appendChild('<button></button>');
            this._widget = new Y.Button(Y.merge(config, {srcNode: this._node}));

            this.addAttr('label', {
                getter: function() {return self._widget.get('label');},
                setter: function(value) {self._widget.set('label', value);}
            });

            this.addAttr('disabled', {
                getter: function() {return self._widget.get('disabled');},
                setter: function(value) {self._widget.set('disabled', value);}
            });

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['button']});