YUI.add('gallery-event-selection', function(Y) {

YUI.add('gallery-event-selection', function(Y) {
    /*
     * Cross browser/device text selection events.
     *  * selection - Fired when text has been selected.
     *  * selectionchange - Fired when text has been selected or deselected.
     *
     * Fired event has the selection property set to the selected text.
     *
     * Notes:
     *  * iOS doesn't tell us when the selection region has been updated. We
     *   have to poll for changes.
     *
     * YUI Bugs:
     *  * Can't listen to multiple gesturemove events on the same node.
     *  * gesturemoveend doesn't fire without gesturemovestart.
     */
    var DELAY = Y.UA.ios ? 400 : 0,
        POLL = 300;

    function getSelection() {
        if (Y.config.win.getSelection) {
            return Y.config.win.getSelection().toString();
        } else if (Y.config.doc.selection) {
            return Y.config.doc.selection.createRange().text;
        }
        return '';
    }

    Y.Event.define('selection', {
        on: function(node, sub, notifier, filter) {
            var method = filter ? 'delegate' : 'on';
            sub._handle = new Y.EventHandle([
                node[method]('gesturemovestart', function(e) {}, filter),
                // Checking asynchronously since previously selected text can be reported as selected.
                node[method]('gesturemoveend', Y.bind(function(e) {
                    Y.later(DELAY, this, this._checkSelection, notifier);
                }, this), filter)
            ]);
        },

        _checkSelection: function(notifier) {
            var selection = getSelection();
            if (selection !== '') {
                notifier.fire({selection: selection});
            }
        },

        detach: function(node, sub, notifier) {
            sub._handle.detach();
        },

        delegate: function() {
            this.on.apply(this, arguments);
        },

        detachDelegate: function() {
            this.detach.apply(this, arguments);
        }
    });

    Y.Event.define('selectionchange', {
        _sub: undefined,

        on: function(node, sub, notifier, filter) {
            var method = filter ? 'delegate' : 'on';
            sub._selection = undefined; // Save last selection
            sub._poll = undefined;
            sub._notifier = notifier;
            sub._handle = new Y.EventHandle([
                node[method]('gesturemovestart', function(e) {}, filter),
                // Checking asynchronously since previously selected text can be reported as selected.
                node[method]('gesturemoveend', Y.bind(function(e) {
                    Y.later(DELAY, this, this._checkSelection, sub);
                }, this), filter)
            ]);
        },

        _unpoll: function(sub) {
            if (sub._poll) {
                sub._poll.cancel();
                sub._poll = undefined;
            }
        },

        detach: function(node, sub, notifier) {
            this._unpoll(sub);
            sub._handle.detach();
        },

        _checkSelection: function(sub) {
            this._unpoll(sub);
            this._checkSelectionChange(sub);

            if (Y.UA.ios) {
                sub._poll = Y.later(POLL, this, this._checkSelectionChange, sub, true);
            }
        },

        _checkSelectionChange: function(sub) {
            var selection = getSelection();
            if (selection !== sub._selection) {
                sub._selection = selection;
                sub._notifier.fire({selection: selection});
            }
        },

        delegate: function() {
            this.on.apply(this, arguments);
        },

        detachDelegate: function() {
            this.detach.apply(this, arguments);
        }
    });
}, '@VERSION@', {requires: ['event-move']});


}, '@VERSION@' ,{skinnable:false, requires:['node', 'event'], supersedes:['another.custom.module']});
