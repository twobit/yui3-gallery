<<<<<<< HEAD
YUI.add("tag-yapp",function(a){a.Tag.register("yapp",{created:function(b){this.get("host").setHTML('<div class="view-container">'+this.get("host").getHTML()+'</div><div class="container"></div>');this._instance=new a.App(a.merge(b,{container:this.get("host").one(".container"),viewContainer:this.get("host").one(".view-container")}));a.each(a.App.ATTRS,function(d,c){this.addAttr(c,{getter:function(){return this._instance.get(c);},setter:function(e){this._instance.set(c,e);}});},this);this.onHostEvent("tag:inserted",function(){this._instance.render();},this);}});},"@VERSION@",{requires:["gallery-tag","app-base"]});
=======
YUI.add("tag-yapp",function(a){a.Tag.register("yapp",{created:function(b){this.get("host").setHTML('<div class="view-container">'+this.get("host").getHTML()+'</div><div class="container"></div>');this._instance=new a.App(a.merge(b,{container:this.get("host").one(".container"),viewContainer:this.get("host").one(".view-container")}));a.each(a.App.ATTRS,function(d,c){this.addAttr(c,{getter:function(){return this._instance.get(c);},setter:function(e){this._instance.set(c,e);}});},this);this.onHostEvent("tag:inserted",function(){this._instance.render();},this);}});},"gallery-2012.07.05-20-01",{requires:["gallery-tag","app-base"]});
>>>>>>> upstream/master
