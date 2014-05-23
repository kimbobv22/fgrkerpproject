(function(window,$){
	
	var module_ = window.RKCommon.apply = {
		requestURLKey : "apply",
		_popupSelectLeader : null,
		popupSelectLeader : function(misId_, callback_){
			var url_ = JGService.requestURL(this.requestURLKey,{
				srvID : "popup_selectLeader"
				,misId : misId_
			});
			
			if(!isNull(this._popupSelectLeader)) return;
			
			window.A09001CallbackComplete = false;
			this._popupSelectLeader = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.apply._popupSelectLeader = null;
					if(!window.A09001CallbackComplete) callback_(undefined);
				},scrollbars : true
			});
			
			window.A09001Callback = (function(result_){
				window.A09001CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		},_popupSelectMember : null,
		popupSelectMember : function(misId_, callback_){
			var url_ = JGService.requestURL(this.requestURLKey,{
				srvID : "popup_selectMember"
				,misId : misId_
			});
			
			if(!isNull(this._popupSelectMember)) return;
			
			window.A09003CallbackComplete = false;
			this._popupSelectMember = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.apply._popupSelectMember = null;
					if(!window.A09003CallbackComplete) callback_(undefined);
				},scrollbars : true
			});
			
			window.A09003Callback = (function(result_){
				window.A09003CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		},_popupSelectLeaderAndMember : null,
		popupSelectLeaderAndMember : function(misId_, callback_){
			var url_ = JGService.requestURL(this.requestURLKey,{
				srvID : "popup_selectLeaderAndMember"
				,misId : misId_
			});
			
			if(!isNull(this._popupSelectLeaderAndMember)) return;
			
			window.A09005CallbackComplete = false;
			this._popupSelectLeaderAndMember = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.apply._popupSelectLeaderAndMember = null;
					if(!window.A09005CallbackComplete) callback_(undefined);
				},scrollbars : true
			});
			
			window.A09005Callback = (function(result_){
				window.A09005CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		},updateFee : function(misId_, memSid_, bool_, callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "updateFee",
					misId : misId_,
					memSid : memSid_,
					boolValue : bool_ === true ? "Y" : "N"
				},success : function(data_){
					if(data_.result === 0) if(!isNull(callback_)) callback_(true);
					else if(!isNull(callback_)) callback_(false);
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_();
				}
			});
		},updateBookReport : function(misId_, memSid_, bool_, callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "updateBookReport",
					misId : misId_,
					memSid : memSid_,
					boolValue : bool_ === true ? "Y" : "N"
				},success : function(data_){
					if(data_.result === 0) if(!isNull(callback_)) callback_(true);
					else if(!isNull(callback_)) callback_(false);
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_();
				}
			});
		}
	};
	
	JGService.requestURL(RKCommon.apply.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"apply");
	
	return module_;
})(window,jQuery);