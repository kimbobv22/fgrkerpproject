(function(window,$){
	
	var module_ = window.RKCommon.education = {
		requestURLKey : "education",
		updateAttend : function(misId_, eduId_, eduDid_, memSid_, status_, callback_){
			RKCommon.cryptJSON({misId : misId_,
				eduId : eduId_, eduDid : eduDid_, memSid : memSid_,
				status : status_}, function(cryptedData_){
					JGService.ajax(this.requestURLKey,{
						data : $.extend({srvID : "updateAttend"}, cryptedData_)
						,success : function(data_){
							if(data_.result === 0) if(!isNull(callback_)) callback_(true);
							else if(!isNull(callback_)) callback_(false);
						},error : function(response_, errorStr_){
							if(!isNull(callback_)) callback_();
						}
					});
			});
		}
	};
	
	JGService.requestURL(module_.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"education");
	
	return module_;
	
})(window,jQuery);