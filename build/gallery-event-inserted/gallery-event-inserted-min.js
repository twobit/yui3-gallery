YUI.add("gallery-event-inserted",function(d){var c={camel:["","WebKit","Moz","O","MS"].filter(function(e){return window[e+"CSSKeyframesRule"];})[0]};c.lower=c.camel.toLowerCase();c.css=c.camel?"-"+c.lower+"-":c.camel;var b={ANIMATION_START_VENDORS:{webkit:"webkitAnimationStart",o:"oAnimationStart"},ANIMATION_START:"animationstart",STYLESHEET:null,_init:function(){b.ANIMATION_START=b.ANIMATION_START_VENDORS[c.lower]||b.ANIMATION_START;d.Node.DOM_EVENTS[b.ANIMATION_START]=1;b.STYLESHEET=d.Node.create('<style type="text/css">@'+c.css+"keyframes INSERTED {"+"from {clip: rect(1px, auto, auto, auto);} to {clip: rect(0px, auto, auto, auto);}"+"}</style>");d.one("head").append(b.STYLESHEET);},processArgs:function(f,e){return f.splice(2,1)[0];},on:function(h,f,g,e){var j=e?"delegate":"on",i=f._extra+"{"+c.css+"animation-duration: 0.0001s; "+c.css+"animation-name: INSERTED !important;}";f._handle=h[j](b.ANIMATION_START,d.bind(function(k){if(k.target.get("tagName").toLowerCase()===f._extra){g.fire({target:k.target});}},this),e);b.STYLESHEET.get("sheet").insertRule(i,0);},delegate:function(){this.on.apply(this,arguments);},detach:function(g,e,f){e._handle.detach();},detachDelegate:function(){this.detach.apply(this,arguments);}};var a={TAGS:{},_init:function(){d.Node.DOM_EVENTS.DOMNodeInserted=1;},processArgs:function(f,e){return f.splice(2,1)[0];},on:function(h,f,g,e){var i=e?"delegate":"on";if(!a.TAGS[f._extra]){d.all(f._extra).each(function(j){g.fire({target:j});});}f._handle=h[i]("DOMNodeInserted",d.bind(function(j){if(j.target.get("tagName").toLowerCase()===f._extra){g.fire({target:j.target});}},this),e);},delegate:function(){this.on.apply(this,arguments);},detach:function(g,e,f){e._handle.detach();},detachDelegate:function(){this.detach.apply(this,arguments);}};d.Event.define("inserted",c.camel?b:a);},"@VERSION@",{skinnable:false,requires:["event","node"]});