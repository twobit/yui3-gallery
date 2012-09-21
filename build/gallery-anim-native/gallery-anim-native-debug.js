YUI.add('gallery-anim-native', function (Y, NAME) {

/**
* The Animation Utility provides an API for creating advanced transitions.
*
* W3C CSS Animations:
* http://www.w3.org/TR/css3-animations/
*
* Easing method values from AliceJS:
* http://blackberry.github.com/Alice/
*
* @module anim-native
*/

/**
* Provides the CSS3 Native Anim class, for animating CSS properties.
*
* @module anim
* @submodule anim-native
*/
var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {
        return prefix + 'Animation' in Y.config.doc.body.style;
    })[0],
    PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,

    /**
     * A class for constructing animation instances.
     * @class Anim
     * @for Anim
     * @constructor
     * @extends Base
     */
    Anim = function () {
        Anim.superclass.constructor.apply(this, arguments);
    };

    Anim.NAME = 'animNative';
    Anim.DIRECTIONS = {
        normal: ['normal', 'reverse'],
        alternate: ['alternate', 'alternate-reverse']
    };
    Anim.EASINGS = {
        easeNone: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        easeIn: {p1: 0.420, p2: 0.000, p3: 1.000, p4: 1.000},
        easeOut: {p1: 0.000, p2: 0.000, p3: 0.580, p4: 1.000},
        easeBoth: {p1: 0.420, p2: 0.000, p3: 0.580, p4: 1.000},
        easeInStrong: {p1: 0.895, p2: 0.030, p3: 0.685, p4: 0.220},
        easeOutStrong: {p1: 0.165, p2: 0.840, p3: 0.440, p4: 1.000},
        easeBothStrong: {p1: 0.770, p2: 0.000, p3: 0.175, p4: 1.000},
        backOut: {p1: 0.175, p2: 0.885, p3: 0.320, p4: 1.275},
        backBoth: {p1: 0.680, p2: -0.550, p3: 0.265, p4: 1.550},

        // FIXME: Defaulting these to linear
        elasticIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        elasticOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        elasticBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        backIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        bounceIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        bounceOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},
        bounceBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750}
    };

    Anim._easing = function (name) {
        e = Anim.EASINGS[name];
        return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';
    },
    
    Anim._toHyphen = function (property) {
        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
            
            if (m3) {
                str += '-' + m3.toLowerCase();
            }

            return str;
        });

        return property;
    };

    Anim._insert = function (rule) {
        Y.log(rule);
        var doc = Y.config.doc;

        if (doc.styleSheets && doc.styleSheets.length) {
            var ruleNum = 0;
            try {
                if (doc.styleSheets[0].cssRules.length > 0){
                    ruleNum = doc.styleSheets[0].cssRules.length;
                }
                doc.styleSheets[0].insertRule(rule, ruleNum);
            } catch (e) {
                Y.log(e.message + rule, 'warn');
            }
        } else {
            var style = doc.createElement("style");
            style.innerHTML = rule;
            doc.head.appendChild(style);
        }
    };

    Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                if (node) {
                    if (typeof node === 'string' || node.nodeType) {
                        node = Y.one(node);
                    }
                }

                this._node = node;
                if (!node) {
                    Y.log(node + ' is not a valid node', 'warn', 'Anim');
                }
                return node;
            }
        },

        /**
         * The length of the animation.  Defaults to "1" (second).
         * @attribute duration
         * @type NUM
         */
        duration: {
            value: 1
        },

        /**
         * The method that will provide values to the attribute(s) during the animation.
         * Defaults to "easeNone".
         * @attribute easing
         * @type Function
         */
        easing: {
            value: 'easeNone',
            setter: function (e) {
                return Anim._easing(e);
            }
        },

        /**
         * The starting values for the animated properties.
         *
         * Fields may be strings, numbers, or functions.
         * If a function is used, the return value becomes the from value.
         * If no from value is specified, the DEFAULT_GETTER will be used.
         * Supports any unit, provided it matches the "to" (or default)
         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).
         *
         * If using the default ('px' for length-based units), the unit may be omitted
         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels
         * and hex, respectively).
         *
         * @attribute from
         * @type Object
         */
        from: {},

        /**
         * The ending values for the animated properties.
         *
         * Fields may be strings, numbers, or functions.
         * Supports any unit, provided it matches the "from" (or default)
         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).
         *
         * If using the default ('px' for length-based units), the unit may be omitted
         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels
         * and hex, respectively).
         *
         * @attribute to
         * @type Object
         */
        to: {},

        /**
         * Date stamp for the first frame of the animation.
         * @attribute startTime
         * @type Int
         * @default 0
         * @readOnly
         */
        startTime: {
            value: 0,
            readOnly: true
        },

        /**
         * Current time the animation has been running.
         * @attribute elapsedTime
         * @type Int
         * @default 0
         * @readOnly
         */
        elapsedTime: {
            value: 0,
            readOnly: true
        },

        /**
         * Whether or not the animation is currently running.
         * @attribute running
         * @type Boolean
         * @default false
         * @readOnly
         */
        running: {
            getter: function() {
                return this.get('node').getStyle(VENDOR + "AnimationName") !== 'none';
            },
            value: false,
            readOnly: true
        },

        /**
         * The number of seconds to delay the animation
         * @attribute delay
         * @type Int
         * @default 0
         */
        delay: {
            value: 0
        },

        /**
         * The number of times the animation should run
         * @attribute iterations
         * @type Int
         * @default 1
         */
        iterations: {
            value: 1
        },

        /**
         * The number of iterations that have occurred.
         * Resets when an animation ends (reaches iteration count or stop() called).
         * @attribute iterationCount
         * @type Int
         * @default 0
         * @readOnly
         */
        iterationCount: {
            value: 0,
            readOnly: true
        },

        /**
         * How iterations of the animation should behave.
         * Possible values are "normal" and "alternate".
         * Normal will repeat the animation, alternate will reverse on every other pass.
         *
         * @attribute direction
         * @type String
         * @default "normal"
         */
        direction: {
            value: 'normal' // | alternate (fwd on odd, rev on even per spec)
        },

        /**
         * Whether or not the animation is currently paused.
         * @attribute paused
         * @type Boolean
         * @default false
         * @readOnly
         */
        paused: {
            getter: function() {
                return this.get('node').getStyle(VENDOR + "AnimationPlayState") === 'paused';
            },
            readOnly: true,
            value: false
        },

        /**
         * If true, animation begins from last frame
         * @attribute reverse
         * @type Boolean
         * @default false
         */
        reverse: {
            value: false
        },

        /**
         * If 'visible' the element is show when not facing the screen. If 'hidden' the
         * element will be invisible when not facing the screen.
         * @attribute backfaceVisibility
         * @type String
         * @default 'visible'
         */
        backfaceVisibility: {
            value: 'visible'
        }
    };

    Y.extend(Anim, Y.Base, {
        initializer: function (config) {
            var from = config.from || {},
                to = config.to || {},
                key;

            this._frames = {'0%': from};

            for (key in config) {
                if (config.hasOwnProperty(key) && key.substr(-1) === '%') {
                    this._frames[key] = config[key];
                }
            }

            this._frames['100%'] = to;
        },

        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */
        run: function () {
            var node = this.get('node');

            if (this.get('paused')) {
                node.setStyle(VENDOR + "AnimationPlayState", 'running');
            } else if (!this.get('running')) {
                this._start();
            }
            return this;
        },

        /**
         * Pauses the animation and
         * freezes it in its current state and time.
         * Calling run() will continue where it left off.
         * @method pause
         * @chainable
         */
        pause: function() {
            if (this.get('running')) {
                this.get('node').setStyle(VENDOR + "AnimationPlayState", 'paused');
            }
            return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @param {Boolean} finish If true, the animation will move to the last frame
         * @chainable
         */
        stop: function(finish) {
            this.get('node').setStyle(VENDOR + "AnimationName", '');
            return this;
        },

        _start: function() {
            var node = this.get('node'),
                name = 'anim-' + Y.guid(),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];

            Anim._insert(this._render(node, name, this._frames));

            node.setStyle(VENDOR + "AnimationName", name);
            node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            node.setStyle(VENDOR + "AnimationDirection", direction);
            node.setStyle(VENDOR + "AnimationTimingFunction", this.get('easing'));
            node.setStyle(VENDOR + "BackfaceVisibility", this.get('backfaceVisibility'));
            node.setStyle(VENDOR + "AnimationPlayState", 'running');

            this.set('running', true);
        },

        _render: function (node, name, keyframes) {
            var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
                key,
                props,
                prop,
                value;

            for (key in keyframes) {
                if (keyframes.hasOwnProperty(key)) {
                    props = keyframes[key];
                    css += '\t' + key + ' {\n';
                    
                    for (prop in props) {
                        if (props.hasOwnProperty(prop)) {
                            value = props[prop];
                            
                            if (typeof value === 'function') {
                                value = value.call(this, node);
                            }

                            css += '\t\t' + Anim._toHyphen(prop) + ': ' + value + ';\n';
                        }
                    }

                    css += '\t}\n';
                }
            }

            css += '}\n';

            return css;
        },

        destructor: function() {
            // Not implemented
            // Remove stylesheets
        }
    });

    Y.Anim = Anim;
    Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
