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
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/**","* The Animation Utility provides an API for creating advanced transitions.","*","* W3C CSS Animations:","* http://www.w3.org/TR/css3-animations/","*","* Easing method values from AliceJS:","* http://blackberry.github.com/Alice/","*","* @module anim-native","*/","","/**","* Provides the CSS3 Native Anim class, for animating CSS properties.","*","* @module anim","* @submodule anim-native","*/","var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {","        return prefix + 'Animation' in Y.config.doc.body.style;","    })[0],","    PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,","    ANIMATION_END_VENDORS = {","        webkit: 'webkitAnimationEnd',","        O: 'oAnimationEnd'","    },","    ANIMATION_END_EVENT = 'animationend',","    ANIMATION_END = ANIMATION_END_VENDORS[VENDOR] || ANIMATION_END_EVENT;","","    /**","     * A class for constructing animation instances.","     * @class Anim","     * @for Anim","     * @constructor","     * @extends Base","     */","    Anim = function () {","        Anim.superclass.constructor.apply(this, arguments);","    };","","    Y.Node.DOM_EVENTS[ANIMATION_END] = 1;","","    Anim.NAME = 'animNative';","    Anim.DIRECTIONS = {","        normal: ['normal', 'reverse'],","        alternate: ['alternate', 'alternate-reverse']","    };","    Anim.EASINGS = {","        easeNone: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        easeIn: {p1: 0.420, p2: 0.000, p3: 1.000, p4: 1.000},","        easeOut: {p1: 0.000, p2: 0.000, p3: 0.580, p4: 1.000},","        easeBoth: {p1: 0.420, p2: 0.000, p3: 0.580, p4: 1.000},","        easeInStrong: {p1: 0.895, p2: 0.030, p3: 0.685, p4: 0.220},","        easeOutStrong: {p1: 0.165, p2: 0.840, p3: 0.440, p4: 1.000},","        easeBothStrong: {p1: 0.770, p2: 0.000, p3: 0.175, p4: 1.000},","        backOut: {p1: 0.175, p2: 0.885, p3: 0.320, p4: 1.275},","        backBoth: {p1: 0.680, p2: -0.550, p3: 0.265, p4: 1.550},","","        // FIXME: Defaulting these to linear","        elasticIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        backIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750}","    };","","","    Anim.RE_UNITS = /^(-?\\d*\\.?\\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;","","    /**","     * Regex of properties that should use the default unit.","     *","     * @property RE_DEFAULT_UNIT","     * @static","     */","    Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;","","    /**","     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.","     *","     * @property DEFAULT_UNIT","     * @static","     */","    Anim.DEFAULT_UNIT = 'px';","","    Anim._easing = function (name) {","        e = Anim.EASINGS[name];","        return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';","    },","    ","    Anim._toHyphen = function (property) {","        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","            ","            if (m3) {","                str += '-' + m3.toLowerCase();","            }","","            return str;","        });","","        return property;","    };","","    Anim._insert = function (rule) {","        var doc = Y.config.doc;","","        if (doc.styleSheets && doc.styleSheets.length) {","            var ruleNum = 0;","            try {","                if (doc.styleSheets[0].cssRules.length > 0){","                    ruleNum = doc.styleSheets[0].cssRules.length;","                }","                doc.styleSheets[0].insertRule(rule, ruleNum);","            } catch (e) {","            }","        } else {","            var style = doc.createElement(\"style\");","            style.innerHTML = rule;","            doc.head.appendChild(style);","        }","    };","","    Anim._delete = function (ruleName) {","        var doc = Y.config.doc,","            cssrules = doc.all ? \"rules\" : \"cssRules\",","            i;","","        for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {","            if (doc.styleSheets[0][cssrules][i].name === ruleName) {","                doc.styleSheets[0].deleteRule(i);","                break;","            }","        }","    };","","    Anim.ATTRS = {","        /**","         * The object to be animated.","         * @attribute node","         * @type Node","         */","        node: {","            setter: function (node) {","                if (node) {","                    if (typeof node === 'string' || node.nodeType) {","                        node = Y.one(node);","                    }","                }","","                this._node = node;","                if (!node) {","                }","                return node;","            }","        },","","        /**","         * The length of the animation.  Defaults to \"1\" (second).","         * @attribute duration","         * @type NUM","         */","        duration: {","            value: 1","        },","","        /**","         * The method that will provide values to the attribute(s) during the animation.","         * Defaults to \"easeNone\".","         * @attribute easing","         * @type Function","         */","        easing: {","            value: 'easeNone',","            setter: function (e) {","                return Anim._easing(e);","            }","        },","","        /**","         * The starting values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * If a function is used, the return value becomes the from value.","         * If no from value is specified, the DEFAULT_GETTER will be used.","         * Supports any unit, provided it matches the \"to\" (or default)","         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute from","         * @type Object","         */","        from: {},","","        /**","         * The ending values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * Supports any unit, provided it matches the \"from\" (or default)","         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute to","         * @type Object","         */","        to: {},","","        /**","         * Date stamp for the first frame of the animation.","         * @attribute startTime","         * @type Int","         * @default 0","         * @readOnly","         */","        startTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Current time the animation has been running.","         * @attribute elapsedTime","         * @type Int","         * @default 0","         * @readOnly","         */","        elapsedTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Whether or not the animation is currently running.","         * @attribute running","         * @type Boolean","         * @default false","         * @readOnly","         */","        running: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationName\") !== 'none';","            },","            value: false,","            readOnly: true","        },","","        /**","         * The number of seconds to delay the animation","         * @attribute delay","         * @type Int","         * @default 0","         */","        delay: {","            value: 0","        },","","        /**","         * The number of times the animation should run","         * @attribute iterations","         * @type Int","         * @default 1","         */","        iterations: {","            value: 1","        },","","        /**","         * The number of iterations that have occurred.","         * Resets when an animation ends (reaches iteration count or stop() called).","         * @attribute iterationCount","         * @type Int","         * @default 0","         * @readOnly","         */","        iterationCount: {","            value: 0,","            readOnly: true","        },","","        /**","         * How iterations of the animation should behave.","         * Possible values are \"normal\" and \"alternate\".","         * Normal will repeat the animation, alternate will reverse on every other pass.","         *","         * @attribute direction","         * @type String","         * @default \"normal\"","         */","        direction: {","            value: 'normal' // | alternate (fwd on odd, rev on even per spec)","        },","","        /**","         * Whether or not the animation is currently paused.","         * @attribute paused","         * @type Boolean","         * @default false","         * @readOnly","         */","        paused: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationPlayState\") === 'paused';","            },","            readOnly: true,","            value: false","        },","","        /**","         * If true, animation begins from last frame","         * @attribute reverse","         * @type Boolean","         * @default false","         */","        reverse: {","            value: false","        },","","        /**","         * If 'visible' the element is show when not facing the screen. If 'hidden' the","         * element will be invisible when not facing the screen.","         * @attribute backfaceVisibility","         * @type String","         * @default 'visible'","         */","        backfaceVisibility: {","            value: 'visible'","        }","    };","","    Y.extend(Anim, Y.Base, {","        initializer: function (config) {","            var from = config.from || {},","                to = config.to || {},","                key;","","            this._frames = {'0%': from};","","            for (key in config) {","                if (config.hasOwnProperty(key) && key.substr(-1) === '%') {","                    this._frames[key] = config[key];","                }","            }","","            this._frames['100%'] = to;","        },","","        /**","         * Starts or resumes an animation.","         * @method run","         * @chainable","         */","        run: function () {","            var node = this.get('node');","","            if (this.get('paused')) {","                node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            } else if (!this.get('running')) {","                this._start();","            }","            return this;","        },","","        /**","         * Pauses the animation and","         * freezes it in its current state and time.","         * Calling run() will continue where it left off.","         * @method pause","         * @chainable","         */","        pause: function() {","            if (this.get('running')) {","                this.get('node').setStyle(VENDOR + \"AnimationPlayState\", 'paused');","            }","            return this;","        },","","        /**","         * Stops the animation and resets its time.","         * @method stop","         * @param {Boolean} finish If true, the animation will move to the last frame","         * @chainable","         */","        stop: function(finish) {","            this.get('node').setStyle(VENDOR + \"AnimationName\", '');","            return this;","        },","","        _start: function() {","            var node = this.get('node'),","                name = 'anim-' + Y.guid(),","                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];","","            Anim._insert(this._render(node, name, this._frames));","","            node.setStyle(VENDOR + \"AnimationName\", name);","            node.setStyle(VENDOR + \"AnimationDuration\", this.get('duration') + 's');","            node.setStyle(VENDOR + \"AnimationTimingFunction\", this.get('easing'));","            node.setStyle(VENDOR + \"AnimationDelay\", this.get('delay') + 's');","            node.setStyle(VENDOR + \"AnimationIterationCount\", this.get('iterations'));","            node.setStyle(VENDOR + \"AnimationDirection\", direction);","            node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            node.setStyle(VENDOR + \"BackfaceVisibility\", this.get('backfaceVisibility'));","","            node.on(ANIMATION_END, function(e) {","                node.setStyle(VENDOR + \"AnimationName\", \"none\");","                node.setStyle(VENDOR + \"AnimationDuration\", \"0s\");","                node.setStyle(VENDOR + \"AnimationTimingFunction\", \"ease\");","                node.setStyle(VENDOR + \"AnimationDelay\", \"0s\");","                node.setStyle(VENDOR + \"AnimationIterationCount\", \"1\");","                node.setStyle(VENDOR + \"AnimationDirection\", \"normal\");","                node.setStyle(VENDOR + \"AnimationPlayState\", \"running\");","                node.setStyle(VENDOR + \"BackfaceVisibility\", 'visible');","","                //this.set('iterationCount', this.get('iterations'));","","                Anim._delete(name);","            }, this);","        },","","        _render: function (node, name, keyframes) {","            var css = '@' + PREFIX + 'keyframes ' + name + ' {\\n',","                key,","                props,","                prop,","                value,","                parsed;","","            for (key in keyframes) {","                if (keyframes.hasOwnProperty(key)) {","                    props = keyframes[key];","                    css += '\\t' + key + ' {\\n';","                    ","                    for (prop in props) {","                        if (props.hasOwnProperty(prop)) {","                            value = props[prop];","                            ","                            if (typeof value === 'function') {","                                value = value.call(this, node);","                            }","","                            if (Anim.RE_DEFAULT_UNIT.test(prop)) {","                                parsed = Anim.RE_UNITS.exec(value);","","                                if (parsed && !parsed[2]) {","                                    value += Anim.DEFAULT_UNIT;","                                }","                            }","","                            css += '\\t\\t' + Anim._toHyphen(prop) + ': ' + value + ';\\n';","                        }","                    }","","                    css += '\\t}\\n';","                }","            }","","            css += '}\\n';","","            return css;","        }","    });","","    Y.Anim = Anim;","    Y.AnimNative = Anim;","","}, '@VERSION@', {\"use\": [\"node\", \"base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"21":0,"22":0,"39":0,"40":0,"43":0,"45":0,"46":0,"50":0,"72":0,"80":0,"88":0,"90":0,"91":0,"92":0,"96":0,"97":0,"99":0,"100":0,"103":0,"106":0,"109":0,"110":0,"112":0,"113":0,"114":0,"115":0,"116":0,"118":0,"122":0,"123":0,"124":0,"128":0,"129":0,"133":0,"134":0,"135":0,"136":0,"141":0,"149":0,"150":0,"151":0,"155":0,"156":0,"158":0,"180":0,"251":0,"312":0,"340":0,"342":0,"346":0,"348":0,"349":0,"350":0,"354":0,"363":0,"365":0,"366":0,"367":0,"368":0,"370":0,"381":0,"382":0,"384":0,"394":0,"395":0,"399":0,"403":0,"405":0,"406":0,"407":0,"408":0,"409":0,"410":0,"411":0,"412":0,"414":0,"415":0,"416":0,"417":0,"418":0,"419":0,"420":0,"421":0,"422":0,"426":0,"431":0,"438":0,"439":0,"440":0,"441":0,"443":0,"444":0,"445":0,"447":0,"448":0,"451":0,"452":0,"454":0,"455":0,"459":0,"463":0,"467":0,"469":0,"473":0,"474":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"(anonymous 2):21":0,"Anim:39":0,"_easing:90":0,"(anonymous 3):96":0,"_toHyphen:95":0,"_insert:109":0,"_delete:128":0,"setter:148":0,"setter:179":0,"getter:250":0,"getter:311":0,"initializer:341":0,"run:362":0,"pause:380":0,"stop:393":0,"(anonymous 4):414":0,"_start:398":0,"_render:430":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 106;
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredFunctions = 19;
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
    ANIMATION_END_VENDORS = {
        webkit: 'webkitAnimationEnd',
        O: 'oAnimationEnd'
    },
    ANIMATION_END_EVENT = 'animationend',
    ANIMATION_END = ANIMATION_END_VENDORS[VENDOR] || ANIMATION_END_EVENT;

    /**
     * A class for constructing animation instances.
     * @class Anim
     * @for Anim
     * @constructor
     * @extends Base
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 39);
Anim = function () {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "Anim", 39);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 40);
Anim.superclass.constructor.apply(this, arguments);
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 43);
Y.Node.DOM_EVENTS[ANIMATION_END] = 1;

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 45);
Anim.NAME = 'animNative';
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 46);
Anim.DIRECTIONS = {
        normal: ['normal', 'reverse'],
        alternate: ['alternate', 'alternate-reverse']
    };
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 50);
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


    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 72);
Anim.RE_UNITS = /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;

    /**
     * Regex of properties that should use the default unit.
     *
     * @property RE_DEFAULT_UNIT
     * @static
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 80);
Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;

    /**
     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.
     *
     * @property DEFAULT_UNIT
     * @static
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 88);
Anim.DEFAULT_UNIT = 'px';

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 90);
Anim._easing = function (name) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_easing", 90);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 91);
e = Anim.EASINGS[name];
        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 92);
return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';
    },
    
    Anim._toHyphen = function (property) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_toHyphen", 95);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 96);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 3)", 96);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 97);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
            
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 99);
if (m3) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 100);
str += '-' + m3.toLowerCase();
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 103);
return str;
        });

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 106);
return property;
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 109);
Anim._insert = function (rule) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_insert", 109);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 110);
var doc = Y.config.doc;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 112);
if (doc.styleSheets && doc.styleSheets.length) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 113);
var ruleNum = 0;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 114);
try {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 115);
if (doc.styleSheets[0].cssRules.length > 0){
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 116);
ruleNum = doc.styleSheets[0].cssRules.length;
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 118);
doc.styleSheets[0].insertRule(rule, ruleNum);
            } catch (e) {
            }
        } else {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 122);
var style = doc.createElement("style");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 123);
style.innerHTML = rule;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 124);
doc.head.appendChild(style);
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 128);
Anim._delete = function (ruleName) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_delete", 128);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 129);
var doc = Y.config.doc,
            cssrules = doc.all ? "rules" : "cssRules",
            i;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 133);
for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 134);
if (doc.styleSheets[0][cssrules][i].name === ruleName) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 135);
doc.styleSheets[0].deleteRule(i);
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 136);
break;
            }
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 141);
Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 148);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 149);
if (node) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 150);
if (typeof node === 'string' || node.nodeType) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 151);
node = Y.one(node);
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 155);
this._node = node;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 156);
if (!node) {
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 158);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 179);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 180);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 250);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 251);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 311);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 312);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 340);
Y.extend(Anim, Y.Base, {
        initializer: function (config) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "initializer", 341);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 342);
var from = config.from || {},
                to = config.to || {},
                key;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 346);
this._frames = {'0%': from};

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 348);
for (key in config) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 349);
if (config.hasOwnProperty(key) && key.substr(-1) === '%') {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 350);
this._frames[key] = config[key];
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 354);
this._frames['100%'] = to;
        },

        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */
        run: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "run", 362);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 363);
var node = this.get('node');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 365);
if (this.get('paused')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 366);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            } else {_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 367);
if (!this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 368);
this._start();
            }}
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 370);
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
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "pause", 380);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 381);
if (this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 382);
this.get('node').setStyle(VENDOR + "AnimationPlayState", 'paused');
            }
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 384);
return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @param {Boolean} finish If true, the animation will move to the last frame
         * @chainable
         */
        stop: function(finish) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "stop", 393);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 394);
this.get('node').setStyle(VENDOR + "AnimationName", '');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 395);
return this;
        },

        _start: function() {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_start", 398);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 399);
var node = this.get('node'),
                name = 'anim-' + Y.guid(),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 403);
Anim._insert(this._render(node, name, this._frames));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 405);
node.setStyle(VENDOR + "AnimationName", name);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 406);
node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 407);
node.setStyle(VENDOR + "AnimationTimingFunction", this.get('easing'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 408);
node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 409);
node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 410);
node.setStyle(VENDOR + "AnimationDirection", direction);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 411);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 412);
node.setStyle(VENDOR + "BackfaceVisibility", this.get('backfaceVisibility'));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 414);
node.on(ANIMATION_END, function(e) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 4)", 414);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 415);
node.setStyle(VENDOR + "AnimationName", "none");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 416);
node.setStyle(VENDOR + "AnimationDuration", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 417);
node.setStyle(VENDOR + "AnimationTimingFunction", "ease");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 418);
node.setStyle(VENDOR + "AnimationDelay", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 419);
node.setStyle(VENDOR + "AnimationIterationCount", "1");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 420);
node.setStyle(VENDOR + "AnimationDirection", "normal");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 421);
node.setStyle(VENDOR + "AnimationPlayState", "running");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 422);
node.setStyle(VENDOR + "BackfaceVisibility", 'visible');

                //this.set('iterationCount', this.get('iterations'));

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 426);
Anim._delete(name);
            }, this);
        },

        _render: function (node, name, keyframes) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_render", 430);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 431);
var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
                key,
                props,
                prop,
                value,
                parsed;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 438);
for (key in keyframes) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 439);
if (keyframes.hasOwnProperty(key)) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 440);
props = keyframes[key];
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 441);
css += '\t' + key + ' {\n';
                    
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 443);
for (prop in props) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 444);
if (props.hasOwnProperty(prop)) {
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 445);
value = props[prop];
                            
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 447);
if (typeof value === 'function') {
                                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 448);
value = value.call(this, node);
                            }

                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 451);
if (Anim.RE_DEFAULT_UNIT.test(prop)) {
                                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 452);
parsed = Anim.RE_UNITS.exec(value);

                                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 454);
if (parsed && !parsed[2]) {
                                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 455);
value += Anim.DEFAULT_UNIT;
                                }
                            }

                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 459);
css += '\t\t' + Anim._toHyphen(prop) + ': ' + value + ';\n';
                        }
                    }

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 463);
css += '\t}\n';
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 467);
css += '}\n';

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 469);
return css;
        }
    });

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 473);
Y.Anim = Anim;
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 474);
Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
