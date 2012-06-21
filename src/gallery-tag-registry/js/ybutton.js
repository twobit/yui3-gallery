YUI.add('tag-ybutton', function(Y) {
    Y.namespace('Tag.Tags').ybutton = Y.Base.create('ybutton', Y.Base, [], {
        initializer: function() {
            var node = this.get('host');
            node.append('<div></div>');
            this._widget = new Y.Button(Y.merge(node.getData(), {srcNode: node.one('div')}));
            this.on('insert', function() {this._widget.render();}, this);
        }
    });
}, '', {requires: ['button']});