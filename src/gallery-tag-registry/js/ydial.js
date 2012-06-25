YUI.add('tag-ydial', function(Y) {
    Y.namespace('Tag.Tags').ydial = {
        initializer: function(config) {
            this._node = this.get('host').appendChild('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Dial(Y.merge(config, {srcNode: this._node}));
            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '', {requires: ['dial']});