(function(window,$){
	
	var module_ = RKCommon.member = {
		requestURLKey : "member"
		,logout : function(callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "doLogout"
				},success : function(data_){
					if(!isNull(callback_)) callback_(true);
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_(false);
				}
			});
		}
	};
	
	JGService.requestURL(RKCommon.member.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"member");
	
	return module_;
	
})(window,jQuery);