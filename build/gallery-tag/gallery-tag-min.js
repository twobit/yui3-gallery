YUI.add("gallery-tag",function(d){var c=d.namespace("Tag"),b={};function a(e){a.superclass.constructor.apply(this,arguments);}a.NAME="tagPlugin";a.NS="tag";a.TAGS={};a.ATTRS={name:{valueFn:function(){return(this.get("host").get("tagName")||"").toLowerCase();}}};a.register=function(f,e){a.unregister(f);if(e){a.TAGS[f]=e;b[f]=d.on("inserted",function(g){g.target.fire("tag:inserted");},f);}else{d.use("tag-"+f,function(g){});}};a.unregister=function(e){if(b[e]&&a.TAGS[e]){b[e].detach();delete b[e];delete a.TAGS[e];}};d.extend(a,d.Plugin.Base,{initializer:function(){var e=a.TAGS[this.get("name")];if(e){d.mix(this,e);if(e.created){e.created.call(this,this.get("host").getData());}}}});d.Node.plug(a);c.register=a.register;},"@VERSION@",{skinnable:false,requires:["node","base","plugin","gallery-event-inserted"]});