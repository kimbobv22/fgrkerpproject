(function(a){a.widget("jg.JGFadeFrame",{options:{fadeTime:200},_isShow:false,isShow:function(){return this._isShow;},_currentAnimateStatus:-1,_create:function(){this._isShow=(this.element.css("display")!="none");},hide:function(e,c){if(!this._isShow){return;}var b=this;var d=(e==true?0:this.options.fadeTime);this._currentAnimateStatus=1;this.element.stop(true);this.element.fadeTo(d,0,function(){b._currentAnimateStatus=-1;a(this).hide();b._isShow=false;a(this).trigger("hide");if(c!==null&&c!==undefined){c.apply(b.element);}});},show:function(e,c){if(this._isShow){return;}var b=this;var d=(e==true?0:this.options.fadeTime);this._currentAnimateStatus=0;this.element.stop(true);this.element.fadeTo(0,0,function(){a(this).show();a(this).trigger("show");a(this).fadeTo(d,1,function(){b._currentAnimateStatus=-1;b._isShow=true;if(c!==null&&c!==undefined){c.apply(b.element);}});});},toggle:function(c,b){if(this._isShow){this.hide(c,b);}else{this.show(c,b);}}});})(jQuery);