YUI.add("tag-ybind",function(a){a.Tag.register("ybind, [ybind]",{created:function(c){var b=c.ybind||this.get("host").getAttribute("ybind"),f=this,e=[];console.log(c);function d(){var g=c.set?this.setValue:this.setHTML;f=b?a.one(b).tag:this;a.each(c,function(i,h){if(h.indexOf("on")===0){e.push(h.substr(2));}});if(this===f){this.addAttr("value",{getter:function(){return this.get("host").get("value");}});}a.Array.each(e,function(h){this.onHostEvent(h,f[c["on"+h]]||this._ybindUpdate,f);},this);if(c.ref){f.on(c.ref+"Change",g,this);g.call(this,{newVal:f.get(c.ref)});}}if(b?a.one(b).tag:this){d.call(this);}else{setTimeout(a.bind(d,this),0);}},_ybindUpdate:function(b){this.set("value",b.target.get("value"));},setHTML:function(b){this.get("host").setHTML(b.newVal);},setValue:function(b){this.get("host").set("value",b.newVal);},test:function(){}});},"@VERSION@",{requires:["gallery-tag","event"]});