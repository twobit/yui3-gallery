YUI.add("gallery-tag-registry",function(a){YUI.add("tag-ybutton",function(b){b.namespace("Tag.Tags").ybutton=b.Base.create("ybutton",b.Tag.Plugin,[],{initializer:function(){var c=this.get("host");c.append("<div></div>");this._button=new b.Button(b.merge(c.getData(),{srcNode:c.one("div"),render:true}));}},{});},"",{requires:["button"]});YUI.add("tag-ydial",function(b){b.namespace("Tag.Tags").ydial=b.Base.create("ydial",b.Tag.Plugin,[],{initializer:function(){var c=this.get("host");c.append('<div class="yui3-skin-sam"></div>');this._button=new b.Dial(b.merge(c.getData(),{srcNode:c.one("div"),render:true}));}},{});},"",{requires:["dial"]});YUI.add("tag-ysuggest",function(b){b.namespace("Tag.Tags").ysuggest=b.Base.create("ysuggest",b.Tag.Plugin,[],{initializer:function(){var c=this.get("host");c.append('<div class="yui3-skin-sam"><input type="text" /></div>');c.one("input").plug(b.Plugin.AutoComplete,{resultHighlighter:"phraseMatch",source:'select * from search.suggest where query="{query}"',yqlEnv:"http://pieisgood.org/yql/tables.env"});}},{});},"",{requires:["autocomplete","autocomplete-highlighters"]});a.Tag.register("ybutton");a.Tag.register("ydial");a.Tag.register("ysuggest");},"@VERSION@",{skinnable:false,requires:["gallery-tag"]});