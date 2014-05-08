(function(window,$){
	
	var module_ = window.RKCommon.organization = {
		requestURLKey : "organization"
		,getOrganizationArea1 : function(callback_){
			JGService.ajax(RKCommon.organization.requestURLKey,{
				data : {
					srvID : "getOrgArea1"
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getOrganizationArea2 : function(orgArea1_, callback_){
			JGService.ajax(RKCommon.organization.requestURLKey,{
				data : {
					srvID : "getOrgArea2"
					,orgArea1 : orgArea1_
				},success : function(result_){
					if(!isNull(callback_)) callback_(result_.message);
				},error : function(response_,errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},_popupSelectOrganization : null
		,popupSelectOrganization : function(callback_){
			var url_ = JGService.requestURL(RKCommon.organization.requestURLKey,{
				srvID : "popup_selectOrganization"
			});
			
			if(!isNull(this._popupSelectOrganization)) return;
			
			window.O09001CallbackComplete = false;
			this._popupSelectOrganization = RKCommon.openPopupWindow({
				url : url_
				,didClose : function(){
					RKCommon.organization._popupSelectOrganization = null;
					if(!window.O09001CallbackComplete) callback_(undefined);
				}
			});
			
			window.O09001Callback = (function(result_){
				window.O09001CallbackComplete = true;
				if(!isNull(callback_)) callback_(result_);
			});
		}
	};
	
	JGService.requestURL(RKCommon.organization.requestURLKey,JGService.requestURL(RKCommon.requestURLKey_root)+"organization");
	
	return module_;
})(window,jQuery);