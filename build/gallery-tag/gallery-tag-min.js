YUI.add("gallery-tag",function(e){var d=e.namespace("Tag"),c={};d.register=function(g,f){d.unregister(g);c[g]={mixin:f,handle:e.on("inserted",function(h){h.target.fire("tag:inserted");},g)};};d.unregister=function(f){if(c[f]){c[f].handle.detach();delete c[f];}};d.registered=function(f){return f?f in c:Object.keys(c);};function b(f){b.superclass.constructor.apply(this,arguments);}b.NAME="tagPlugin";b.NS="tag";b.ATTRS={name:{valueFn:function(){return(this.get("host").get("tagName")||"").toLowerCase();}}};function a(f){var g={};e.each(f,function(j,i){var h=/i:([0-9]+)/.exec(j);if(h){j=parseInt(h[1],10);}i=i.replace(/-([a-z])/g,function(m,k){return k.toUpperCase();});g[i]=j;});return g;}e.extend(b,e.Plugin.Base,{initializer:function(){var f=c[this.get("name")];if(!f){return;}e.mix(this,f.mixin);if(f.mixin.created){f.mixin.created.call(this,a(this.get("host").getData()));}}});e.Node.plug(b);},"@VERSION@",{skinnable:false,requires:["node","base","plugin","gallery-event-inserted"]});