YUI.add("gallery-tag-registry",function(a){YUI.add("tag-ybutton",function(b){b.namespace("Tag.Tags").ybutton=b.Base.create("ybutton",b.Base,[],{initializer:function(){var c=this.get("host");c.append("<div></div>");this._widget=new b.Button(b.merge(c.getData(),{srcNode:c.one("div")}));this.on("insert",function(){this._widget.render();},this);}});},"",{requires:["button"]});YUI.add("tag-ydial",function(b){b.namespace("Tag.Tags").ydial=b.Base.create("ydial",b.Base,[],{initializer:function(){var c=this.get("host");c.append('<div class="yui3-skin-sam"></div>');this._widget=new b.Dial(b.merge(c.getData(),{srcNode:c.one("div")}));this.on("insert",function(){this._widget.render();},this);}});},"",{requires:["dial"]});YUI.add("tag-yautocomplete",function(b){b.namespace("Tag.Tags").yautocomplete=b.Base.create("yautocomplete",b.Base,[],{initializer:function(){var c=this.get("host");c.append('<div class="yui3-skin-sam"><input type="text" /></div>');c.one("input").plug(b.Plugin.AutoComplete,{resultHighlighter:"phraseMatch",source:'select * from search.suggest where query="{query}"',yqlEnv:"http://pieisgood.org/yql/tables.env"});}});},"",{requires:["autocomplete","autocomplete-highlighters"]});a.Tag.register("ybutton");a.Tag.register("ydial");a.Tag.register("yautocomplete");},"@VERSION@",{skinnable:false,requires:["gallery-tag"]});