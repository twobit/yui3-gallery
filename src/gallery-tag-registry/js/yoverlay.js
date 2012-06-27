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