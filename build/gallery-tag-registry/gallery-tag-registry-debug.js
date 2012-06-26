YUI.add('gallery-tag-registry', function(Y) {

YUI.add('tag-ybutton', function(Y) {
    Y.namespace('Tag.Tags').ybutton = {
        created: function(config) {
            this.get('host').setHTML('<button></button>');
            this._widget = new Y.Button(Y.merge(config, {
                srcNode: this.get('host').one('button')
            }));

            Y.each(Y.Button.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._widget.get(attr);},
                    setter: function(value) {this._widget.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['button']});
YUI.add('tag-ydial', function(Y) {
    Y.namespace('Tag.Tags').ydial = {
        created: function(config) {
            this.get('host').setHTML('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Dial(Y.merge(config, {
                srcNode: this.get('host').one('div')
            }));

            Y.each(Y.Dial.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._widget.get(attr);},
                    setter: function(value) {this._widget.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['dial']});
YUI.add('tag-yautocomplete', function(Y) {
    Y.namespace('Tag.Tags').yautocomplete = {
        created: function(config) {
            this.get('host').setHTML('<div class="yui3-skin-sam"><input type="text" /></div>');
            this._node = this.get('host').one('input');
            this._node.plug(Y.Plugin.AutoComplete, Y.merge({
                resultHighlighter: 'phraseMatch',
                source: 'select k from yahoo.search.suggestions where command="{query}"',
                yqlEnv: 'store://datatables.org/alltableswithkeys',
                resultListLocator: 'query.results.s',
                resultTextLocator: 'k'
            }, config));

            Y.each(Y.AutoComplete.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._node.ac.get(attr);},
                    setter: function(value) {this._node.ac.set(attr, value);}
                });
            }, this);
        }
    };
}, '@VERSION@', {requires: ['autocomplete', 'autocomplete-highlighters']});
YUI.add('tag-ycalendar', function(Y) {
    Y.namespace('Tag.Tags').ycalendar = {
        created: function(config) {
            this.get('host').setHTML('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Calendar(Y.merge(config, {
                contentBox: this.get('host').one('div')
            }));

            Y.each(Y.Calendar.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._widget.get(attr);},
                    setter: function(value) {this._widget.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['calendar']});
YUI.add('tag-ychart', function(Y) {
    Y.namespace('Tag.Tags').ychart = {
        created: function(config) {
            this.get('host').setHTML('<div></div>');
            this._widget = new Y.Chart({
                dataProvider: Y.config.win[config.dataprovider],
                render: this.get('host').one('div')
            });
        }
    };
}, '@VERSION@', {requires: ['charts']});
YUI.add('tag-yoverlay', function(Y) {
    Y.namespace('Tag.Tags').ydial = {
        created: function(config) {
            this.get('host').setHTML('<div class="yui3-skin-sam"></div>');
            this._widget = new Y.Dial(Y.merge(config, {
                srcNode: this.get('host').one('div')
            }));

            Y.each(Y.Dial.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._widget.get(attr);},
                    setter: function(value) {this._widget.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['dial']});
var REGISTRY = [
    'ybutton',
    'ydial',
    'yautocomplete',
    'ycalendar',
    'ychart',
    'yoverlay'
];

Y.Array.each(REGISTRY, function(tag) {
    Y.Tag.register(tag);
});


}, '@VERSION@' ,{skinnable:false, requires:['gallery-tag']});
