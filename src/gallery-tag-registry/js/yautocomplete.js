YUI.add('tag-yautocomplete', function(Y) {
    Y.namespace('Tag.Tags').yautocomplete = Y.Base.create('yautocomplete', Y.Base, [], {
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