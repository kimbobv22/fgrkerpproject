(function(window,$){
	
	var module_ = window.RKCommon = {
		requestURLKey_root : "http"
		,requestURLKey : "common"
		,addJS : function(src_, target_){
			if($.type(src_) === "string"){src_ = [src_];}
			
			target_ = $(Object.NVL(target_,"head"));
			var length_ = src_.length;
			for(var index_=0;index_<length_;++index_){
				if(target_.children("script[src='"+src_[index_]+"']").length == 0){
					target_.append($("<script src='"+src_[index_]+"'></script>"));
				}
			}
		},addCSS : function(href_, target_){
			if($.type(href_) === "string"){href_ = [href_];}
			
			target_ = $(Object.NVL(target_,"head"));
			var length_ = href_.length;
			for(var index_=0;index_<length_;++index_){
				if(target_.children("link[href='"+href_[index_]+"']").length == 0){
					target_.append($("<link rel='stylesheet' href='"+href_[index_]+"'></link>"));
				}
			}
		},openPopupWindow : function(options_){
			options_ = $.extend({
				width : screen.width / 2
				,height : screen.height / 2
				,left : (screen.width - Object.NVL(options_.width,(screen.width / 2))) / 2
				,top : (screen.height - Object.NVL(options_.height,(screen.height / 2))) / 2
				,directories : false,location : false,menubar : false,resizable : false,scrollbars : false
				,status : false,toolbar : false,dialog : true,titlebar : false
			},options_);
			
			var params_ = "height="+options_.height+",width="+options_.width;
			params_ += (",top=" + options_.top + ",left=" + options_.left
				+(options_.directories ? ",directories=1" : "")+(options_.location ? ",location=1" : "")
				+(options_.menubar ? ",menubar=1" : "")+(options_.resizable ? ",resizable=1" : "")
				+(options_.scrollbars ? ",scrollbars=1" : "")+(options_.status ? ",status=1" : "")
				+(options_.toolbar ? ",toolbar=1" : "")+(options_.dialog ? ",dialog=1" : "")
				+(options_.titlebar ? ",titlebar=1" : ""));
			
			var popupWindow_ = window.open(options_.url, options_.name, params_);
			if(!Object.isNull(options_.didOpen)) options_.didOpen(popupWindow_);
			var that_ = this;
			this.interval = setInterval((function(){
				if (popupWindow_.closed){
					clearInterval(that_.interval);
					if(!Object.isNull(options_.didClose)) options_.didClose();
				}
			}), 1000);
			
			if(popupWindow_){popupWindow_.focus();return false;}
			return true;
		},jPopup : function(view_, options_, callback_){
			var target_ = $(document.body);
			
			var popupOverlay_ = $("<div id='rkCommonJpopup'><div class='rk-common-popup rk-responsive-size rk-color-gray4-border-all'>"
					+"<div class='popup-content-frame rk-color-gray1-back'>"
					+"<h2 class='popup-label popup-title rk-label-content rk-color-gray8'></h2>"
					+"<span class='popup-label popup-message rk-label-small-content rk-color-gray6'></span>"
					+"<div class='popup-content'></div>"
					+"<div class='popup-buttenset'></div>"
					+"</div></div></div>");
			
			popupOverlay_.addClass("ui-page-theme-a");
			popupOverlay_.css({
				position : "fixed"
				,display : "none"
				,overflow : "auto"
				,width : "100%"
				,height: "100%"
				,top: "0px"
				,bottom: "0px"
				,zIndex : 1002
			});
			target_.append(popupOverlay_);
			popupOverlay_.on("hide",function(event_){
				var target_ = $(event_.target);
				target_.remove();
			});
			
			popupOverlay_.JGNodePopup();
			popupOverlay_.JGNodePopup("overlay").css("position","fixed");
			popupOverlay_.close = (function(callback_){
				if(Object.isNull(this) || !this.JGNodePopup("isShow")) return;
				this.JGNodePopup("hide",false,callback_);
			});
			popupOverlay_.view = (function(tView_){
				if(tView_ === undefined){
					return this._view;
				}
				
				this._content.empty();
				this._content.append(tView_);
				this._view = tView_;
			});
			
			var popupFrame_ = $(popupOverlay_.children()[0]);
			var popupContentFrame_ = popupFrame_.children(".popup-content-frame");
			var popupTitle_ = popupContentFrame_.children(".popup-title");
			var popupMessage_ = popupContentFrame_.children(".popup-message");
			var popupContent_ = popupContentFrame_.children(".popup-content");
			var popupBtnset_ = popupContentFrame_.children(".popup-buttenset");
			popupBtnset_.empty();
			
			popupOverlay_._frame = popupFrame_;
			popupOverlay_._content = popupContent_;
			
			options_ = $.extend({
				title : null
				,content : null
				,callback : function(btnIndex_){}
				,btn1Theme : "c"
				,notOpen : false
			},options_);
			
			if(!Object.isNull(options_.title)){
				popupTitle_.html(options_.title);
				popupTitle_.show();
			}else{
				popupTitle_.hide();
			}
			
			if(!Object.isNull(options_.content)){
				popupMessage_.html(options_.content);
				popupMessage_.show();
			}else{
				popupMessage_.hide();
			}
			
			var stackedIndex_ = 0;
			while(true){
				var btnRealIndex_ = stackedIndex_+1;
				var btnTitle_ = options_["btn"+btnRealIndex_+"Title"];
				if(Object.isNull(btnTitle_)) break;
				
				var btnTheme_ = Object.NVL(options_["btn"+btnRealIndex_+"Theme"],"a");
				
				var btnView_ =  popupOverlay_["atBtn"+btnRealIndex_] = $("<a href='javascript:void(0);' class='popup-btn1 ui-btn ui-mini rk-responsive'></a>");
				btnView_.addClass("ui-btn-"+btnTheme_);
				popupBtnset_.append(btnView_);
				
				btnView_.data("btnIndex",stackedIndex_);
				btnView_.text(btnTitle_);
				btnView_.click(function(){
					var btnIndex_ = $(this).data("btnIndex");
					if(!Object.isNull(options_.callback)) options_.callback.apply(popupOverlay_,[btnIndex_]);
					if(Object.NVL(options_["btn"+(btnIndex_+1)+"ToClose"],true)){
						popupOverlay_.JGNodePopup("hide",false,function(){});
					}
				});
				
				++stackedIndex_;
			}
			
			popupContent_.view(view_);
			
			popupFrame_.JGCenterAlign({inWindow : true});
			setTimeout(function(){
				popupFrame_.JGCenterAlign("align");
			},20);
			
			if(!options_.notOpen) popupOverlay_.JGNodePopup("show",false,callback_);
			
			return popupOverlay_;
		},jPopupFromService : function(requestURLKey_, parameters_, options_, callback_){
			var popup_ = ATCommon.jPopup(view_,options_,function(){
				if(!Object.isNull(callback_)) callback_.apply(this);
			});
			
			this.getServiceView(requestURLKey_, parameters_, function(view_){
				popup_.view(view_);
			});
			
			return popup_;
		},jAlert : function(options_){
			options_ = $.extend({
				title : null
				,content : null
				,btn1Title : ATLocale.text("default","confirm")
			},options_);
			
			var popupOverlay_ = window.ATCommon.jPopup("", options_);
			popupOverlay_.JGNodePopup("show",false,function(){
				setTimeout(function(){
					popupOverlay_.atBtn1.focus();
				},20);
			});
			
		},jConfirm: function(options_){
			this.jAlert($.extend({
				btn2Title : ATLocale.text("default","cancel")
			},options_));
		},jError : function(options_){
			this.jAlert($.extend({
				title : ATLocale.text("default","error_title")
				,content : ATLocale.text("default","error_content")
			},options_));
		},delayCall : function(func_, delay_){
			setTimeout(func_, Object.NVL(delay_,1));
		},_genCryptionKey : function(callback_){
			JGModule.ajax(window.ATCommon.requestURLKey_root,{
				data : {srvMap : "common", srvID : "genCryptionKey"}
				,success : function(data_){
					callback_(data_.message);
				}
			});
		},cryptJSON : function(json_, callback_){
			this._genCryptionKey(function(key_){
				var rsa_ = new RSAKey();
				rsa_.setPublic(key_.modules, key_.exponent);
				
				var result_ = {};
				for(var key_ in json_){
					result_[key_] = rsa_.encrypt(json_[key_]);
				}
				
				callback_(result_);
			});
		},setBodyScroll : function(bool_){
			$(document.body).attr("rk-block-scroll",!Object.NVL(bool_,true));
		}
	};
	
	module_.addJS([
	"jsp/common/js/rsa/jsbn.js"
	,"jsp/common/js/rsa/prng4.js"
	,"jsp/common/js/rsa/rng.js"
	,"jsp/common/js/rsa/rsa.js"
	,"jsp/common/js/jquery.plugin/jquery.JGFadeFrame.1.0.0.js"
	,"jsp/common/js/jquery.plugin/jquery.JGNodePopup.1.0.0.js"
	,"jsp/common/js/jquery.plugin/jquery.JGIndicator.1.0.0.js"
	,"jsp/common/js/jquery.plugin/jquery.JGCenterAlign.1.0.0.js"]);
	
	$(document).on("pagebeforecreate",function(){
		JGIndicator({overlayOpacity : 0.3});
		JGIndicator("indicator").css("position","fixed");
		$(document.body).on("showindicator",function(){
			ATCommon.setBodyScroll(false);
		});
		$(document.body).on("hideindicator",function(){
			ATCommon.setBodyScroll(true);
		});
	});
	
	JGModule.putRequestURL(module_.requestURLKey, JGModule._requestURLs[RKCommon.requestURLKey_root]+"?srvMap=common");
	
	module_.addJS([
	"jsp/common/js/rk.library/RKCommon-map.1.0.0.js"
	]);
	
	module_.addCSS([
	"jsp/common/css/RKCommon.css"
	]);
	
	$.fn.rkFuncLoadServiceView = (function(requestURLKey_, parameters_, callback_){
		this.load(JGModule.requestURL(requestURLKey_,parameters_),callback_);
	});
	
	$.jg.JGDSValidator.prototype.options = $.extend($.jg.JGDSValidator.prototype.options,{
		"errorMessageTag" : "<label class='rk-validator-error-label rk-label-small-l3 rk-color-red5' />"
	});
	
	return module_;
})(window,jQuery);