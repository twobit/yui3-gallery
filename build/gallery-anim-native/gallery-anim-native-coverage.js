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
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/**","* The Animation Utility provides an API for creating advanced transitions.","*","* W3C CSS Animations:","* http://www.w3.org/TR/css3-animations/","*","* Easing method values from AliceJS:","* http://blackberry.github.com/Alice/","*","* TODO:","* Add default units","*","* @module anim-native","*/","","/**","* Provides the CSS3 Native Anim class, for animating CSS properties.","*","* @module anim","* @submodule anim-native","*/","var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {","        return prefix + 'Animation' in Y.config.doc.body.style;","    })[0],","    PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,","    ANIMATION_END_VENDORS = {","        webkit: 'webkitAnimationEnd',","        O: 'oAnimationEnd'","    },","    ANIMATION_END_EVENT = 'animationend',","    ANIMATION_END = ANIMATION_END_VENDORS[VENDOR] || ANIMATION_END_EVENT;","","    /**","     * A class for constructing animation instances.","     * @class Anim","     * @for Anim","     * @constructor","     * @extends Base","     */","    Anim = function () {","        Anim.superclass.constructor.apply(this, arguments);","    };","","    Y.Node.DOM_EVENTS[ANIMATION_END] = 1;","","    Anim.NAME = 'animNative';","    Anim.DIRECTIONS = {","        normal: ['normal', 'reverse'],","        alternate: ['alternate', 'alternate-reverse']","    };","    Anim.EASINGS = {","        easeNone: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        easeIn: {p1: 0.420, p2: 0.000, p3: 1.000, p4: 1.000},","        easeOut: {p1: 0.000, p2: 0.000, p3: 0.580, p4: 1.000},","        easeBoth: {p1: 0.420, p2: 0.000, p3: 0.580, p4: 1.000},","        easeInStrong: {p1: 0.895, p2: 0.030, p3: 0.685, p4: 0.220},","        easeOutStrong: {p1: 0.165, p2: 0.840, p3: 0.440, p4: 1.000},","        easeBothStrong: {p1: 0.770, p2: 0.000, p3: 0.175, p4: 1.000},","        backOut: {p1: 0.175, p2: 0.885, p3: 0.320, p4: 1.275},","        backBoth: {p1: 0.680, p2: -0.550, p3: 0.265, p4: 1.550},","","        // FIXME: Defaulting these to linear","        elasticIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        backIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750}","    };","","    Anim._easing = function (name) {","        e = Anim.EASINGS[name];","        return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';","    },","    ","    Anim._toHyphen = function (property) {","        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","            ","            if (m3) {","                str += '-' + m3.toLowerCase();","            }","","            return str;","        });","","        return property;","    };","","    Anim._insert = function (rule) {","        var doc = Y.config.doc;","","        if (doc.styleSheets && doc.styleSheets.length) {","            var ruleNum = 0;","            try {","                if (doc.styleSheets[0].cssRules.length > 0){","                    ruleNum = doc.styleSheets[0].cssRules.length;","                }","                doc.styleSheets[0].insertRule(rule, ruleNum);","            } catch (e) {","            }","        } else {","            var style = doc.createElement(\"style\");","            style.innerHTML = rule;","            doc.head.appendChild(style);","        }","    };","","    Anim._delete = function (ruleName) {","        var doc = Y.config.doc,","            cssrules = doc.all ? \"rules\" : \"cssRules\",","            i;","","        for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {","            if (doc.styleSheets[0][cssrules][i].name === ruleName) {","                doc.styleSheets[0].deleteRule(i);","                break;","            }","        }","    };","","    Anim.ATTRS = {","        /**","         * The object to be animated.","         * @attribute node","         * @type Node","         */","        node: {","            setter: function (node) {","                if (node) {","                    if (typeof node === 'string' || node.nodeType) {","                        node = Y.one(node);","                    }","                }","","                this._node = node;","                if (!node) {","                }","                return node;","            }","        },","","        /**","         * The length of the animation.  Defaults to \"1\" (second).","         * @attribute duration","         * @type NUM","         */","        duration: {","            value: 1","        },","","        /**","         * The method that will provide values to the attribute(s) during the animation.","         * Defaults to \"easeNone\".","         * @attribute easing","         * @type Function","         */","        easing: {","            value: 'easeNone',","            setter: function (e) {","                return Anim._easing(e);","            }","        },","","        /**","         * The starting values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * If a function is used, the return value becomes the from value.","         * If no from value is specified, the DEFAULT_GETTER will be used.","         * Supports any unit, provided it matches the \"to\" (or default)","         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute from","         * @type Object","         */","        from: {},","","        /**","         * The ending values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * Supports any unit, provided it matches the \"from\" (or default)","         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute to","         * @type Object","         */","        to: {},","","        /**","         * Date stamp for the first frame of the animation.","         * @attribute startTime","         * @type Int","         * @default 0","         * @readOnly","         */","        startTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Current time the animation has been running.","         * @attribute elapsedTime","         * @type Int","         * @default 0","         * @readOnly","         */","        elapsedTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Whether or not the animation is currently running.","         * @attribute running","         * @type Boolean","         * @default false","         * @readOnly","         */","        running: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationName\") !== 'none';","            },","            value: false,","            readOnly: true","        },","","        /**","         * The number of seconds to delay the animation","         * @attribute delay","         * @type Int","         * @default 0","         */","        delay: {","            value: 0","        },","","        /**","         * The number of times the animation should run","         * @attribute iterations","         * @type Int","         * @default 1","         */","        iterations: {","            value: 1","        },","","        /**","         * The number of iterations that have occurred.","         * Resets when an animation ends (reaches iteration count or stop() called).","         * @attribute iterationCount","         * @type Int","         * @default 0","         * @readOnly","         */","        iterationCount: {","            value: 0,","            readOnly: true","        },","","        /**","         * How iterations of the animation should behave.","         * Possible values are \"normal\" and \"alternate\".","         * Normal will repeat the animation, alternate will reverse on every other pass.","         *","         * @attribute direction","         * @type String","         * @default \"normal\"","         */","        direction: {","            value: 'normal' // | alternate (fwd on odd, rev on even per spec)","        },","","        /**","         * Whether or not the animation is currently paused.","         * @attribute paused","         * @type Boolean","         * @default false","         * @readOnly","         */","        paused: {","            getter: function() {","                return this.get('node').getStyle(VENDOR + \"AnimationPlayState\") === 'paused';","            },","            readOnly: true,","            value: false","        },","","        /**","         * If true, animation begins from last frame","         * @attribute reverse","         * @type Boolean","         * @default false","         */","        reverse: {","            value: false","        },","","        /**","         * If 'visible' the element is show when not facing the screen. If 'hidden' the","         * element will be invisible when not facing the screen.","         * @attribute backfaceVisibility","         * @type String","         * @default 'visible'","         */","        backfaceVisibility: {","            value: 'visible'","        }","    };","","    Y.extend(Anim, Y.Base, {","        initializer: function (config) {","            var from = config.from || {},","                to = config.to || {},","                key;","","            this._frames = {'0%': from};","","            for (key in config) {","                if (config.hasOwnProperty(key) && key.substr(-1) === '%') {","                    this._frames[key] = config[key];","                }","            }","","            this._frames['100%'] = to;","        },","","        /**","         * Starts or resumes an animation.","         * @method run","         * @chainable","         */","        run: function () {","            var node = this.get('node');","","            if (this.get('paused')) {","                node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            } else if (!this.get('running')) {","                this._start();","            }","            return this;","        },","","        /**","         * Pauses the animation and","         * freezes it in its current state and time.","         * Calling run() will continue where it left off.","         * @method pause","         * @chainable","         */","        pause: function() {","            if (this.get('running')) {","                this.get('node').setStyle(VENDOR + \"AnimationPlayState\", 'paused');","            }","            return this;","        },","","        /**","         * Stops the animation and resets its time.","         * @method stop","         * @param {Boolean} finish If true, the animation will move to the last frame","         * @chainable","         */","        stop: function(finish) {","            this.get('node').setStyle(VENDOR + \"AnimationName\", '');","            return this;","        },","","        _start: function() {","            var node = this.get('node'),","                name = 'anim-' + Y.guid(),","                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];","","            Anim._insert(this._render(node, name, this._frames));","","            node.setStyle(VENDOR + \"AnimationName\", name);","            node.setStyle(VENDOR + \"AnimationDuration\", this.get('duration') + 's');","            node.setStyle(VENDOR + \"AnimationTimingFunction\", this.get('easing'));","            node.setStyle(VENDOR + \"AnimationDelay\", this.get('delay') + 's');","            node.setStyle(VENDOR + \"AnimationIterationCount\", this.get('iterations'));","            node.setStyle(VENDOR + \"AnimationDirection\", direction);","            node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            node.setStyle(VENDOR + \"BackfaceVisibility\", this.get('backfaceVisibility'));","","            node.on(ANIMATION_END, function(e) {","                node.setStyle(VENDOR + \"AnimationName\", \"none\");","                node.setStyle(VENDOR + \"AnimationDuration\", \"0s\");","                node.setStyle(VENDOR + \"AnimationTimingFunction\", \"ease\");","                node.setStyle(VENDOR + \"AnimationDelay\", \"0s\");","                node.setStyle(VENDOR + \"AnimationIterationCount\", \"1\");","                node.setStyle(VENDOR + \"AnimationDirection\", \"normal\");","                node.setStyle(VENDOR + \"AnimationPlayState\", \"running\");","                node.setStyle(VENDOR + \"BackfaceVisibility\", 'visible');","","                //this.set('iterationCount', this.get('iterations'));","","                Anim._delete(name);","            }, this);","        },","","        _render: function (node, name, keyframes) {","            var css = '@' + PREFIX + 'keyframes ' + name + ' {\\n',","                key,","                props,","                prop,","                value;","","            for (key in keyframes) {","                if (keyframes.hasOwnProperty(key)) {","                    props = keyframes[key];","                    css += '\\t' + key + ' {\\n';","                    ","                    for (prop in props) {","                        if (props.hasOwnProperty(prop)) {","                            value = props[prop];","                            ","                            if (typeof value === 'function') {","                                value = value.call(this, node);","                            }","","                            css += '\\t\\t' + Anim._toHyphen(prop) + ': ' + value + ';\\n';","                        }","                    }","","                    css += '\\t}\\n';","                }","            }","","            css += '}\\n';","","            return css;","        }","    });","","    Y.Anim = Anim;","    Y.AnimNative = Anim;","","}, '@VERSION@', {\"use\": [\"node\", \"base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"24":0,"25":0,"42":0,"43":0,"46":0,"48":0,"49":0,"53":0,"74":0,"75":0,"76":0,"80":0,"81":0,"83":0,"84":0,"87":0,"90":0,"93":0,"94":0,"96":0,"97":0,"98":0,"99":0,"100":0,"102":0,"106":0,"107":0,"108":0,"112":0,"113":0,"117":0,"118":0,"119":0,"120":0,"125":0,"133":0,"134":0,"135":0,"139":0,"140":0,"142":0,"164":0,"235":0,"296":0,"324":0,"326":0,"330":0,"332":0,"333":0,"334":0,"338":0,"347":0,"349":0,"350":0,"351":0,"352":0,"354":0,"365":0,"366":0,"368":0,"378":0,"379":0,"383":0,"387":0,"389":0,"390":0,"391":0,"392":0,"393":0,"394":0,"395":0,"396":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"405":0,"406":0,"410":0,"415":0,"421":0,"422":0,"423":0,"424":0,"426":0,"427":0,"428":0,"430":0,"431":0,"434":0,"438":0,"442":0,"444":0,"448":0,"449":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"(anonymous 2):24":0,"Anim:42":0,"_easing:74":0,"(anonymous 3):80":0,"_toHyphen:79":0,"_insert:93":0,"_delete:112":0,"setter:132":0,"setter:163":0,"getter:234":0,"getter:295":0,"initializer:325":0,"run:346":0,"pause:364":0,"stop:377":0,"(anonymous 4):398":0,"_start:382":0,"_render:414":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 99;
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
* TODO:
* Add default units
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
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 24);
var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 2)", 24);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 25);
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
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 42);
Anim = function () {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "Anim", 42);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 43);
Anim.superclass.constructor.apply(this, arguments);
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 46);
Y.Node.DOM_EVENTS[ANIMATION_END] = 1;

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 48);
Anim.NAME = 'animNative';
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 49);
Anim.DIRECTIONS = {
        normal: ['normal', 'reverse'],
        alternate: ['alternate', 'alternate-reverse']
    };
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 53);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 74);
Anim._easing = function (name) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_easing", 74);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 75);
e = Anim.EASINGS[name];
        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 76);
return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';
    },
    
    Anim._toHyphen = function (property) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_toHyphen", 79);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 80);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 3)", 80);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 81);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
            
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 83);
if (m3) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 84);
str += '-' + m3.toLowerCase();
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 87);
return str;
        });

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 90);
return property;
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 93);
Anim._insert = function (rule) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_insert", 93);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 94);
var doc = Y.config.doc;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 96);
if (doc.styleSheets && doc.styleSheets.length) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 97);
var ruleNum = 0;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 98);
try {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 99);
if (doc.styleSheets[0].cssRules.length > 0){
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 100);
ruleNum = doc.styleSheets[0].cssRules.length;
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 102);
doc.styleSheets[0].insertRule(rule, ruleNum);
            } catch (e) {
            }
        } else {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 106);
var style = doc.createElement("style");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 107);
style.innerHTML = rule;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 108);
doc.head.appendChild(style);
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 112);
Anim._delete = function (ruleName) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_delete", 112);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 113);
var doc = Y.config.doc,
            cssrules = doc.all ? "rules" : "cssRules",
            i;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 117);
for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 118);
if (doc.styleSheets[0][cssrules][i].name === ruleName) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 119);
doc.styleSheets[0].deleteRule(i);
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 120);
break;
            }
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 125);
Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 132);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 133);
if (node) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 134);
if (typeof node === 'string' || node.nodeType) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 135);
node = Y.one(node);
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 139);
this._node = node;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 140);
if (!node) {
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 142);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 163);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 164);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 234);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 235);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 295);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 296);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 324);
Y.extend(Anim, Y.Base, {
        initializer: function (config) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "initializer", 325);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 326);
var from = config.from || {},
                to = config.to || {},
                key;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 330);
this._frames = {'0%': from};

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 332);
for (key in config) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 333);
if (config.hasOwnProperty(key) && key.substr(-1) === '%') {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 334);
this._frames[key] = config[key];
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 338);
this._frames['100%'] = to;
        },

        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */
        run: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "run", 346);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 347);
var node = this.get('node');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 349);
if (this.get('paused')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 350);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            } else {_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 351);
if (!this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 352);
this._start();
            }}
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 354);
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
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "pause", 364);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 365);
if (this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 366);
this.get('node').setStyle(VENDOR + "AnimationPlayState", 'paused');
            }
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 368);
return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @param {Boolean} finish If true, the animation will move to the last frame
         * @chainable
         */
        stop: function(finish) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "stop", 377);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 378);
this.get('node').setStyle(VENDOR + "AnimationName", '');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 379);
return this;
        },

        _start: function() {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_start", 382);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 383);
var node = this.get('node'),
                name = 'anim-' + Y.guid(),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')];

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 387);
Anim._insert(this._render(node, name, this._frames));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 389);
node.setStyle(VENDOR + "AnimationName", name);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 390);
node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 391);
node.setStyle(VENDOR + "AnimationTimingFunction", this.get('easing'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 392);
node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 393);
node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 394);
node.setStyle(VENDOR + "AnimationDirection", direction);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 395);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 396);
node.setStyle(VENDOR + "BackfaceVisibility", this.get('backfaceVisibility'));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 398);
node.on(ANIMATION_END, function(e) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 4)", 398);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 399);
node.setStyle(VENDOR + "AnimationName", "none");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 400);
node.setStyle(VENDOR + "AnimationDuration", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 401);
node.setStyle(VENDOR + "AnimationTimingFunction", "ease");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 402);
node.setStyle(VENDOR + "AnimationDelay", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 403);
node.setStyle(VENDOR + "AnimationIterationCount", "1");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 404);
node.setStyle(VENDOR + "AnimationDirection", "normal");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 405);
node.setStyle(VENDOR + "AnimationPlayState", "running");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 406);
node.setStyle(VENDOR + "BackfaceVisibility", 'visible');

                //this.set('iterationCount', this.get('iterations'));

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 410);
Anim._delete(name);
            }, this);
        },

        _render: function (node, name, keyframes) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_render", 414);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 415);
var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
                key,
                props,
                prop,
                value;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 421);
for (key in keyframes) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 422);
if (keyframes.hasOwnProperty(key)) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 423);
props = keyframes[key];
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 424);
css += '\t' + key + ' {\n';
                    
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 426);
for (prop in props) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 427);
if (props.hasOwnProperty(prop)) {
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 428);
value = props[prop];
                            
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 430);
if (typeof value === 'function') {
                                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 431);
value = value.call(this, node);
                            }

                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 434);
css += '\t\t' + Anim._toHyphen(prop) + ': ' + value + ';\n';
                        }
                    }

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 438);
css += '\t}\n';
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 442);
css += '}\n';

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 444);
return css;
        }
    });

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 448);
Y.Anim = Anim;
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 449);
Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
