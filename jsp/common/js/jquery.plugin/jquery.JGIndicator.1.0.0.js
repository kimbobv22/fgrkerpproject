(function(a){a.widget("jg.JGIndicator",{options:{fadeSpeed:100,opacity:0.18},indicatorHTML:"<div><div class='ui-icon ui-icon-loading' style='position : absolute; width:46px; height:46px; left:50%; top:50%; margin-left:-23px; margin-top:-23px; z-index:inherit;'></div></div>",indicatorCSS:{left:"0px",top:"0px",position:"absolute","z-index":9999999,"overflow-x":"hidden","overflow-y":"hidden",width:"100%",height:"100%",backgroundColor:"black"},_create:function(){var b=a(this.indicatorHTML);b.css(this.indicatorCSS);b.hide();this.indicator(b);},_indicator:null,indicator:function(b){if(b===undefined){return this._indicator;}if(this._indicator!==undefined&&this._indicator!==null){this._indicator.remove();}this._indicator=a(b);this._update();},isShow:function(){return this._indicator.css("display")!="none";},show:function(f,d){var c=this;var b=(f!==undefined&&f?0:this.options.fadeSpeed);var e=this._indicator;e.stop(true);e.css("opacity",0);e.show();e.fadeTo(b,this.options.opacity,function(){c.element.trigger("showindicator");if(!Object.isNull(d)){d.apply(e);}});},hide:function(f,d){var c=this;var b=(f!==undefined&&f?0:this.options.fadeSpeed);var e=this._indicator;e.stop(true);e.fadeTo(b,0,function(){e.hide();c.element.trigger("hideindicator");if(!Object.isNull(d)){d.apply(e);}});},toggle:function(c,b){if(this.isShow()){this.hide(c,b);}else{this.show(c,b);}},_update:function(){if(this._indicator.parent!==this.element){this.element.append(this._indicator);}this.isShow()?this.show(true):this.hide(true);},_destory:function(){this._indicator.remove();this._super();}});window.JGIndicator=(function(){return a(document.body).JGIndicator.apply(a(document.body),arguments);});window.JGIndicator();})(jQuery);