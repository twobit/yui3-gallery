<<<<<<< HEAD
YUI.add("tag-ytemplate",function(a){a.Tag.register("ytemplate",{created:function(b){var c=this.get("host");c.setHTML('<script type="text/x-template">'+c.getHTML()+"<\/script>");this._node=c.one("script");this.addAttr("html",{getter:function(){return this._node.getHTML();},setter:function(d){this._node.setHTML(d);}});},compile:function(b){return a.Lang.sub(this.get("html"),b);}});},"@VERSION@",{requires:["gallery-tag"]});
=======
YUI.add("tag-ytemplate",function(a){a.Tag.register("ytemplate",{created:function(b){var c=this.get("host");c.setHTML('<script type="text/x-template">'+c.getHTML()+"<\/script>");this._node=c.one("script");this.addAttr("html",{getter:function(){return this._node.getHTML();},setter:function(d){this._node.setHTML(d);}});},compile:function(b){return a.Lang.sub(this.get("html"),b);}});},"gallery-2012.07.05-20-01",{requires:["gallery-tag"]});
>>>>>>> upstream/master
