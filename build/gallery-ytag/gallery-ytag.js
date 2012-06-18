YUI.add('gallery-ytag', function(Y) {

// X-Tag (https://raw.github.com/mozilla/x-tag/master/x-tag.js)
(function(){var a={js:["","O","MS","Moz","WebKit"].filter(function(a){return window[a+"CSSKeyframesRule"]})[0]};a.lowercase=a.js.toLowerCase(),a.js=="WebKit"&&(a.js=a.lowercase),a.css=a.js?"-"+a.lowercase+"-":a.js,a.properties="{"+a.css+"animation-duration: 0.0001s;"+a.css+"animation-name: nodeInserted !important;"+"}";var b=document.getElementsByTagName("head")[0],c=document.createElement("style"),d=document.createTextNode("@"+a.css+"keyframes nodeInserted {"+"from { clip: rect(1px, auto, auto, auto); } to { clip: rect(0px, auto, auto, auto); }"+"}");c.type="text/css",c.appendChild(d),b.appendChild(c);var e=function(a,b,c){switch(xtag.typeOf(c)){case"object":xtag.typeOf(a[b])=="object"?xtag.merge(a[b],c):a[b]=xtag.clone(c);break;case"array":a[b]=xtag.toArray(c);break;default:a[b]=c}return a},f=function(a,b,c){return function(d){!!~b.match(/(\d+)/g).indexOf(String(d.keyCode))==(c=="keypass")&&a.apply(this,xtag.toArray(arguments))}};xtag={namespace:"x-",prefix:a,tags:{},callbacks:{},sheet:c.sheet,anchor:document.createElement("a"),tagOptions:{content:"",mixins:[],events:{},methods:{},getters:{},setters:{},onCreate:function(){},onInsert:function(){}},eventMap:{animationstart:["animationstart","oAnimationStart","MSAnimationStart","webkitAnimationStart"],transitionend:["transitionend","oTransitionEnd","MSTransitionEnd","webkitTransitionEnd"],tap:["ontouchend"in document?"touchend":"mouseup"]},pseudos:{delegate:function(a,b,c,d){var e=xtag.query(this,b).filter(function(a){return a==d.target||a.contains?a.contains(d.target):!1})[0];return e?function(){a.apply(e,xtag.toArray(arguments))}:!1},keystop:f,keypass:f,retain:function(a,b,c,d,e){var f=e[d];return function(){a(),typeof f!="undefined"&&(e[d]=f)}},preventable:function(a,b,c){return function(b){b.defaultPrevented||a.apply(this,xtag.toArray(arguments))}}},mixins:{request:{onInsert:function(){this.src=this.getAttribute("src")},getters:{"dataready:retain":function(){return this.xtag.dataready}},setters:{src:function(a){a&&(this.setAttribute("src",a),xtag.request(this,{url:a,method:"GET"}))},"dataready:retain":function(a){this.xtag.dataready=a,this.xtag.request&&this.xtag.request.readyState==4&&a.call(this,this.xtag.request)}}}},typeOf:function(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},toArray:function(a){var b=Array.prototype.slice.call(a,0);return b.hasOwnProperty?b:[a]},hasClass:function(a,b){return!!~a.className.split(" ").indexOf(b)},addClass:function(a,b){return xtag.hasClass(a,b)||(a.className=a.className+" "+b),a},removeClass:function(a,b){return a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1"),a},toggleClass:function(a,b){return xtag.hasClass(a,b)?xtag.removeClass(a,b):xtag.addClass(a,b)},query:function(a,b){return xtag.toArray(a.querySelectorAll(b))},clone:function(a){var b=function(){};return b.prototype=a,new b},merge:function(a,b,c){if(xtag.typeOf(b)=="string")return e(a,b,c);for(var d=1,f=arguments.length;d<f;d++){var g=arguments[d];for(var h in g)e(a,h,g[h])}return a},wrap:function(a,b){return function(){var c=xtag.toArray(arguments);a.apply(this,c),b.apply(this,c)}},skipTransition:function(a,b,c){var d=xtag.prefix.js+"TransitionDuration";a.style[d]="0.001s",b.call(c),xtag.addEvent(a,"transitionend",function(){a.style[d]=""})},tagCheck:function(a){return a.tagName.match(new RegExp(xtag.namespace,"i"))},getTag:function(a){return(a.tagName?a.tagName.split("-")[1]:"").toLowerCase()},getOptions:function(a){return xtag.tags[xtag.getTag(a)]||xtag.tagOptions},register:function(a,b){xtag.attachKeyframe("nodeInserted",xtag.namespace+a),xtag.tags[a]=xtag.merge({},xtag.tagOptions,xtag.applyMixins(b))},attachKeyframe:function(b,c){xtag.sheet.insertRule(c+a.properties,0)},extendElement:function(a){if(!a.xtag){a.xtag={};var b=xtag.getOptions(a);for(var c in b.methods)xtag.bindMethods(a,c,b.methods[c]);for(var c in b.setters)xtag.applyAccessor(a,"set",c,b.setters[c]);for(var c in b.getters)xtag.applyAccessor(a,"get",c,b.getters[c]);xtag.addEvents(a,b.events,b.eventMap),b.content&&(a.innerHTML=b.content),b.onCreate.call(a)}},bindMethods:function(a,b,c){a.xtag[b]=function(){return c.apply(a,xtag.toArray(arguments))}},applyMixins:function(a){return a.mixins&&a.mixins.forEach(function(b){var c=xtag.mixins[b];for(var d in c)switch(xtag.typeOf(c[d])){case"function":a[d]=a[d]?xtag.wrap(a[d],c[d]):c[d];break;case"object":a[d]=xtag.merge({},c[d],a[d]);break;default:a[d]=c[d]}}),a},applyAccessor:function(a,b,c,d){var b=b[0].toUpperCase(),e=c.split(":")[0];xtag.applyPseudos(a,c,function(){a["__define"+b+"etter__"](e,d)},[e,a])},applyPseudos:function(a,b,c,d){var e=c,d=xtag.toArray(d);b.match(":")&&b.replace(/:(\w*)(?:\(([^\)]*)\))?/g,function(b,f,g){if(e){var h=xtag.toArray(d);h.unshift(e,g,f);var i=xtag.pseudos[f].apply(a,h);e=i===!1?!1:i||c}}),e&&e.apply(a,d)},request:function(a,c){xtag.clearRequest(a);var d=a.xtag.request||{};a.xtag.request=c;var e=a.xtag.request,f=a.getAttribute("data-callback-key")||"callback=xtag.callbacks.";if(xtag.fireEvent(a,"beforerequest")===!1)return!1;if(d.url&&!c.update&&d.url.replace(new RegExp("&?("+f+"x[0-9]+)"),"")==a.xtag.request.url)return a.xtag.request=d,!1;a.setAttribute("src",a.xtag.request.url),xtag.anchor.href=c.url;if(xtag.anchor.hostname==window.location.hostname)e=xtag.merge(new XMLHttpRequest,e),e.onreadystatechange=function(){a.setAttribute("data-readystate",e.readyState),e.readyState==4&&e.status<400&&xtag.requestCallback(a,e)},["error","abort","load"].forEach(function(b){e["on"+b]=function(c){c.request=e,xtag.fireEvent(a,b,c)}}),e.open(e.method,e.url,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e.send();else{var g=e.callbackID="x"+(new Date).getTime();a.setAttribute("data-readystate",e.readyState=0),xtag.callbacks[g]=function(b){e.status=200,e.readyState=4,e.responseText=b,xtag.requestCallback(a,e),delete xtag.callbacks[g],xtag.clearRequest(a)},e.script=document.createElement("script"),e.script.type="text/javascript",e.script.src=c.url=c.url+(~c.url.indexOf("?")?"&":"?")+f+g,e.script.onerror=function(b){a.setAttribute("data-readystate",e.readyState=4),a.setAttribute("data-requeststatus",e.status=400),xtag.fireEvent(a,"error",b)},b.appendChild(e.script)}a.xtag.request=e},requestCallback:function(a,b){if(b!=a.xtag.request)return xtag;a.setAttribute("data-readystate",b.readyState),a.setAttribute("data-requeststatus",b.status),xtag.fireEvent(a,"dataready",{request:b}),a.dataready&&a.dataready.call(a,b)},clearRequest:function(a){var c=a.xtag.request;if(!c)return xtag;c.script&&~xtag.toArray(b.children).indexOf(c.script)?b.removeChild(c.script):c.abort&&c.abort()},addEvent:function(a,b,c,d){var e=b.split(":")[0],f=(d||xtag.eventMap||{})[e]||[e];f.forEach(function(d){a.addEventListener(d,function(d){xtag.applyPseudos(a,b,c,[d,a])},!!~["focus","blur"].indexOf(d))})},addEvents:function(a,b,c){for(var d in b)xtag.addEvent(a,d,b[d],c)},fireEvent:function(a,b,c){var d=document.createEvent("Event");d.initEvent(b,!0,!0),a.dispatchEvent(xtag.merge(d,c))}};var g=document.createElement;document.createElement=function(a){var b=g.call(this,a);return xtag.tagCheck(b)&&xtag.extendElement(b),b};var h=function(a){a.animationName=="nodeInserted"&&xtag.tagCheck(a.target)&&(xtag.extendElement(a.target),xtag.getOptions(a.target).onInsert.call(a.target))};xtag.eventMap.animationstart.forEach(function(a){document.addEventListener(a,h,!1)})})()

xtag.namespace = 'y-';

var REGISTRY = {
    button: {
        content: '<div></div>',
        requires: ['button'],
        create: function(Y, config) {
            return new Y.Button(config);
        }
    },
    dial: {
        content: '<div class="yui3-skin-sam"></div>',
        requires: ['dial'],
        create: function(Y, config) {
            return new Y.Dial(config);
        }
    },
    suggest: {
        content: '<div class="yui3-skin-sam"><input type="text" /></div>',
        selector: 'input',
        requires: ['autocomplete', 'autocomplete-highlighters'],
        create: function(Y, config) {
            config.srcNode.plug(Y.Plugin.AutoComplete, {
                resultHighlighter: 'phraseMatch',
                source: 'select * from search.suggest where query="{query}"',
                yqlEnv: 'http://pieisgood.org/yql/tables.env'
            });
            return config.srcNode;
        }
    }
};

Y.ytag = {
    register: function(tag, options) {
        var instance;

        xtag.register(tag, {
            content: options.content,
            onInsert: function() {
                var config = Y.merge(this.dataset, {
                    srcNode: Y.one(this).one(options.selector ? options.selector : '*'),
                    render: true
                });

                Y.use.apply(Y, options.requires.concat(function(Y) {
                    instance = options.create(Y, config);
                }));
            },
            getters: {
                ytag: function() {
                    return instance;
                }
            }
        });
    }
};

Y.Object.each(REGISTRY, function(options, tag) {
    Y.ytag.register(tag, options);
});


}, '@VERSION@' ,{skinnable:false, requires:['node']});
