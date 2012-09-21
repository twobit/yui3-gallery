YUI.add('gallery-anim-native', function (Y, NAME) {

/**
* The Animation Utility provides an API for creating advanced transitions.
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

    Anim._render = function (name, keyframes) {
        var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
            key,
            props,
            prop;

        for (key in keyframes) {
            if (keyframes.hasOwnProperty(key)) {
                props = keyframes[key];
                css += '\t' + key + ' {\n';
                
                for (prop in props) {
                    if (props.hasOwnProperty(prop)) {
                        css += '\t\t' + Anim._toHyphen(prop) + ': ' + props[prop] + ';\n';
                    }
                }

                css += '\t}\n';
            }
        }

        css += '}\n';

        return css;
    };

    /*
     * https://github.com/blackberry/Alice/blob/master/js/src/alice.core.js
     */
    Anim._insert = function(rule) {
        if (document.styleSheets && document.styleSheets.length) {
            var ruleNum = 0;
            try {
                if (document.styleSheets[0].cssRules.length > 0){
                    ruleNum = document.styleSheets[0].cssRules.length;
                }
                document.styleSheets[0].insertRule(rule, ruleNum);
            } catch (ex) {
                console.warn(ex.message, rule);
            }
        } else {
            var style = document.createElement("style");
            style.innerHTML = rule;
            document.head.appendChild(style);
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
         * Defaults to "Easing.easeNone".
         * @attribute easing
         * @type Function
         */
        easing: {
            /* FIXME */
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
            /* FIXME */
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

        run: function () {
            var name = 'anim-' + Y.guid();
                css = Anim._render(name, this._frames),
                node = this.get('node'),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];

            console.log(css);
            Anim._insert(css);

            node.setStyle(VENDOR + "AnimationName", name);
            node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            node.setStyle(VENDOR + "AnimationDirection", direction);

            /*
            node.setStyle(VENDOR + "AnimationTimingFunction", '');
            node.setStyle(VENDOR + "AnimationPlayState", playstate);
            node.setStyle(VENDOR + "BackfaceVisibility", backfaceVisibility);*/
        }
    });

    Y.Anim = Anim;
    Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
