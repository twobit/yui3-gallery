YUI.add("gallery-tag",function(d){var c=d.namespace("Tag"),b={};c.register=function(f,e){c.unregister(f);b[f]={mixin:e,handle:d.on("inserted",function(g){g.target.fire("tag:inserted");},f)};};c.unregister=function(e){if(b[e]){b[e].handle.detach();delete b[e];}};c.registered=function(e){return e?b[e]:Object.keys(b);};function a(e){a.superclass.constructor.apply(this,arguments);}a.NAME="tagPlugin";a.NS="tag";a.ATTRS={name:{valueFn:function(){return(this.get("host").get("tagName")||"").toLowerCase();}}};d.extend(a,d.Plugin.Base,{initializer:function(){var e=b[this.get("name")];if(!e){return;}d.mix(this,e.mixin);if(e.mixin.created){e.mixin.created.call(this,this.get("host").getData());}}});d.Node.plug(a);},"@VERSION@",{skinnable:false,requires:["node","base","plugin","gallery-event-inserted"]});