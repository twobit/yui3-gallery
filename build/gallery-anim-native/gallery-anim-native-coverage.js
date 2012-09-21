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
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].code=["YUI.add('gallery-anim-native', function (Y, NAME) {","","/* global Y */","","Y.AnimNative = function () {","    Y.AnimNative.superclass.constructor.apply(this, arguments);","};","","Y.extend(Y.AnimNative, Y.Base, {","","});","","}, '@VERSION@', {\"use\": [\"yui-base\"]});"];
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].lines = {"1":0,"5":0,"6":0,"9":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].functions = {"AnimNative:5":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredLines = 4;
_yuitest_coverage["build/gallery-anim-native/gallery-anim-native.js"].coveredFunctions = 2;
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 1);
YUI.add('gallery-anim-native', function (Y, NAME) {

/* global Y */

_yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 5);
Y.AnimNative = function () {
    _yuitest_coverfunc("build/gallery-anim-native/gallery-anim-native.js", "AnimNative", 5);
_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 6);
Y.AnimNative.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/gallery-anim-native/gallery-anim-native.js", 9);
Y.extend(Y.AnimNative, Y.Base, {

});

}, '@VERSION@', {"use": ["yui-base"]});
