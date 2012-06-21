YUI.add('gallery-tag-registry', function(Y) {

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

YUI.add('tag-ysuggest', function(Y) {
    Y.namespace('Tag.Tags').ysuggest = Y.Base.create('ysuggest', Y.Base, [], {
        initializer: function() {
            var node = this.get('host');
            node.append('<div class="yui3-skin-sam"><input type="text" /></div>');
            node.one('input').plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
        }
    });
}, '', {requires: ['autocomplete', 'autocomplete-highlighters']});

Y.Tag.register('ybutton');
Y.Tag.register('ydial');
Y.Tag.register('ysuggest');


}, '@VERSION@' ,{skinnable:false, requires:['gallery-tag']});
