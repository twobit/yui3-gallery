YUI.add("tag-yoverlay",function(a){a.Tag.register("yoverlay",{created:function(c){var d=this.get("host").getHTML(),b=a.merge(c);this.get("host").setHTML('<div class="yui3-overlay-loading">'+d+"</div>");b.srcNode=this.get("host").one("div");if(b.x){b.x=parseInt(b.x,10);}if(b.y){b.y=parseInt(b.y,10);}this._widget=new a.Overlay(b);a.each(a.Overlay.ATTRS,function(f,e){this.addAttr(e,{getter:function(){return this._widget.get(e);},setter:function(g){this._widget.set(e,g);}});},this);this.onHostEvent("tag:inserted",function(){this._widget.render();},this);}});},"@VERSION@",{requires:["gallery-tag","overlay"]});