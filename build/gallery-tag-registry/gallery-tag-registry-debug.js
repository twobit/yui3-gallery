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
    Y.namespace('Tag.Tags').yoverlay = {
        created: function(config) {
            var html = this.get('host').getHTML(),
                cfg = Y.merge(config);

            this.get('host').setHTML('<div class="yui3-overlay-loading">' + html + '</div>');
            
            cfg.srcNode = this.get('host').one('div');

            if (cfg.x) {cfg.x = parseInt(cfg.x, 10);}
            if (cfg.y) {cfg.y = parseInt(cfg.y, 10);}

            this._widget = new Y.Overlay(cfg);

            Y.each(Y.Overlay.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._widget.get(attr);},
                    setter: function(value) {this._widget.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {this._widget.render();}, this);
        }
    };
}, '@VERSION@', {requires: ['overlay']});
YUI.add('tag-ytemplate', function(Y) {
    Y.namespace('Tag.Tags').ytemplate = {
        created: function(config) {
            var host = this.get('host');
            host.setHTML('<script type="text/x-template">' + host.getHTML() + '</script>');

            this._node = host.one('script');

            this.addAttr('html', {
                getter: function() {return this._node.getHTML();},
                setter: function(value) {this._node.setHTML(value);}
            });
        },

        compile: function(params) {
            return Y.Lang.sub(this.get('html'), params);
        }
    };
});
YUI.add('tag-yapp', function(Y) {
    Y.namespace('Tag.Tags').yapp = {
        created: function(config) {
            this.get('host').setHTML('<div class="view-container">' + this.get('host').getHTML() + '</div><div class="container"></div>');
            this._instance = new Y.App(Y.merge(config, {
                container: this.get('host').one('.container'),
                viewContainer: this.get('host').one('.view-container')
            }));

            Y.each(Y.App.ATTRS, function(dummy, attr) { // Proxy attrs
                this.addAttr(attr, {
                    getter: function() {return this._instance.get(attr);},
                    setter: function(value) {this._instance.set(attr, value);}
                });
            }, this);

            this.onHostEvent('tag:inserted', function() {
                this._instance.render();
            }, this);
        }
    };
}, '@VERSION@', {requires: ['app-base']});
var REGISTRY = [
    'ytemplate',
    'ybutton',
    'ydial',
    'yautocomplete',
    'ycalendar',
    'ychart',
    'yoverlay',
    'yapp'
];

Y.Array.each(REGISTRY, function(tag) {
    Y.Tag.register(tag);
});


}, '@VERSION@' ,{skinnable:false, requires:['gallery-tag']});
