if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-anim-native/gallery-anim-native.js",
    code: []
};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/**","* The Animation Utility provides an API for creating advanced transitions.","*","* W3C CSS Animations:","* http://www.w3.org/TR/css3-animations/","*","* Easing method values from AliceJS:","* http://blackberry.github.com/Alice/","*","* @module anim-native","*/","","/**","* Provides the CSS3 Native Anim class, for animating CSS properties.","*","* @module anim","* @submodule anim-native","*/","var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {","        return prefix + 'Animation' in Y.config.doc.body.style;","    })[0],","    PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,","","    /**","     * A class for constructing animation instances.","     * @class Anim","     * @for Anim","     * @constructor","     * @extends Base","     */","    Anim = function () {","        Anim.superclass.constructor.apply(this, arguments);","    };","","    Anim.NAME = 'animNative';","    Anim.DIRECTIONS = {","        normal: ['normal', 'reverse'],","        alternate: ['alternate', 'alternate-reverse']","    };","    Anim.EASINGS = {","        easeNone: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        easeIn: {p1: 0.420, p2: 0.000, p3: 1.000, p4: 1.000},","        easeOut: {p1: 0.000, p2: 0.000, p3: 0.580, p4: 1.000},","        easeBoth: {p1: 0.420, p2: 0.000, p3: 0.580, p4: 1.000},","        easeInStrong: {p1: 0.895, p2: 0.030, p3: 0.685, p4: 0.220},","        easeOutStrong: {p1: 0.165, p2: 0.840, p3: 0.440, p4: 1.000},","        easeBothStrong: {p1: 0.770, p2: 0.000, p3: 0.175, p4: 1.000},","        backOut: {p1: 0.175, p2: 0.885, p3: 0.320, p4: 1.275},","        backBoth: {p1: 0.680, p2: -0.550, p3: 0.265, p4: 1.550},","","        // FIXME: Defaulting these to linear","        elasticIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        backIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750}","    };","","    Anim._easing = function (name) {","        e = Anim.EASINGS[name];","        return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';","    },","    ","    Anim._toHyphen = function (property) {","        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","            ","            if (m3) {","                str += '-' + m3.toLowerCase();","            }","","            return str;","        });","","        return property;","    };","","    Anim._insert = function (rule) {","        var doc = Y.config.doc;","","        if (doc.styleSheets && doc.styleSheets.length) {","            var ruleNum = 0;","            try {","                if (doc.styleSheets[0].cssRules.length > 0){","                    ruleNum = doc.styleSheets[0].cssRules.length;","                }","                doc.styleSheets[0].insertRule(rule, ruleNum);","            } catch (e) {","            }","        } else {","            var style = doc.createElement(\"style\");","            style.innerHTML = rule;","            doc.head.appendChild(style);","        }","    };","","    Anim.ATTRS = {","        /**","         * The object to be animated.","         * @attribute node","         * @type Node","         */","        node: {","            setter: function (node) {","                if (node) {","                    if (typeof node === 'string' || node.nodeType) {","                        node = Y.one(node);","                    }","                }","","                this._node = node;","                if (!node) {","                }","                return node;","            }","        },","","        /**","         * The length of the animation.  Defaults to \"1\" (second).","         * @attribute duration","         * @type NUM","         */","        duration: {","            value: 1","        },","","        /**","         * The method that will provide values to the attribute(s) during the animation.","         * Defaults to \"easeNone\".","         * @attribute easing","         * @type Function","         */","        easing: {","            value: 'easeNone',","            setter: function (e) {","                return Anim._easing(e);","            }","        },","","        /**","         * The starting values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * If a function is used, the return value becomes the from value.","         * If no from value is specified, the DEFAULT_GETTER will be used.","         * Supports any unit, provided it matches the \"to\" (or default)","         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute from","         * @type Object","         */","        from: {},","","        /**","         * The ending values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * Supports any unit, provided it matches the \"from\" (or default)","         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute to","         * @type Object","         */","        to: {},","","        /**","         * Date stamp for the first frame of the animation.","         * @attribute startTime","         * @type Int","         * @default 0","         * @readOnly","         */","        startTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Current time the animation has been running.","         * @attribute elapsedTime","         * @type Int","         * @default 0","         * @readOnly","         */","        elapsedTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Whether or not the animation is currently running.","         * @attribute running","         * @type Boolean","         * @default false","         * @readOnly","         */","        running: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationName\") !== 'none';","            },","            value: false,","            readOnly: true","        },","","        /**","         * The number of seconds to delay the animation","         * @attribute delay","         * @type Int","         * @default 0","         */","        delay: {","            value: 0","        },","","        /**","         * The number of times the animation should run","         * @attribute iterations","         * @type Int","         * @default 1","         */","        iterations: {","            value: 1","        },","","        /**","         * The number of iterations that have occurred.","         * Resets when an animation ends (reaches iteration count or stop() called).","         * @attribute iterationCount","         * @type Int","         * @default 0","         * @readOnly","         */","        iterationCount: {","            value: 0,","            readOnly: true","        },","","        /**","         * How iterations of the animation should behave.","         * Possible values are \"normal\" and \"alternate\".","         * Normal will repeat the animation, alternate will reverse on every other pass.","         *","         * @attribute direction","         * @type String","         * @default \"normal\"","         */","        direction: {","            value: 'normal' // | alternate (fwd on odd, rev on even per spec)","        },","","        /**","         * Whether or not the animation is currently paused.","         * @attribute paused","         * @type Boolean","         * @default false","         * @readOnly","         */","        paused: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationPlayState\") === 'paused';","            },","            readOnly: true,","            value: false","        },","","        /**","         * If true, animation begins from last frame","         * @attribute reverse","         * @type Boolean","         * @default false","         */","        reverse: {","            value: false","        },","","        /**","         * If 'visible' the element is show when not facing the screen. If 'hidden' the","         * element will be invisible when not facing the screen.","         * @attribute backfaceVisibility","         * @type String","         * @default 'visible'","         */","        backfaceVisibility: {","            value: 'visible'","        }","    };","","    Y.extend(Anim, Y.Base, {","        initializer: function (config) {","            var from = config.from || {},","                to = config.to || {},","                key;","","            this._frames = {'0%': from};","","            for (key in config) {","                if (config.hasOwnProperty(key) && key.substr(-1) === '%') {","                    this._frames[key] = config[key];","                }","            }","","            this._frames['100%'] = to;","        },","","        /**","         * Starts or resumes an animation.","         * @method run","         * @chainable","         */","        run: function () {","            var node = this.get('node');","","            if (this.get('paused')) {","                node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            } else if (!this.get('running')) {","                this._start();","            }","            return this;","        },","","        /**","         * Pauses the animation and","         * freezes it in its current state and time.","         * Calling run() will continue where it left off.","         * @method pause","         * @chainable","         */","        pause: function() {","            if (this.get('running')) {","                this.get('node').setStyle(VENDOR + \"AnimationPlayState\", 'paused');","            }","            return this;","        },","","        /**","         * Stops the animation and resets its time.","         * @method stop","         * @param {Boolean} finish If true, the animation will move to the last frame","         * @chainable","         */","        stop: function(finish) {","            this.get('node').setStyle(VENDOR + \"AnimationName\", '');","            return this;","        },","","        _start: function() {","            var node = this.get('node'),","                name = 'anim-' + Y.guid(),","                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];","","            Anim._insert(this._render(node, name, this._frames));","","            node.setStyle(VENDOR + \"AnimationName\", name);","            node.setStyle(VENDOR + \"AnimationDuration\", this.get('duration') + 's');","            node.setStyle(VENDOR + \"AnimationDelay\", this.get('delay') + 's');","            node.setStyle(VENDOR + \"AnimationIterationCount\", this.get('iterations'));","            node.setStyle(VENDOR + \"AnimationDirection\", direction);","            node.setStyle(VENDOR + \"AnimationTimingFunction\", this.get('easing'));","            node.setStyle(VENDOR + \"BackfaceVisibility\", this.get('backfaceVisibility'));","            node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","","            this.set('running', true);","        },","","        _render: function (node, name, keyframes) {","            var css = '@' + PREFIX + 'keyframes ' + name + ' {\\n',","                key,","                props,","                prop,","                value;","","            for (key in keyframes) {","                if (keyframes.hasOwnProperty(key)) {","                    props = keyframes[key];","                    css += '\\t' + key + ' {\\n';","                    ","                    for (prop in props) {","                        if (props.hasOwnProperty(prop)) {","                            value = props[prop];","                            ","                            if (typeof value === 'function') {","                                value = value.call(this, node);","                            }","","                            css += '\\t\\t' + Anim._toHyphen(prop) + ': ' + value + ';\\n';","                        }","                    }","","                    css += '\\t}\\n';","                }","            }","","            css += '}\\n';","","            return css;","        },","","        destructor: function() {","            // Not implemented","            // Remove stylesheets","        }","    });","","    Y.Anim = Anim;","    Y.AnimNative = Anim;","","}, '@VERSION@', {\"use\": [\"node\", \"base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"21":0,"22":0,"34":0,"37":0,"38":0,"42":0,"63":0,"64":0,"65":0,"69":0,"70":0,"72":0,"73":0,"76":0,"79":0,"82":0,"83":0,"85":0,"86":0,"87":0,"88":0,"89":0,"91":0,"95":0,"96":0,"97":0,"101":0,"109":0,"110":0,"111":0,"115":0,"116":0,"118":0,"140":0,"211":0,"272":0,"300":0,"302":0,"306":0,"308":0,"309":0,"310":0,"314":0,"323":0,"325":0,"326":0,"327":0,"328":0,"330":0,"341":0,"342":0,"344":0,"354":0,"355":0,"359":0,"363":0,"365":0,"366":0,"367":0,"368":0,"369":0,"370":0,"371":0,"372":0,"374":0,"378":0,"384":0,"385":0,"386":0,"387":0,"389":0,"390":0,"391":0,"393":0,"394":0,"397":0,"401":0,"405":0,"407":0,"416":0,"417":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"(anonymous 2):21":0,"Anim:33":0,"_easing:63":0,"(anonymous 3):69":0,"_toHyphen:68":0,"_insert:82":0,"setter:108":0,"setter:139":0,"getter:210":0,"getter:271":0,"initializer:301":0,"run:322":0,"pause:340":0,"stop:353":0,"_start:358":0,"_render:377":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 82;
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 1);
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
_yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 21);
var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 2)", 21);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 22);
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
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "Anim", 33);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 34);
Anim.superclass.constructor.apply(this, arguments);
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 37);
Anim.NAME = 'animNative';
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 38);
Anim.DIRECTIONS = {
        normal: ['normal', 'reverse'],
        alternate: ['alternate', 'alternate-reverse']
    };
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 42);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 63);
Anim._easing = function (name) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_easing", 63);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 64);
e = Anim.EASINGS[name];
        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 65);
return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';
    },
    
    Anim._toHyphen = function (property) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_toHyphen", 68);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 69);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 3)", 69);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 70);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
            
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 72);
if (m3) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 73);
str += '-' + m3.toLowerCase();
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 76);
return str;
        });

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 79);
return property;
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 82);
Anim._insert = function (rule) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_insert", 82);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 83);
var doc = Y.config.doc;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 85);
if (doc.styleSheets && doc.styleSheets.length) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 86);
var ruleNum = 0;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 87);
try {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 88);
if (doc.styleSheets[0].cssRules.length > 0){
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 89);
ruleNum = doc.styleSheets[0].cssRules.length;
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 91);
doc.styleSheets[0].insertRule(rule, ruleNum);
            } catch (e) {
            }
        } else {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 95);
var style = doc.createElement("style");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 96);
style.innerHTML = rule;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 97);
doc.head.appendChild(style);
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 101);
Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 108);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 109);
if (node) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 110);
if (typeof node === 'string' || node.nodeType) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 111);
node = Y.one(node);
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 115);
this._node = node;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 116);
if (!node) {
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 118);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 139);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 140);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 210);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 211);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 271);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 272);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 300);
Y.extend(Anim, Y.Base, {
        initializer: function (config) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "initializer", 301);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 302);
var from = config.from || {},
                to = config.to || {},
                key;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 306);
this._frames = {'0%': from};

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 308);
for (key in config) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 309);
if (config.hasOwnProperty(key) && key.substr(-1) === '%') {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 310);
this._frames[key] = config[key];
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 314);
this._frames['100%'] = to;
        },

        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */
        run: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "run", 322);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 323);
var node = this.get('node');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 325);
if (this.get('paused')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 326);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            } else {_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 327);
if (!this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 328);
this._start();
            }}
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 330);
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
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "pause", 340);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 341);
if (this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 342);
this.get('node').setStyle(VENDOR + "AnimationPlayState", 'paused');
            }
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 344);
return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @param {Boolean} finish If true, the animation will move to the last frame
         * @chainable
         */
        stop: function(finish) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "stop", 353);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 354);
this.get('node').setStyle(VENDOR + "AnimationName", '');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 355);
return this;
        },

        _start: function() {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_start", 358);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 359);
var node = this.get('node'),
                name = 'anim-' + Y.guid(),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 363);
Anim._insert(this._render(node, name, this._frames));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 365);
node.setStyle(VENDOR + "AnimationName", name);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 366);
node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 367);
node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 368);
node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 369);
node.setStyle(VENDOR + "AnimationDirection", direction);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 370);
node.setStyle(VENDOR + "AnimationTimingFunction", this.get('easing'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 371);
node.setStyle(VENDOR + "BackfaceVisibility", this.get('backfaceVisibility'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 372);
node.setStyle(VENDOR + "AnimationPlayState", 'running');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 374);
this.set('running', true);
        },

        _render: function (node, name, keyframes) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_render", 377);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 378);
var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
                key,
                props,
                prop,
                value;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 384);
for (key in keyframes) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 385);
if (keyframes.hasOwnProperty(key)) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 386);
props = keyframes[key];
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 387);
css += '\t' + key + ' {\n';
                    
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 389);
for (prop in props) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 390);
if (props.hasOwnProperty(prop)) {
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 391);
value = props[prop];
                            
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 393);
if (typeof value === 'function') {
                                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 394);
value = value.call(this, node);
                            }

                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 397);
css += '\t\t' + Anim._toHyphen(prop) + ': ' + value + ';\n';
                        }
                    }

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 401);
css += '\t}\n';
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 405);
css += '}\n';

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 407);
return css;
        },

        destructor: function() {
            // Not implemented
            // Remove stylesheets
        }
    });

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 416);
Y.Anim = Anim;
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 417);
Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
