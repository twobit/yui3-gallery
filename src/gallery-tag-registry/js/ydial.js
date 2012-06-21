YUI.add('tag-ydial', function(Y) {
    Y.namespace('Tag.Tags').ydial = Y.Base.create('ydial', Y.Base, [], {
        initializer: function() {
            var node = this.get('host');
            node.append('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Dial(Y.merge(node.getData(), {srcNode: node.one('div')}));
            this.on('insert', function() {this._widget.render();}, this);
        }
    });
}, '', {requires: ['dial']});