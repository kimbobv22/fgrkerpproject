(function(b){function a(d){var c=b(d).data("JGNodePopupUI.installed");if(c!=undefined&&c==null&&c){return;}b(document.head).append(b("<style>._jgnodepopupui-background-scrollable{overflow:hidden !important; overflow-x:hidden !important; overflow-y:hidden !important;}</style>"));b(d).data("JGNodePopupUI.installed",true);}b.widget("jg.JGNodePopup",b.jg.JGFadeFrame,{_overlay:null,overlay:function(c){if(c==undefined){return this._overlay;}if(this._overlay!=undefined&&this._overlay!=null){this._overlay.remove();this._overlay=b("<div />");}this._overlay=b(c).clone();this._updateOverlay();},_create:function(){this._super();a(window);this.overlay(b(this.options.overlayHTML));this._overlay.css(this.options.overlayCSS);this._updateOverlay();},_setOption:function(d,c){this._super(d,c);if(d==="overlayHTML"){this.overlay(b(c));}else{if(d==="overlayCSS"){this._overlay.css(c);}}this._updateOverlay();},show:function(f,d){if(this._isShow){return;}this._super(f,d);var e=(f!=undefined&&f?0:this.options.fadeTime);var g=this.element.css("zIndex")-1;if(!this.options.backgroundScrollable){b(document.body).addClass("_jgnodepopupui-background-scrollable");}var c=this;this._overlay.stop(true);this._overlay.css({zIndex:g});this._overlay.fadeTo(0,0,function(){b(this).show();b(this).fadeTo(e,c.options.overlayOpacity);});},hide:function(e,c){if(!this._isShow){return;}this._super(e,c);var d=(e!=undefined&&e?0:this.options.fadeTime);b(document.body).removeClass("_jgnodepopupui-background-scrollable");this._overlay.stop(true);this._overlay.fadeTo(d,0,function(){b(this).hide();});},_updateOverlay:function(){this._overlay.hide();var c=this;this._overlay.click(function(d){if(c.options.dismissble&&c.isShow()){c.hide(false);}});this.element.parent().append(this._overlay);},_destory:function(){b(document.body).removeClass("_jgnodepopupui-background-scrollable");this._super();}});b.jg.JGNodePopup.prototype.options={fadeTime:200,dismissble:true,backgroundScrollable:true,overlayOpacity:0.4,overlayHTML:"<div />",overlayCSS:{width:"100%",height:"100%",top:"0px",position:"absolute",display:"block","background-color":"black"}};})(jQuery);