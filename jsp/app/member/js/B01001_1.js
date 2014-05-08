$(document).on("pagebeforecreate",function(){
	var loginDataView_ = $("[jg-dataset='b01001LoginData']");
	var loginData_ = JGDS("dataset","b01001LoginData");
	loginData_.addRow();
	loginData_.setColumnValues({
		id : null
		,password : null
	},0,true);
	
	loginDataView_.JGDatasetUI();
	loginDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	/*loginDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});*/
	
});

$(document).ready(function(){
	var loginDataView_ = $("[jg-dataset='b01001LoginData']");
	loginDataView_.JGValidator();
	loginDataView_.JGValidator("failedMessages",{
		id : {
			required : "아이디/이메일을 입력하여 주세요"
		},password : {
			required : "암호를 입력하여 주세요"
		}
	});
	loginDataView_.JGValidator("validate");
});

function atFuncB01001_doRegister(){
	window.open(JGModule.requestURL(ATCommon.user.requestURLKey),"_blank",null);
}

function atFuncB01001_doLogin(){
	var loginDataView_ = $("[jg-dataset='b01001LoginData']");
	loginDataView_.JGValidator("validate", function(result_){
		if(!result_) return;
		
		$.blockUI({
			onBlock : function(){
				var loginData_ = loginDataView_.JGDatasetUI("dataset");
				RKCommon.cryptJSON({loginData : loginData_.toJSONString(true)},function(cryptedData_){
					JGService.ajax(RKCommon.member.requestURLKey,{
						data : $.extend({srvID : "doLogin"}, cryptedData_)
						,success: function(data_){
							$.unblockUI();
							if(data_.result === -1){
								alert("해당 아이디/이메일의 계정이 존재하지 않습니다.");
								return;
							}if(data_.result === -2){
								alert("암호가 정확하지 않습니다");
								return;
							}
							
							JGService.forwardService(RKCommon.requestURLKey_root);
						},error : function(response_,errorStr_){
							$.unblockUI();
							alert("로그인에 실패하였습니다.");
						}
					});
				});
			}
		});
	});
}