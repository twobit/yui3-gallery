YUI.add('gallery-tag-registry', function(Y) {

YUI.add('tag-ybutton', function(Y) {
    Y.namespace('Tag.Tags').ybutton = Y.Base.create('ybutton', Y.Base, [], {
        initializer: function(config) {
            this._node = this.get('host').appendChild('<button></button>');
            this._widget = new Y.Button(Y.merge(config, {srcNode: this._node}));
            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    });
}, '', {requires: ['button']});
YUI.add('tag-ydial', function(Y) {
    Y.namespace('Tag.Tags').ydial = Y.Base.create('ydial', Y.Base, [], {
        initializer: function(config) {
            this._node = this.get('host').appendChild('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Dial(Y.merge(config, {srcNode: this._node}));
            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    });
}, '', {requires: ['dial']});
YUI.add('tag-yautocomplete', function(Y) {
    Y.namespace('Tag.Tags').yautocomplete = Y.Base.create('yautocomplete', Y.Base, [], {
        initializer: function(config) {
            this._node = this.get('host');
            this._node.append('<div class="yui3-skin-sam"><input type="text" /></div>');
            this._node.one('input').plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
        }
    });
}, '', {requires: ['autocomplete', 'autocomplete-highlighters']});
Y.Array.each(['ybutton', 'ydial', 'yautocomplete'], function(tag) {
    Y.Tag.register(tag);
});


}, '@VERSION@' ,{skinnable:false, requires:['gallery-tag']});
