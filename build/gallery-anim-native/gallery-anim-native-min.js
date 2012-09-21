YUI.add("gallery-anim-native",function(e,t){var n=["","webkit","Moz","O","ms"].filter(function(t){return t+"Animation"in e.config.doc.body.style})[0],r=n?"-"+n.toLowerCase()+"-":n,i=function(){i.superclass.constructor.apply(this,arguments)};i.NAME="animNative",i.DIRECTIONS={normal:["normal","reverse"],alternate:["alternate","alternate-reverse"]},i._toHyphen=function(e){return e=e.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(e,t,n,r){var i=(t?"-"+t.toLowerCase():"")+n;return r&&(i+="-"+r.toLowerCase()),i}),e},i._render=function(e,t){var n="@"+r+"keyframes "+e+" {\n",s,o,u;for(s in t)if(t.hasOwnProperty(s)){o=t[s],n+="	"+s+" {\n";for(u in o)o.hasOwnProperty(u)&&(n+="		"+i._toHyphen(u)+": "+o[u]+";\n");n+="	}\n"}return n+="}\n",n},i._insert=function(e){if(document.styleSheets&&document.styleSheets.length){var t=0;try{document.styleSheets[0].cssRules.length>0&&(t=document.styleSheets[0].cssRules.length),document.styleSheets[0].insertRule(e,t)}catch(n){console.warn(n.message,e)}}else{var r=document.createElement("style");r.innerHTML=e,document.head.appendChild(r)}},i.ATTRS={node:{setter:function(t){return t&&(typeof t=="string"||t.nodeType)&&(t=e.one(t)),this._node=t,!t,t}},duration:{value:1},easing:{},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{},delay:{value:0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{readOnly:!0,value:!1},reverse:{value:!1}},e.extend(i,e.Base,{initializer:function(e){var t=e.from||{},n=e.to||{},r;this._frames={"0%":t};for(r in e)e.hasOwnProperty(r)&&r.substr(-1)==="%"&&(this._frames[r]=e[r]);this._frames["100%"]=n},run:function(){var t="anim-"+e.guid();css=i._render(t,this._frames),node=this.get("node"),direction=i.DIRECTIONS[this.get("direction")][+this.get("reverse")],console.log(css),i._insert(css),node.setStyle(n+"AnimationName",t),node.setStyle(n+"AnimationDuration",this.get("duration")+"s"),node.setStyle(n+"AnimationDelay",this.get("delay")+"s"),node.setStyle(n+"AnimationIterationCount",this.get("iterations")),node.setStyle(n+"AnimationDirection",direction)}}),e.Anim=i,e.AnimNative=i},"@VERSION@",{use:["node","base"]});
