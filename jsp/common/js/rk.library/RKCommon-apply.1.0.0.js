(function(window,$){
	
	var module_ = window.RKCommon.apply = {
		requestURLKey : "applly"
	};
	
	JGService.requestURL(RKCommon.apply.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"apply");
	
	return module_;
})(window,jQuery);