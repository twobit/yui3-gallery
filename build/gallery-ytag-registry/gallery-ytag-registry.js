YUI.add('gallery-ytag-registry', function(Y) {

var REGISTRY = [
    {
        name: 'button',
        content: '<div></div>',
        requires: ['button'],
        create: function(Y, config) {
            return new Y.Button(config);
        }
    },
    {
        name: 'dial',
        content: '<div class="yui3-skin-sam"></div>',
        requires: ['dial'],
        create: function(Y, config) {
            return new Y.Dial(config);
        }
    },
    {
        name: 'suggest',
        content: '<div class="yui3-skin-sam"><input type="text" /></div>',
        selector: 'input',
        requires: ['autocomplete', 'autocomplete-highlighters'],
        create: function(Y, config) {
            config.srcNode.plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
            return config.srcNode;
        }
    }
];

Y.Array.each(REGISTRY, function(config) {
    Y.YTag.register(config);
});


}, '@VERSION@' ,{skinnable:false, requires:['gallery-ytag']});
