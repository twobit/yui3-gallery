YUI.add("tag-ybutton",function(a){a.Tag.register("ybutton",{created:function(b){this.get("host").setHTML("<button></button>");this._widget=new a.Button(a.merge(b,{srcNode:this.get("host").one("button")}));a.each(a.Button.ATTRS,function(d,c){this.addAttr(c,{getter:function(){return this._widget.get(c);},setter:function(e){this._widget.set(c,e);}});},this);this.onHostEvent("tag:inserted",function(){this._widget.render();},this);}});},"@VERSION@",{requires:["gallery-tag","button"]});