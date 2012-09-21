YUI.add("gallery-anim-native",function(t,n){var r=["","webkit","Moz","O","ms"].filter(function(e){return e+"Animation"in t.config.doc.body.style})[0],i=r?"-"+r.toLowerCase()+"-":r,s={webkit:"webkitAnimationEnd",O:"oAnimationEnd"},o="animationend",u=s[r]||o;Anim=function(){Anim.superclass.constructor.apply(this,arguments)},t.Node.DOM_EVENTS[u]=1,Anim.NAME="animNative",Anim.DIRECTIONS={normal:["normal","reverse"],alternate:["alternate","alternate-reverse"]},Anim.EASINGS={easeNone:{p1:.25,p2:.25,p3:.75,p4:.75},easeIn:{p1:.42,p2:0,p3:1,p4:1},easeOut:{p1:0,p2:0,p3:.58,p4:1},easeBoth:{p1:.42,p2:0,p3:.58,p4:1},easeInStrong:{p1:.895,p2:.03,p3:.685,p4:.22},easeOutStrong:{p1:.165,p2:.84,p3:.44,p4:1},easeBothStrong:{p1:.77,p2:0,p3:.175,p4:1},backOut:{p1:.175,p2:.885,p3:.32,p4:1.275},backBoth:{p1:.68,p2:-0.55,p3:.265,p4:1.55},elasticIn:{p1:.25,p2:.25,p3:.75,p4:.75},elasticOut:{p1:.25,p2:.25,p3:.75,p4:.75},elasticBoth:{p1:.25,p2:.25,p3:.75,p4:.75},backIn:{p1:.25,p2:.25,p3:.75,p4:.75},bounceIn:{p1:.25,p2:.25,p3:.75,p4:.75},bounceOut:{p1:.25,p2:.25,p3:.75,p4:.75},bounceBoth:{p1:.25,p2:.25,p3:.75,p4:.75}},Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/,Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,Anim.DEFAULT_UNIT="px",Anim._easing=function(t){return e=Anim.EASINGS[t],"cubic-bezier("+e.p1+", "+e.p2+", "+e.p3+", "+e.p4+")"},Anim._toHyphen=function(e){return e=e.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(e,t,n,r){var i=(t?"-"+t.toLowerCase():"")+n;return r&&(i+="-"+r.toLowerCase()),i}),e},Anim._insert=function(e){var n=t.config.doc;if(n.styleSheets&&n.styleSheets.length){var r=0;try{n.styleSheets[0].cssRules.length>0&&(r=n.styleSheets[0].cssRules.length),n.styleSheets[0].insertRule(e,r)}catch(i){}}else{var s=n.createElement("style");s.innerHTML=e,n.head.appendChild(s)}},Anim._delete=function(e){var n=t.config.doc,r=n.all?"rules":"cssRules",i;for(i=0;i<n.styleSheets[0][r].length;i+=1)if(n.styleSheets[0][r][i].name===e){n.styleSheets[0].deleteRule(i);break}},Anim.ATTRS={node:{setter:function(e){return e&&(typeof e=="string"||e.nodeType)&&(e=t.one(e)),this._node=e,!e,e}},duration:{value:1},easing:{value:"easeNone",setter:function(e){return Anim._easing(e)}},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{getter:function(){return this.get("node").getStyle(r+"AnimationName")!=="none"},value:!1,readOnly:!0},delay:{value:0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{getter:function(){return this.get("node").getStyle(r+"AnimationPlayState")==="paused"},readOnly:!0,value:!1},reverse:{value:!1},backfaceVisibility:{value:"visible"}},t.extend(Anim,t.Base,{initializer:function(e){var t=e.from||{},n=e.to||{},r;this._frames={"0%":t};for(r in e)e.hasOwnProperty(r)&&r.substr(-1)==="%"&&(this._frames[r]=e[r]);this._frames["100%"]=n},run:function(){var e=this.get("node");return this.get("paused")?e.setStyle(r+"AnimationPlayState","running"):this.get("running")||this._start(),this},pause:function(){return this.get("running")&&this.get("node").setStyle(r+"AnimationPlayState","paused"),this},stop:function(e){return this.get("node").setStyle(r+"AnimationName",""),this},_start:function(){var e=this.get("node"),n="anim-"+t.guid(),i=Anim.DIRECTIONS[this.get("direction")][+this.get("reverse")];Anim._insert(this._render(e,n,this._frames)),e.setStyle(r+"AnimationName",n),e.setStyle(r+"AnimationDuration",this.get("duration")+"s"),e.setStyle(r+"AnimationTimingFunction",this.get("easing")),e.setStyle(r+"AnimationDelay",this.get("delay")+"s"),e.setStyle(r+"AnimationIterationCount",this.get("iterations")),e.setStyle(r+"AnimationDirection",i),e.setStyle(r+"AnimationPlayState","running"),e.setStyle(r+"BackfaceVisibility",this.get("backfaceVisibility")),e.on(u,function(t){e.setStyle(r+"AnimationName","none"),e.setStyle(r+"AnimationDuration","0s"),e.setStyle(r+"AnimationTimingFunction","ease"),e.setStyle(r+"AnimationDelay","0s"),e.setStyle(r+"AnimationIterationCount","1"),e.setStyle(r+"AnimationDirection","normal"),e.setStyle(r+"AnimationPlayState","running"),e.setStyle(r+"BackfaceVisibility","visible"),Anim._delete(n)},this)},_render:function(e,t,n){var r="@"+i+"keyframes "+t+" {\n",s,o,u,a,f;for(s in n)if(n.hasOwnProperty(s)){o=n[s],r+="	"+s+" {\n";for(u in o)o.hasOwnProperty(u)&&(a=o[u],typeof a=="function"&&(a=a.call(this,e)),Anim.RE_DEFAULT_UNIT.test(u)&&(f=Anim.RE_UNITS.exec(a),f&&!f[2]&&(a+=Anim.DEFAULT_UNIT)),r+="		"+Anim._toHyphen(u)+": "+a+";\n");r+="	}\n"}return r+="}\n",r}}),t.Anim=Anim,t.AnimNative=Anim},"@VERSION@",{use:["node","base"]});
