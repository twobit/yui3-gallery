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
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/**","* The Animation Utility provides an API for creating advanced transitions.","* @module anim-native","*/","","/**","* Provides the CSS3 Native Anim class, for animating CSS properties.","*","* @module anim","* @submodule anim-native","*/","var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {","        return prefix + 'Animation' in Y.config.doc.body.style;","    })[0],","    PREFIX = VENDOR ? '-' + VENDOR.toLowerCase() + '-' : VENDOR,","","    /**","     * A class for constructing animation instances.","     * @class Anim","     * @for Anim","     * @constructor","     * @extends Base","     */","    Anim = function () {","        Anim.superclass.constructor.apply(this, arguments);","    };","","    Anim.NAME = 'animNative';","    ","    Anim._toHyphen = function (property) {","        property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","            var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","            ","            if (m3) {","                str += '-' + m3.toLowerCase();","            }","","            return str;","        });","","        return property;","    };","","    Anim._render = function (name, keyframes) {","        var css = '@' + PREFIX + 'keyframes ' + name + ' {\\n',","            key,","            props,","            prop;","","        for (key in keyframes) {","            if (keyframes.hasOwnProperty(key)) {","                props = keyframes[key];","                css += '\\t' + key + ' {\\n';","                ","                for (prop in props) {","                    if (props.hasOwnProperty(prop)) {","                        css += '\\t\\t' + Anim._toHyphen(prop) + ': ' + props[prop] + ';\\n';","                    }","                }","","                css += '\\t}\\n';","            }","        }","","        css += '}\\n';","","        return css;","    };","","    /*","     * https://github.com/blackberry/Alice/blob/master/js/src/alice.core.js","     */","    Anim._insert = function(rule) {","        if (document.styleSheets && document.styleSheets.length) {","            var ruleNum = 0;","            try {","                if (document.styleSheets[0].cssRules.length > 0){","                    ruleNum = document.styleSheets[0].cssRules.length;","                }","                document.styleSheets[0].insertRule(rule, ruleNum);","            } catch (ex) {","                console.warn(ex.message, rule);","            }","        } else {","            var style = document.createElement(\"style\");","            style.innerHTML = rule;","            document.head.appendChild(style);","        }","    };","","    Anim.ATTRS = {","        /**","         * The object to be animated.","         * @attribute node","         * @type Node","         */","        node: {","            setter: function (node) {","                if (node) {","                    if (typeof node === 'string' || node.nodeType) {","                        node = Y.one(node);","                    }","                }","","                this._node = node;","                if (!node) {","                }","                return node;","            }","        },","","        /**","         * The length of the animation.  Defaults to \"1\" (second).","         * @attribute duration","         * @type NUM","         */","        duration: {","            value: 1","        },","","        /**","         * The method that will provide values to the attribute(s) during the animation.","         * Defaults to \"Easing.easeNone\".","         * @attribute easing","         * @type Function","         */","        easing: {","            /* FIXME */","        },","","        /**","         * The starting values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * If a function is used, the return value becomes the from value.","         * If no from value is specified, the DEFAULT_GETTER will be used.","         * Supports any unit, provided it matches the \"to\" (or default)","         * unit (e.g. `{width: '10em', color: 'rgb(0, 0, 0)', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100}, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute from","         * @type Object","         */","        from: {},","","        /**","         * The ending values for the animated properties.","         *","         * Fields may be strings, numbers, or functions.","         * Supports any unit, provided it matches the \"from\" (or default)","         * unit (e.g. `{width: '50%', color: 'red', borderColor: '#ccc'}`).","         *","         * If using the default ('px' for length-based units), the unit may be omitted","         * (e.g. `{width: 100, borderColor: 'ccc'}`, which defaults to pixels","         * and hex, respectively).","         *","         * @attribute to","         * @type Object","         */","        to: {},","","        /**","         * Date stamp for the first frame of the animation.","         * @attribute startTime","         * @type Int","         * @default 0 ","         * @readOnly","         */","        startTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Current time the animation has been running.","         * @attribute elapsedTime","         * @type Int","         * @default 0 ","         * @readOnly","         */","        elapsedTime: {","            value: 0,","            readOnly: true","        },","","        /**","         * Whether or not the animation is currently running.","         * @attribute running ","         * @type Boolean","         * @default false ","         * @readOnly","         */","        running: {","            /* FIXME */","        },","","        /**","         * The number of seconds to delay the animation","         * @attribute delay","         * @type Int","         * @default 0","         */","        delay: {","            value: 0","        },","","        /**","         * The number of times the animation should run ","         * @attribute iterations","         * @type Int","         * @default 1 ","         */","        iterations: {","            value: 1","        },","","        /**","         * The number of iterations that have occurred.","         * Resets when an animation ends (reaches iteration count or stop() called). ","         * @attribute iterationCount","         * @type Int","         * @default 0","         * @readOnly","         */","        iterationCount: {","            value: 0,","            readOnly: true","        },","","        /**","         * How iterations of the animation should behave. ","         * Possible values are \"normal\" and \"alternate\".","         * Normal will repeat the animation, alternate will reverse on every other pass.","         *","         * @attribute direction","         * @type String","         * @default \"normal\"","         */","        direction: {","            value: 'normal' // | alternate (fwd on odd, rev on even per spec)","        },","","        /**","         * Whether or not the animation is currently paused.","         * @attribute paused ","         * @type Boolean","         * @default false ","         * @readOnly","         */","        paused: {","            readOnly: true,","            value: false","        },","","        /**","         * If true, animation begins from last frame","         * @attribute reverse","         * @type Boolean","         * @default false ","         */","        reverse: {","            value: false","        }","    };","","    Y.extend(Anim, Y.Base, {","        initializer: function (config) {","            var from = config.from || {},","                to = config.to || {},","                key;","","            console.log(VENDOR, PREFIX);","","            this._frames = {'0%': from};","","            for (key in config) {","                if (config.hasOwnProperty(key) && key.substr(-1) === '%') {","                    this._frames[key] = config[key];","                }","            }","","            this._frames['100%'] = to;","        },","","        run: function () {","            var name = 'anim-' + Y.guid();","                css = Anim._render(name, this._frames),","                node = this.get('node');","","            console.log(css);","            Anim._insert(css);","","            node.setStyle(VENDOR + \"AnimationName\", name);","            node.setStyle(VENDOR + \"AnimationDuration\", this.get('duration') + 's');","            node.setStyle(VENDOR + \"AnimationDelay\", this.get('delay') + 's');","            node.setStyle(VENDOR + \"AnimationIterationCount\", this.get('iterations'));","","            /*","            elem.style[prefix + \"AnimationTimingFunction\"] = alice.format.easing(timing);","            elem.style[prefix + \"AnimationIterationCount\"] = iteration;","            elem.style[prefix + \"AnimationDirection\"] = direction;","            elem.style[prefix + \"AnimationPlayState\"] = playstate;","            elem.style[prefix + \"BackfaceVisibility\"] = backfaceVisibility;*/","        }","    });","","    Y.AnimNative = Anim;","","}, '@VERSION@', {\"use\": [\"node\", \"base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"14":0,"15":0,"27":0,"30":0,"32":0,"33":0,"34":0,"36":0,"37":0,"40":0,"43":0,"46":0,"47":0,"52":0,"53":0,"54":0,"55":0,"57":0,"58":0,"59":0,"63":0,"67":0,"69":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"82":0,"84":0,"87":0,"88":0,"89":0,"93":0,"101":0,"102":0,"103":0,"107":0,"108":0,"110":0,"271":0,"273":0,"277":0,"279":0,"281":0,"282":0,"283":0,"287":0,"291":0,"292":0,"295":0,"296":0,"298":0,"299":0,"300":0,"301":0,"312":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"(anonymous 2):14":0,"Anim:26":0,"(anonymous 3):33":0,"_toHyphen:32":0,"_render:46":0,"_insert:75":0,"setter:100":0,"initializer:272":0,"run:290":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 59;
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 1);
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
_yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 14);
var VENDOR = ['', 'webkit', 'Moz', 'O', 'ms'].filter(function(prefix) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 2)", 14);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 15);
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
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "Anim", 26);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 27);
Anim.superclass.constructor.apply(this, arguments);
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 30);
Anim.NAME = 'animNative';
    
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 32);
Anim._toHyphen = function (property) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_toHyphen", 32);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 33);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 3)", 33);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 34);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
            
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 36);
if (m3) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 37);
str += '-' + m3.toLowerCase();
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 40);
return str;
        });

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 43);
return property;
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 46);
Anim._render = function (name, keyframes) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_render", 46);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 47);
var css = '@' + PREFIX + 'keyframes ' + name + ' {\n',
            key,
            props,
            prop;

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 52);
for (key in keyframes) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 53);
if (keyframes.hasOwnProperty(key)) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 54);
props = keyframes[key];
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 55);
css += '\t' + key + ' {\n';
                
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 57);
for (prop in props) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 58);
if (props.hasOwnProperty(prop)) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 59);
css += '\t\t' + Anim._toHyphen(prop) + ': ' + props[prop] + ';\n';
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 63);
css += '\t}\n';
            }
        }

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 67);
css += '}\n';

        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 69);
return css;
    };

    /*
     * https://github.com/blackberry/Alice/blob/master/js/src/alice.core.js
     */
    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 75);
Anim._insert = function(rule) {
        _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "_insert", 75);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 76);
if (document.styleSheets && document.styleSheets.length) {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 77);
var ruleNum = 0;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 78);
try {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 79);
if (document.styleSheets[0].cssRules.length > 0){
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 80);
ruleNum = document.styleSheets[0].cssRules.length;
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 82);
document.styleSheets[0].insertRule(rule, ruleNum);
            } catch (ex) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 84);
console.warn(ex.message, rule);
            }
        } else {
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 87);
var style = document.createElement("style");
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 88);
style.innerHTML = rule;
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 89);
document.head.appendChild(style);
        }
    };

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 93);
Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function (node) {
                _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "setter", 100);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 101);
if (node) {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 102);
if (typeof node === 'string' || node.nodeType) {
                        _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 103);
node = Y.one(node);
                    }
                }

                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 107);
this._node = node;
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 108);
if (!node) {
                }
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 110);
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

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 271);
Y.extend(Anim, Y.Base, {
        initializer: function (config) {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "initializer", 272);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 273);
var from = config.from || {},
                to = config.to || {},
                key;

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 277);
console.log(VENDOR, PREFIX);

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 279);
this._frames = {'0%': from};

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 281);
for (key in config) {
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 282);
if (config.hasOwnProperty(key) && key.substr(-1) === '%') {
                    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 283);
this._frames[key] = config[key];
                }
            }

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 287);
this._frames['100%'] = to;
        },

        run: function () {
            _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "run", 290);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 291);
var name = 'anim-' + Y.guid();
                _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 292);
css = Anim._render(name, this._frames),
                node = this.get('node');

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 295);
console.log(css);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 296);
Anim._insert(css);

            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 298);
node.setStyle(VENDOR + "AnimationName", name);
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 299);
node.setStyle(VENDOR + "AnimationDuration", this.get('duration') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 300);
node.setStyle(VENDOR + "AnimationDelay", this.get('delay') + 's');
            _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 301);
node.setStyle(VENDOR + "AnimationIterationCount", this.get('iterations'));

            /*
            elem.style[prefix + "AnimationTimingFunction"] = alice.format.easing(timing);
            elem.style[prefix + "AnimationIterationCount"] = iteration;
            elem.style[prefix + "AnimationDirection"] = direction;
            elem.style[prefix + "AnimationPlayState"] = playstate;
            elem.style[prefix + "BackfaceVisibility"] = backfaceVisibility;*/
        }
    });

    _yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 312);
Y.AnimNative = Anim;

}, '@VERSION@', {"use": ["node", "base"]});
