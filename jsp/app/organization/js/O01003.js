function atFuncO01003_orgId(){
	return $("#o01003").attr("rk-org-id");
}

$(document).on("pagebeforecreate",function(){
	var orgView_ = $("[jg-dataset='o01003OrgData']");
	var orgBscView_ = $("[jg-dataset='o01003OrgBscData']");
	orgView_.JGDatasetUI();
	orgView_.JGValidator();
	orgView_.JGValidator("failedMessages",{
		"org_nm" : {
			required : "단체명을 입력하세요"
		},"status" : {
			required : "단체상태를 입력하세요"
		},"org_ctg" : {
			required : "단체구분을 입력하세요"
		}
	});
	orgBscView_.JGDatasetUI();
	
	orgView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	orgView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	orgBscView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	orgBscView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	RKCommon.gcode([{codeId : "O0001", addTitle : true},{codeId : "O0002", addTitle : true}],function(){
		var orgView_ = $("[jg-dataset='o01003OrgData']");
		orgView_.trigger("datasetuirefreshed",[0]);
	});
	atFuncO01003_refresh();
});

function atFuncO01003_refresh(){
	$.blockUI();
	var orgId_ = atFuncO01003_orgId();
	var orgData_ = JGDS("dataset","o01003OrgData");
	var orgBscData_ = JGDS("dataset","o01003OrgBscData");
	JGService.ajax(RKCommon.organization.requestURLKey,{
		data : {
			srvID : "getOrganizationInfo"
			,orgId : orgId_
		},success : function(data_){
			orgData_.applyJSON(data_.message.primary);
			orgBscData_.applyJSON(data_.message.basic);
			if(isBlank(orgId_)){
				orgData_.addRow();
				orgBscData_.addRow();
			}
			$.unblockUI();
		},error : function(){
			$.unblockUI();
			alert("에러발생!");
		}
	});
}

function atFuncO01003_update(){
	$.blockUI();
	var orgView_ = $("[jg-dataset='o01003OrgData']");
	orgView_.JGValidator("validate",function(result_){
		if(!result_){
			$.unblockUI();
			return;
		}
		$.blockUI();
		var orgData_ = JGDS("dataset","o01003OrgData");
		var orgBscData_ = JGDS("dataset","o01003OrgBscData");
		JGService.ajax(RKCommon.organization.requestURLKey,{
			data : {
				srvID : "updateOrganizationInfo"
				,orgData : orgData_.toJSONString(false)
				,orgBscData : orgBscData_.toJSONString(false)
			},success : function(data_){
				$.unblockUI({
					onUnblock : function(){
						atFuncO01003_refresh();
					}
				});
			},error : function(){
				$.unblockUI();
				alert("에러발생!");
			}
		});
	});
}

function atFuncO01003_add(){
	$.blockUI();
	var orgView_ = $("[jg-dataset='o01003OrgData']");
	orgView_.JGValidator("validate",function(result_){
		if(!result_){
			$.unblockUI();
			return;
		}
		$.blockUI();
		var orgData_ = JGDS("dataset","o01003OrgData");
		var orgBscData_ = JGDS("dataset","o01003OrgBscData");
		JGService.ajax(RKCommon.organization.requestURLKey,{
			data : {
				srvID : "addOrganizationInfo"
				,orgData : orgData_.toJSONString(false)
				,orgBscData : orgBscData_.toJSONString(false)
			},success : function(data_){
				location.href = JGService.requestURL(RKCommon.organization.requestURLKey)+"/"+data_.message;
			},error : function(){
				$.unblockUI();
				alert("에러발생!");
			}
		});
	});
}
function atFuncO01003_remove(){
	if(confirm("단체를 삭제하면 다시 복구할 수 없습니다")){
		$.blockUI();
		var orgData_ = JGDS("dataset","o01003OrgData");
		RKCommon.cryptJSON({orgId : orgData_.getColumnValue("ORG_ID",0)},function(cryptedData_){
			JGService.ajax(RKCommon.organization.requestURLKey,{
				data : $.extend({srvID : "removeOrganizationInfo"},cryptedData_)
				,success : function(data_){
					alert("단체가 삭제되었습니다.");
					location.href = JGService.requestURL(RKCommon.organization.requestURLKey);
				},error : function(){
					$.unblockUI();
					alert("에러발생!");
				}
			});
		});
	}
}