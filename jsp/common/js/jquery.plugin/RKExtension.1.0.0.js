(function(window,$){
	
	$.fn.onEnterKey = (function(callback_){
		$(this).keypress(function(event_){
			code_ = event_.keyCode ? event_.keyCode : event_.which;
			if(code_ == 13){
				callback_();
				return false;
			}
		});
	});

	$.widget("rk.RKOnEnterKey",{
		initSelector : "[rk-onenter]"
		,callbackFuncName : null
		,_create : function(){
			var that_ = this;
			var element_ = this.element;
			
			this.callbackFuncName = element_.attr("rk-onenter");
			element_.onEnterKey(function(){
				if(isNull(that_.callbackFuncName)) return;
				new Function(that_.callbackFuncName).apply(element_);
			});
		}
	});
	
})(window,jQuery);