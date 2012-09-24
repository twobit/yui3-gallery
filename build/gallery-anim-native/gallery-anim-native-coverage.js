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
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/**","* The Animation Utility provides an API for creating advanced transitions.","*","* W3C CSS Animations:","* http://www.w3.org/TR/css3-animations/","*","* Easing method values from AliceJS:","* http://blackberry.github.com/Alice/","*","* Browser support:","* http://caniuse.com/#feat=css-animation","* IE10+, FF5+, Chrome 4+, Safari/iOS 4+, Android 2.1+","*","* @module anim-native","*/","","/**","* Provides the CSS3 Native Anim class, for animating CSS properties.","*","* @module anim","* @submodule anim-native","*/","    \"use strict\";","    /*global Y:true */","    /*jslint regexp: true*/","    var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function (prefix) {","            return Y.config.doc.body.style.hasOwnProperty(prefix + 'Animation');","        })[0],","        PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,","        ANIMATION_END_VENDORS = {","            webkit: 'webkitAnimationEnd',","            O: 'oAnimationEnd'","        },","        ANIMATION_END_EVENT = 'animationend',","        ANIMATION_END = ANIMATION_END_VENDORS[VENDOR] || ANIMATION_END_EVENT,","","        /**","         * A class for constructing animation instances.","         * @class Anim","         * @for Anim","         * @constructor","         * @extends Base","         */","        Anim = function () {","            Anim.superclass.constructor.apply(this, arguments);","        };","","    Y.Node.DOM_EVENTS[ANIMATION_END] = 1;","","    Anim.NAME = 'animNative';","    Anim.DIRECTIONS = {","        normal: ['normal', 'reverse'],","        alternate: ['alternate', 'alternate-reverse']","    };","    Anim.EASINGS = {","        easeNone: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        easeIn: {p1: 0.420, p2: 0.000, p3: 1.000, p4: 1.000},","        easeOut: {p1: 0.000, p2: 0.000, p3: 0.580, p4: 1.000},","        easeBoth: {p1: 0.420, p2: 0.000, p3: 0.580, p4: 1.000},","        easeInStrong: {p1: 0.895, p2: 0.030, p3: 0.685, p4: 0.220},","        easeOutStrong: {p1: 0.165, p2: 0.840, p3: 0.440, p4: 1.000},","        easeBothStrong: {p1: 0.770, p2: 0.000, p3: 0.175, p4: 1.000},","        backOut: {p1: 0.175, p2: 0.885, p3: 0.320, p4: 1.275},","        backBoth: {p1: 0.680, p2: -0.550, p3: 0.265, p4: 1.550},","","        // FIXME: Defaulting these to linear","        elasticIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        elasticBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        backIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceIn: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceOut: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750},","        bounceBoth: {p1: 0.250, p2: 0.250, p3: 0.750, p4: 0.750}","    };","","    Anim.RE_UNITS = /^(-?\\d*\\.?\\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;","","    /**","     * Regex of properties that should use the default unit.","     *","     * @property RE_DEFAULT_UNIT","     * @static","     */","    Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;","","    /**","     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.","     *","     * @property DEFAULT_UNIT","     * @static","     */","    Anim.DEFAULT_UNIT = 'px';","","    Anim._easing = function (name) {","        var e = Anim.EASINGS[name];","        return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';","    };","","    Anim._toHyphen = function (property) {","        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function (m0, m1, m2, m3) {","            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","","            if (m3) {","                str += '-' + m3.toLowerCase();","            }","","            return str;","        });","","        return property;","    };","","    Anim._insert = function (rule) {","        var doc = Y.config.doc,","            ruleNum,","            style;","","        if (doc.styleSheets && doc.styleSheets.length) {","            ruleNum = 0;","            try {","                if (doc.styleSheets[0].cssRules.length > 0) {","                    ruleNum = doc.styleSheets[0].cssRules.length;","                }","                doc.styleSheets[0].insertRule(rule, ruleNum);","            } catch (e) {","            }","        } else {","            style = doc.createElement(\"style\");","            style.innerHTML = rule;","            doc.head.appendChild(style);","        }","    };","","    Anim._delete = function (ruleName) {","        var doc = Y.config.doc,","            cssrules = doc.all ? \"rules\" : \"cssRules\",","            i;","","        for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {","            if (doc.styleSheets[0][cssrules][i].name === ruleName) {","                doc.styleSheets[0].deleteRule(i);","                break;","            }","        }","    };","","    Anim.ATTRS = {","        /**","         * The object to be animated.","         * @attribute node","         * @type Node","         */","        node: {","            setter: function (node) {","                if (node) {","                    if (typeof node === 'string' || node.nodeType) {","                        node = Y.one(node);","                    }","                }","","                this._node = node;","                if (!node) {","                }","                return node;","            }","        },","","        /**","         * The length of the animation.  Defaults to \"1\" (second).","         * @attribute duration","         * @type NUM","         */","        duration: {","            value: 1","        },","","        /**","         * The method that will provide values to the attribute(s) during the animation.","         * Defaults to \"easeNone\".","         * @attribute easing","         * @type Function","         */","        easing: {","            value: 'easeNone',","            setter: function (e) {","                return Anim._easing(e);","            }","        },","","        /**","         * The starting values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * If a function is used, the return value becomes the from value.","         * If no from value is specified, the DEFAULT_GETTER will be used.","         * Supports any unit, provided it matches the \"to\" (or default)","         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute from","         * @type Object","         */","        from: {","            value: {}","        },","","        /**","         * The keyframes between 0 and 100%.","         *","         * Example: {'50%': {","         *   width: 200","         * }}","         *","         * @attribute to","         * @type Object","         */","        frames: {","            value: {}","        },","","        /**","         * The ending values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * Supports any unit, provided it matches the \"from\" (or default)","         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute to","         * @type Object","         */","        to: {","            value: {}","        },","","        /**","         * Date stamp for the first frame of the animation.","         * @attribute startTime","         * @type Int","         * @default 0","         * @readOnly","         */","        startTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Current time the animation has been running.","         * @attribute elapsedTime","         * @type Int","         * @default 0","         * @readOnly","         */","        elapsedTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Whether or not the animation is currently running.","         * @attribute running","         * @type Boolean","         * @default false","         * @readOnly","         */","        running: {","            getter: function () {","                return this.get('node').getStyle(VENDOR + \"AnimationName\") !== 'none';","            },","            value: false,","            readOnly: true","        },","","        /**","         * The number of seconds to delay the animation","         * @attribute delay","         * @type Int","         * @default 0","         */","        delay: {","            value: 0","        },","","        /**","         * The number of times the animation should run. 'infinite' or integer.","         * @attribute iterations","         * @type Int","         * @default 1","         */","        iterations: {","            value: 1","        },","","        /**","         * The number of iterations that have occurred.","         * Resets when an animation ends (reaches iteration count or stop() called).","         *","         * Note: no way to update this mid animation.","         *","         * @attribute iterationCount","         * @type Int","         * @default 0","         * @readOnly","         */","        iterationCount: {","            value: 0,","            readOnly: true","        },","","        /**","         * How iterations of the animation should behave.","         * Possible values are \"normal\" and \"alternate\".","         * Normal will repeat the animation, alternate will reverse on every other pass.","         *","         * @attribute direction","         * @type String","         * @default \"normal\"","         */","        direction: {","            value: 'normal' // | alternate (fwd on odd, rev on even per spec)","        },","","        /**","         * Whether or not the animation is currently paused.","         * @attribute paused","         * @type Boolean","         * @default false","         * @readOnly","         */","        paused: {","            getter: function () {","                return this.get('node').getStyle(VENDOR + \"AnimationPlayState\") === 'paused';","            },","            readOnly: true,","            value: false","        },","","        /**","         * If true, animation begins from last frame","         * @attribute reverse","         * @type Boolean","         * @default false","         */","        reverse: {","            value: false","        },","","        /**","         * Perspective depth","         * @attribute perspective","         * @type int","         * @default 1000","         */","        perspective: {","            value: 1000","        },","","        /**","         * X/Y axis origin","         * @attribute perspectiveOrigin","         * @type String","         * @default 'center center'","         */","        perspectiveOrigin: {","            value: 'center center'","        },","","        /**","         * If 'visible' the element is show when not facing the screen. If 'hidden' the","         * element will be invisible when not facing the screen.","         * @attribute backfaceVisibility","         * @type String","         * @default 'visible'","         */","        backfaceVisibility: {","            value: 'visible'","        }","    };","","    Y.extend(Anim, Y.Base, {","        initializer: function (config) {","        },","","        /**","         * Starts or resumes an animation.","         * @method run","         * @chainable","         */","        run: function () {","            var node = this.get('node');","","            if (this.get('paused')) {","                node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            } else if (!this.get('running')) {","                this._start();","            }","            return this;","        },","","        /**","         * Pauses the animation and","         * freezes it in its current state and time.","         * Calling run() will continue where it left off.","         * @method pause","         * @chainable","         */","        pause: function () {","            if (this.get('running')) {","                this.get('node').setStyle(VENDOR + \"AnimationPlayState\", 'paused');","            }","            return this;","        },","","        /**","         * Stops the animation and resets its time.","         * @method stop","         * @param {Boolean} finish If true, the animation will move to the last frame","         * @chainable","         */","        stop: function (finish) {","            this.get('node').setStyle(VENDOR + \"AnimationName\", '');","            return this;","        },","","        /**","         * Initializes animation. Inserts keyframes into DOM and updates node styles.","         */","        _start: function () {","            var node = this.get('node'),","                parent = node.get('parentNode'),","                name = 'anim-' + Y.guid(),","                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')],","                from = this.get('from'),","                to = this.get('to'),","                frames = this.get('frames'),","                keyframes = {},","                res,","                frame;","","            keyframes['0%'] = from;","            keyframes = Y.merge(keyframes, frames);","            keyframes['100%'] = to;","","            res = this._render(node, name, keyframes);","","            // TODO: Clear animations","","            // Apply last animation frame styles","            if (this.get('iterations') !== 'infinite') {","                frame = this.get('iterations') % (2 - this.get('reverse')) * 100;","                node.setStyles(res.styles[frame + '%']);","            }","","            Anim._insert(res.css);","","            this.set('iterationCount', 0);","","            node.setStyle(VENDOR + \"AnimationName\", name);","            node.setStyle(VENDOR + \"AnimationDuration\", this.get('duration') + 's');","            node.setStyle(VENDOR + \"AnimationTimingFunction\", this.get('easing'));","            node.setStyle(VENDOR + \"AnimationDelay\", this.get('delay') + 's');","            node.setStyle(VENDOR + \"AnimationIterationCount\", this.get('iterations'));","            node.setStyle(VENDOR + \"AnimationDirection\", direction);","            node.setStyle(VENDOR + \"AnimationPlayState\", 'running');","            node.setStyle(VENDOR + \"BackfaceVisibility\", this.get('backfaceVisibility'));","            parent.setStyle(VENDOR + \"Perspective\", this.get('perspective') + \"px\");","            parent.setStyle(VENDOR + \"PerspectiveOrigin\", this.get('perspectiveOrigin'));","","            node.on(ANIMATION_END, function (e) {","                node.setStyle(VENDOR + \"AnimationName\", \"none\");","                node.setStyle(VENDOR + \"AnimationDuration\", \"0s\");","                node.setStyle(VENDOR + \"AnimationTimingFunction\", \"ease\");","                node.setStyle(VENDOR + \"AnimationDelay\", \"0s\");","                node.setStyle(VENDOR + \"AnimationIterationCount\", \"1\");","                node.setStyle(VENDOR + \"AnimationDirection\", \"normal\");","                node.setStyle(VENDOR + \"AnimationPlayState\", \"running\");","                node.setStyle(VENDOR + \"BackfaceVisibility\", 'visible');","","                this.set('iterationCount', this.get('iterations'));","","                Anim._delete(name);","","                this.fire('end', {elapsed: this.get('elapsedTime')});","            }, this);","        },","","        /**","         * Generate CSS keyframes string.","         */","        _render: function (node, name, keyframes) {","            var css = ['@' + PREFIX + 'keyframes ' + name + ' {'],","                styles = {};","","            Y.Object.each(keyframes, function (props, key) {","                css.push('\\t' + key + ' {');","                styles[key] = {};","","                Y.Object.each(props, function (value, prop) {","                    var parsed;","","                    if (typeof value === 'function') {","                        value = value.call(this, node);","                    }","","                    if (Anim.RE_DEFAULT_UNIT.test(prop)) {","                        parsed = Anim.RE_UNITS.exec(value);","","                        if (parsed && !parsed[2]) {","                            value += Anim.DEFAULT_UNIT;","                        }","                    }","","                    styles[key][prop] = value;","                    css.push('\\t\\t' + Anim._toHyphen(prop) + ': ' + value + ';');","                }, this);","","                css.push('\\t}');","            }, this);","","            css.push('}');","            return {css: css.join('\\n'), styles: styles};","        }","    });","","    Y.Anim = Anim;","    Y.AnimNative = Anim;","","}, '@VERSION@', {\"use\": [\"node\", \"base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"25":0,"28":0,"29":0,"47":0,"50":0,"52":0,"53":0,"57":0,"78":0,"86":0,"94":0,"96":0,"97":0,"98":0,"101":0,"102":0,"103":0,"105":0,"106":0,"109":0,"112":0,"115":0,"116":0,"120":0,"121":0,"122":0,"123":0,"124":0,"126":0,"130":0,"131":0,"132":0,"136":0,"137":0,"141":0,"142":0,"143":0,"144":0,"149":0,"157":0,"158":0,"159":0,"163":0,"164":0,"166":0,"188":0,"277":0,"341":0,"389":0,"399":0,"401":0,"402":0,"403":0,"404":0,"406":0,"417":0,"418":0,"420":0,"430":0,"431":0,"438":0,"449":0,"450":0,"451":0,"453":0,"458":0,"459":0,"460":0,"463":0,"465":0,"467":0,"468":0,"469":0,"470":0,"471":0,"472":0,"473":0,"474":0,"475":0,"476":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"485":0,"486":0,"488":0,"490":0,"492":0,"500":0,"503":0,"504":0,"505":0,"507":0,"508":0,"510":0,"511":0,"514":0,"515":0,"517":0,"518":0,"522":0,"523":0,"526":0,"529":0,"530":0,"534":0,"535":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"(anonymous 2):28":0,"Anim:46":0,"_easing:96":0,"(anonymous 3):102":0,"_toHyphen:101":0,"_insert:115":0,"_delete:136":0,"setter:156":0,"setter:187":0,"getter:276":0,"getter:340":0,"run:398":0,"pause:416":0,"stop:429":0,"(anonymous 4):478":0,"_start:437":0,"(anonymous 6):507":0,"(anonymous 5):503":0,"_render:499":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 112;
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredFunctions = 20;
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
* Browser support:
* http://caniuse.com/#feat=css-animation
* IE10+, FF5+, Chrome 4+, Safari/iOS 4+, Android 2.1+
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
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 25);
"use strict";
    /*global Y:true */
    /*jslint regexp: true*/
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 28);
var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function (prefix) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 2)", 28);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 29);
return Y.config.doc.body.style.hasOwnProperty(prefix + 'Animation');
        })[0],
        PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,
        ANIMATION_END_VENDORS = {
            webkit: 'webkitAnimationEnd',
            O: 'oAnimationEnd'
        },
        ANIMATION_END_EVENT = 'animationend',
        ANIMATION_END = ANIMATION_END_VENDORS[VENDOR] || ANIMATION_END_EVENT,

        /**
         * A class for constructing animation instances.
         * @class Anim
         * @for Anim
         * @constructor
         * @extends Base
         */
        Anim = function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "Anim", 46);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 47);
Anim.superclass.constructor.apply(this, arguments);
        };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 50);
Y.Node.DOM_EVENTS[ANIMATION_END] = 1;

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 52);
Anim.NAME = 'animNative';
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 53);
Anim.DIRECTIONS = {
        normal: ['normal', 'reverse'],
        alternate: ['alternate', 'alternate-reverse']
    };
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 57);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 78);
Anim.RE_UNITS = /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;

    /**
     * Regex of properties that should use the default unit.
     *
     * @property RE_DEFAULT_UNIT
     * @static
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 86);
Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;

    /**
     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.
     *
     * @property DEFAULT_UNIT
     * @static
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 94);
Anim.DEFAULT_UNIT = 'px';

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 96);
Anim._easing = function (name) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_easing", 96);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 97);
var e = Anim.EASINGS[name];
        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 98);
return 'cubic-bezier(' + e.p1 + ', ' + e.p2 + ', ' + e.p3 + ', ' + e.p4 + ')';
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 101);
Anim._toHyphen = function (property) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_toHyphen", 101);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 102);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function (m0, m1, m2, m3) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 3)", 102);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 103);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 105);
if (m3) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 106);
str += '-' + m3.toLowerCase();
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 109);
return str;
        });

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 112);
return property;
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 115);
Anim._insert = function (rule) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_insert", 115);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 116);
var doc = Y.config.doc,
            ruleNum,
            style;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 120);
if (doc.styleSheets && doc.styleSheets.length) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 121);
ruleNum = 0;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 122);
try {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 123);
if (doc.styleSheets[0].cssRules.length > 0) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 124);
ruleNum = doc.styleSheets[0].cssRules.length;
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 126);
doc.styleSheets[0].insertRule(rule, ruleNum);
            } catch (e) {
            }
        } else {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 130);
style = doc.createElement("style");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 131);
style.innerHTML = rule;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 132);
doc.head.appendChild(style);
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 136);
Anim._delete = function (ruleName) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_delete", 136);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 137);
var doc = Y.config.doc,
            cssrules = doc.all ? "rules" : "cssRules",
            i;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 141);
for (i = 0; i < doc.styleSheets[0][cssrules].length; i += 1) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 142);
if (doc.styleSheets[0][cssrules][i].name === ruleName) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 143);
doc.styleSheets[0].deleteRule(i);
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 144);
break;
            }
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 149);
Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 156);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 157);
if (node) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 158);
if (typeof node === 'string' || node.nodeType) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 159);
node = Y.one(node);
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 163);
this._node = node;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 164);
if (!node) {
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 166);
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
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 187);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 188);
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
        from: {
            value: {}
        },

        /**
         * The keyframes between 0 and 100%.
         *
         * Example: {'50%': {
         *   width: 200
         * }}
         *
         * @attribute to
         * @type Object
         */
        frames: {
            value: {}
        },

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
        to: {
            value: {}
        },

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
            getter: function () {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 276);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 277);
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
         * The number of times the animation should run. 'infinite' or integer.
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
         *
         * Note: no way to update this mid animation.
         *
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
            getter: function () {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "getter", 340);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 341);
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
         * Perspective depth
         * @attribute perspective
         * @type int
         * @default 1000
         */
        perspective: {
            value: 1000
        },

        /**
         * X/Y axis origin
         * @attribute perspectiveOrigin
         * @type String
         * @default 'center center'
         */
        perspectiveOrigin: {
            value: 'center center'
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 389);
Y.extend(Anim, Y.Base, {
        initializer: function (config) {
        },

        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */
        run: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "run", 398);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 399);
var node = this.get('node');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 401);
if (this.get('paused')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 402);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            } else {_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 403);
if (!this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 404);
this._start();
            }}
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 406);
return this;
        },

        /**
         * Pauses the animation and
         * freezes it in its current state and time.
         * Calling run() will continue where it left off.
         * @method pause
         * @chainable
         */
        pause: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "pause", 416);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 417);
if (this.get('running')) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 418);
this.get('node').setStyle(VENDOR + "AnimationPlayState", 'paused');
            }
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 420);
return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @param {Boolean} finish If true, the animation will move to the last frame
         * @chainable
         */
        stop: function (finish) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "stop", 429);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 430);
this.get('node').setStyle(VENDOR + "AnimationName", '');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 431);
return this;
        },

        /**
         * Initializes animation. Inserts keyframes into DOM and updates node styles.
         */
        _start: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_start", 437);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 438);
var node = this.get('node'),
                parent = node.get('parentNode'),
                name = 'anim-' + Y.guid(),
                direction = Anim.DIRECTIONS[this.get('direction')][+this.get('reverse')],
                from = this.get('from'),
                to = this.get('to'),
                frames = this.get('frames'),
                keyframes = {},
                res,
                frame;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 449);
keyframes['0%'] = from;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 450);
keyframes = Y.merge(keyframes, frames);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 451);
keyframes['100%'] = to;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 453);
res = this._render(node, name, keyframes);

            // TODO: Clear animations

            // Apply last animation frame styles
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 458);
if (this.get('iterations') !== 'infinite') {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 459);
frame = this.get('iterations') % (2 - this.get('reverse')) * 100;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 460);
node.setStyles(res.styles[frame + '%']);
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 463);
Anim._insert(res.css);

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 465);
this.set('iterationCount', 0);

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 467);
node.setStyle(VENDOR + "AnimationName", name);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 468);
node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 469);
node.setStyle(VENDOR + "AnimationTimingFunction", this.get('easing'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 470);
node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 471);
node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 472);
node.setStyle(VENDOR + "AnimationDirection", direction);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 473);
node.setStyle(VENDOR + "AnimationPlayState", 'running');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 474);
node.setStyle(VENDOR + "BackfaceVisibility", this.get('backfaceVisibility'));
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 475);
parent.setStyle(VENDOR + "Perspective", this.get('perspective') + "px");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 476);
parent.setStyle(VENDOR + "PerspectiveOrigin", this.get('perspectiveOrigin'));

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 478);
node.on(ANIMATION_END, function (e) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 4)", 478);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 479);
node.setStyle(VENDOR + "AnimationName", "none");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 480);
node.setStyle(VENDOR + "AnimationDuration", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 481);
node.setStyle(VENDOR + "AnimationTimingFunction", "ease");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 482);
node.setStyle(VENDOR + "AnimationDelay", "0s");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 483);
node.setStyle(VENDOR + "AnimationIterationCount", "1");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 484);
node.setStyle(VENDOR + "AnimationDirection", "normal");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 485);
node.setStyle(VENDOR + "AnimationPlayState", "running");
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 486);
node.setStyle(VENDOR + "BackfaceVisibility", 'visible');

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 488);
this.set('iterationCount', this.get('iterations'));

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 490);
Anim._delete(name);

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 492);
this.fire('end', {elapsed: this.get('elapsedTime')});
            }, this);
        },

        /**
         * Generate CSS keyframes string.
         */
        _render: function (node, name, keyframes) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_render", 499);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 500);
var css = ['@' + PREFIX + 'keyframes ' + name + ' {'],
                styles = {};

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 503);
Y.Object.each(keyframes, function (props, key) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 5)", 503);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 504);
css.push('\t' + key + ' {');
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 505);
styles[key] = {};

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 507);
Y.Object.each(props, function (value, prop) {
                    _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 6)", 507);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 508);
var parsed;

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 510);
if (typeof value === 'function') {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 511);
value = value.call(this, node);
                    }

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 514);
if (Anim.RE_DEFAULT_UNIT.test(prop)) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 515);
parsed = Anim.RE_UNITS.exec(value);

                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 517);
if (parsed && !parsed[2]) {
                            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 518);
value += Anim.DEFAULT_UNIT;
                        }
                    }

                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 522);
styles[key][prop] = value;
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 523);
css.push('\t\t' + Anim._toHyphen(prop) + ': ' + value + ';');
                }, this);

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 526);
css.push('\t}');
            }, this);

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 529);
css.push('}');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 530);
return {css: css.join('\n'), styles: styles};
        }
    });

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 534);
Y.Anim = Anim;
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 535);
Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
