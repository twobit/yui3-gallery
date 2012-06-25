YUI.add('tag-yautocomplete', function(Y) {
    Y.namespace('Tag.Tags').yautocomplete = {
        initializer: function(config) {
            this._node = this.get('host');
            this._node.append('<div class="yui3-skin-sam"><input type="text" /></div>');
            this._node.one('input').plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
        }
    };
}, '', {requires: ['autocomplete', 'autocomplete-highlighters']});