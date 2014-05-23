(function(window,$){
	
	var module_ = window.RKCommon.ministry = {
		requestURLKey : "ministry"
		,getMinistryStatusList : function(callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "getMinistryStatusList"
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		}
		,getMinistryYearList : function(callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "getMinistryYearList"
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getMinistryCategory1 : function(misId_, callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "getMinistryCtg1"
					,misId : misId_
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getMinistryCategory2 : function(misId_, misCtg1_, callback_){
			JGService.ajax(RKCommon.ministry.requestURLKey,{
				data : {
					srvID : "getMinistryCtg2"
					,misId : misId_
					,misCtg1 : misCtg1_
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getMinistryArea1 : function(misId_, callback_){
			JGService.ajax(RKCommon.ministry.requestURLKey,{
				data : {
					srvID : "getMinistryArea1"
					,misId : misId_
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getMinistryArea2 : function(misId_, misArea1_, callback_){
			JGService.ajax(RKCommon.ministry.requestURLKey,{
				data : {
					srvID : "getMinistryArea2"
					,misId : misId_
					,misArea1 : misArea1_
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},_popupSelectMinistry : null
		,popupSelectMinistry : function(callback_){
			var url_ = JGService.requestURL(RKCommon.ministry.requestURLKey,{
				srvID : "popup_selectMinistry"
			});
			
			if(!isNull(this._popupSelectMinistry)) return;
			
			window.S09002CallbackComplete = false;
			this._popupSelectMinistry = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.ministry._popupSelectMinistry = null;
					if(!window.S09002CallbackComplete) callback_(undefined);
				},scrollbars : true
			});
			
			window.S09002Callback = (function(result_){
				window.S09002CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		},_popupSelectMinistryTeam : null
		,popupSelectMinistryTeam : function(misId_,callback_){
			var url_ = JGService.requestURL(RKCommon.ministry.requestURLKey,{
				srvID : "popup_selectMinistryTeam"
				,misId : misId_
			});
			
			if(!isNull(this._popupSelectMinistryTeam)) return;
			
			window.S09001CallbackComplete = false;
			this._popupSelectMinistryTeam = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.ministry._popupSelectMinistryTeam = null;
					if(!window.S09001CallbackComplete) callback_(undefined);
				},scrollbars : true
			});
			
			window.S09001Callback = (function(result_){
				window.S09001CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		}
	};
	
	JGService.requestURL(RKCommon.ministry.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"ministry");
	
	return module_;
})(window,jQuery);