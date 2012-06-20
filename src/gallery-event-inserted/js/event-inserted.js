/*
 * Inserted Event.
 *
 * Uses efficient CSS3 Animation to fire insertion events otherwise falls back
 * to DOMNodeInserted.
 */
var PREFIX = {
        camel: ['', 'WebKit', 'Moz', 'O', 'MS'].filter(function(prefix){
            return window[prefix + 'CSSKeyframesRule'];
        })[0]
    };
PREFIX.lower = PREFIX.camel.toLowerCase();
PREFIX.css = PREFIX.camel ? '-' + PREFIX.lower + '-' : PREFIX.camel;

// CSS3 Animation Support
var Inserted = {
    ANIMATION_START_VENDORS: {
        webkit: 'webkitAnimationStart',
        o: 'oAnimationStart'
    },
    ANIMATION_START: 'animationstart',
    STYLESHEET: null,

    _init: function() {
        Inserted.ANIMATION_START = Inserted.ANIMATION_START_VENDORS[PREFIX.lower] || Inserted.ANIMATION_START;
        Y.Node.DOM_EVENTS[Inserted.ANIMATION_START] = 1;
        Inserted.STYLESHEET = Y.Node.create('<style type="text/css">@' + PREFIX.css + 'keyframes INSERTED {' +
            'from {clip: rect(1px, auto, auto, auto);} to {clip: rect(0px, auto, auto, auto);}' +
        '}</style>');
        Y.one('head').append(Inserted.STYLESHEET);
    },

    processArgs: function (args, isDelegate) {
        return args.splice(2, 1)[0];
    },

    on: function(node, sub, notifier, filter) {
        var method = filter ? 'delegate' : 'on',
            rule = sub._extra + '{' + PREFIX.css + 'animation-duration: 0.0001s; ' + PREFIX.css + 'animation-name: INSERTED !important;}';

        sub._handle = node[method](Inserted.ANIMATION_START, Y.bind(function(e) {
            if (e.target.get('tagName').toLowerCase() === sub._extra) {
                notifier.fire({target: e.target});
            }
        }, this), filter);

        Inserted.STYLESHEET.get('sheet').insertRule(rule, 0);
    },

    delegate: function() {
        this.on.apply(this, arguments);
    },

    detach: function(node, sub, notifier) {
        sub._handle.detach();
    },

    detachDelegate: function() {
        this.detach.apply(this, arguments);
    }
};

// DOMNodeInserted fallback
var Fallback = {
    TAGS: {},

    _init: function() {
        Y.Node.DOM_EVENTS.DOMNodeInserted = 1;
    },
    
    processArgs: function (args, isDelegate) {
        return args.splice(2, 1)[0];
    },

    on: function(node, sub, notifier, filter) {
        var method = filter ? 'delegate' : 'on';

        if (!Fallback.TAGS[sub._extra]) {
            Fallback.TAGS[sub._extra] = true;
            Y.all(sub._extra).each(function(item) {
                notifier.fire({target: item});
            });
        }

        sub._handle = node[method]('DOMNodeInserted', Y.bind(function(e) {
            if (e.target.get('tagName').toLowerCase() === sub._extra) {
                notifier.fire({target: e.target});
            }
        }, this), filter);
    },

    delegate: function() {
        this.on.apply(this, arguments);
    },

    detach: function(node, sub, notifier) {
        sub._handle.detach();
    },

    detachDelegate: function() {
        this.detach.apply(this, arguments);
    }
};

// Fallback if CSS3 Animation is not supported
Y.Event.define('inserted', PREFIX.camel ? Inserted : Fallback);