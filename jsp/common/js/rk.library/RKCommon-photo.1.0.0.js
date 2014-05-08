(function(window,$){
	
	var module_ = window.RKCommon.photo = {
		requestURLKey : "photo"
		,photoURL : function(photoId_){
			return JGService.requestURL(this.requestURLKey)+"/"+photoId_;
		}
	};
	
	JGService.requestURL(RKCommon.photo.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"photo");
	
	return module_;
})(window,jQuery);