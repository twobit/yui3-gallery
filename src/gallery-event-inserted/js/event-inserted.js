/*
 * Inserted Event.
 */
var PREFIX = {
        camel: ['', 'WebKit', 'Moz', 'O', 'MS'].filter(function(prefix){
            return window[prefix + 'CSSKeyframesRule'];
        })[0]
    };

/*
Y.mix(Y.Node.DOM_EVENTS, {
    DOMNodeInserted: true
});*/

PREFIX.lower = PREFIX.camel.toLowerCase();
PREFIX.js = PREFIX.camel === 'WebKit' ? PREFIX.lower : PREFIX.camel;
PREFIX.css = PREFIX.camel ? '-' + PREFIX.lower + '-' : PREFIX.camel;

var ANIMATION_START_VENDORS = {
        webkit: 'webkitAnimationStart',
        o: 'oAnimationStart'
    },
    ANIMATION_START = ANIMATION_START_VENDORS[PREFIX.lower] || 'animationstart',
    STYLESHEET = Y.Node.create('<style type="text/css">@' + PREFIX.css + 'keyframes INSERTED {' +
        'from {clip: rect(1px, auto, auto, auto);} to {clip: rect(0px, auto, auto, auto);}' +
    '}</style>');

Y.Node.DOM_EVENTS[ANIMATION_START] = 1;

Y.one('head').append(STYLESHEET);

Y.Event.define('inserted', {
    processArgs: function (args, isDelegate) {
        return args.splice(2, 1)[0];
    },

    on: function(node, sub, notifier, filter) {
        var method = filter ? 'delegate' : 'on',
            rule = sub._extra + '{' + PREFIX.css + 'animation-duration: 0.0001s; ' + PREFIX.css + 'animation-name: INSERTED !important;}';

        sub._handle = node[method](ANIMATION_START, Y.bind(function(e) {
            if (e.target.get('tagName').toLowerCase() === sub._extra) {
                //console.log()
                notifier.fire({target: e.target});
            }
        }, this), filter);

        STYLESHEET.get('sheet').insertRule(rule, 0);
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
});