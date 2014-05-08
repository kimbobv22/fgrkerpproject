function atFuncB01001_doLogin(){
	$.blockUI({
		onBlock : function(){
			ACTing.login(function(userSid_){
				RKCommon.cryptJSON({userSid : userSid_},function(cryptedData_){
					JGService.ajax(RKCommon.member.requestURLKey,{
						data : $.extend({srvID : "doLogin"}, cryptedData_)
						,success: function(data_){
							JGService.forwardService(RKCommon.requestURLKey_root);
						},error : function(response_,errorStr_){
							$.unblockUI();
							alert("로그인에 실패하였습니다.");
						}
					});
				});
			},function(){
				$.unblockUI();
			});
		}
	});
}