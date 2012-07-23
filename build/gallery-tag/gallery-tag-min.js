YUI.add("gallery-tag",function(f){var d=f.namespace("Tag"),g={},c=false;function e(h){return h.replace(" ","").toLowerCase().split(",");}d.register=function(i,h){var j=e(i);f.Array.each(j,function(k){if(k.indexOf("[")>=0){c=true;}g[k]={mixin:h,handle:f.on("inserted",function(l){l.target.fire("tag:inserted",l);},k)};});};d.unregister=function(h){var i=e(h);f.Array.each(i,function(j){if(g[j]){g[j].handle.detach();delete g[j];}});};d.registered=function(h){return h?h in g:Object.keys(g);};function b(j){var i={data:{},grouped:{},ungrouped:{}},l="data-";function k(m){return m.replace(/-([a-z])/g,function(o,n){return n.toUpperCase();});}function h(n){var m=/^i:(-?[0-9]+)$/.exec(n);if(m){return parseInt(m[1],10);}return n;}f.Array.each(j,function(m){var o=m.name,p=m.value,n=o.indexOf(":"),q;if(o.indexOf(l)===0){o=k(o.substr(l.length));i.data[o]=h(p);}else{if(n>=0){q=o.substr(0,n);if(!i.grouped[q]){i.grouped[q]={};}o=k(o.substr(n+1));i.grouped[q][o]=h(p);}else{i.ungrouped[o]=h(p);}}});return i;}function a(h){a.superclass.constructor.apply(this,arguments);}a.NAME="tagPlugin";a.NS="tag";f.extend(a,f.Plugin.Base,{initializer:function(){var l=this.get("host"),i=(l.get("tagName")||"").toLowerCase(),j=[],h=l.getDOMNode().attributes,k;if(g[i]){j.push({obj:g[i].mixin});}if(c){f.each(h,function(m){var n="["+m.name+"]";if(g[n]){j.push({obj:g[n].mixin,attr:m.name});}});}if(j.length){f.Node._instances[l._yuid]=l;k=b(h);f.Array.each(j,function(m){var n=m.attr?k.grouped[m.attr]||{}:k.data;f.mix(this,m.obj);if(m.obj.created){m.obj.created.call(this,n);}},this);}}});f.Node.plug(a);},"@VERSION@",{skinnable:false,requires:["node","base","plugin","gallery-event-inserted"]});