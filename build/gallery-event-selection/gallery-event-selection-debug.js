YUI.add('gallery-event-selection', function(Y) {

/*
 * Cross browser/device text selection events.
 *  - selection - Fired when text has been selected.
 *  - selectionchange - Fired when text has been selected or deselected.
 *
 * Fired events have the following properties:
 *  - selection - Selected text.
 *  - pageX/pageY - Best guess on where selection ends.
 *
 * Limitations:
 *  - There are a few edge cases where selection events don't work well.
 *
 * Notes:
 *  - Polling for selection changes is necessary because iOS doesn't tell us
 *    when the selection region has been updated and desktop browsers can use
 *    keyboard selection.
 *  - iOS requires a slight delay when getting selected text.
 *
 * YUI Bugs:
 *  - Can't listen to multiple gesturemove events on the same node.
 *  - gesturemoveend doesn't fire without gesturemovestart.
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
        sub._notifier = notifier;
        sub._handle = new Y.EventHandle([
            node[method]('gesturemovestart', function(e) {}, filter),
            // Checking asynchronously since previously selected text can be reported as selected.
            node[method]('gesturemoveend', Y.bind(function(e) {
                sub._x = e.pageX;
                sub._y = e.pageY;
                Y.later(DELAY, this, this._checkSelection, sub);
            }, this), filter)
        ]);
    },

    _checkSelection: function(sub) {
        var selection = getSelection();
        if (selection !== '') {
            sub._notifier.fire({selection: selection, pageX: sub._x, pageY: sub._y});
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
    on: function(node, sub, notifier, filter) {
        var method = filter ? 'delegate' : 'on';
        sub._selection = ''; // Save last selection
        sub._poll = null;
        sub._notifier = notifier;
        sub._handle = new Y.EventHandle([
            node[method]('gesturemovestart', function(e) {}, filter),
            // Checking asynchronously since previously selected text can be reported as selected.
            node[method]('gesturemoveend', Y.bind(function(e) {
                sub._x = e.pageX;
                sub._y = e.pageY;
                Y.later(DELAY, this, this._checkSelection, sub);
            }, this), filter)
        ]);
    },

    _unpoll: function(sub) {
        if (sub._poll) {
            sub._poll.cancel();
            sub._poll = null;
        }
    },

    detach: function(node, sub, notifier) {
        this._unpoll(sub);
        sub._handle.detach();
    },

    _checkSelection: function(sub) {
        this._unpoll(sub);
        this._checkSelectionChange(sub);
        sub._poll = Y.later(POLL, this, this._checkSelectionChange, sub, true);
    },

    _checkSelectionChange: function(sub) {
        var selection = getSelection();
        if (selection !== sub._selection) {
            this._unpoll(sub);
            sub._selection = selection;
            sub._notifier.fire({selection: selection, pageX: sub._x, pageY: sub._y});
        }
    },

    delegate: function() {
        this.on.apply(this, arguments);
    },

    detachDelegate: function() {
        this.detach.apply(this, arguments);
    }
});


}, '@VERSION@' ,{skinnable:false, requires:['event-move']});
