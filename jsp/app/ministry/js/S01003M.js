$(document).on("pagebeforecreate",function(){
	var teamData_ = JGDS("dataset","s01003TeamData");
	var teamDataView_ = $("[jg-dataset='s01003TeamData']");
	teamDataView_.JGValidator();
	teamDataView_.JGValidator("failedMessages",{
		team_nm : {
			required : "팀명을 입력하여 주세요"
		},team_desc : {
			required : "사역내용을 입력하여 주세요"
		},mis_ctg1 : {
			required : "사역구분1을 입력하여 주세요"
		},mis_ctg2 : {
			required : "사역구분2을 입력하여 주세요"
		},status : {
			required : "팀상태를 입력하여 주세요"
		}
	});
	
	$(teamData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_,columnValue_){
		if(columnName_ === "MIS_CTG1"){
			teamData_.setColumnValue("MIS_CTG2",0,"");
			atFuncS01003_loadMisCtg2(teamData_.getColumnValue("MIS_CTG1",0));
		}else if(columnName_ === "LEADER_BELONG_CTG1"){
			setTimeout(function(){
				$("[rk-temp-belong1]").RKBelongLabel("refresh");
			},100);
		}else if(columnName_ === "LEADER_BELONG_CTG2"){
			setTimeout(function(){
				$("[rk-temp-belong2]").RKBelongLabel("refresh");
			});
		}
	});
});
$(document).ready(function(){
	RKCommon.gcode([{codeId : "S0003", addTitle : true},{codeId : "S0007", addTitle : true}],function(){
		$("[jg-dataset='s01003TeamData']").trigger("datasetuicolumnrefreshed",[null,0]);
	});
});
function atFuncS01003_loadMisCtg2(misCtg1_){
	RKCommon.gcode([{codeId : "S0005", addTitle : true, col1 : NVL(misCtg1_," ")}],function(){
		$("[jg-dataset='s01003TeamData']").trigger("datasetuicolumnrefreshed",[null,0]);
	});
}

function atFuncS01003_add(){
	$.blockUI();
	var teamData_ = JGDS("dataset","s01003TeamData");
	var teamDataView_ = $("[jg-dataset='s01003TeamData']");
	teamDataView_.JGValidator("validate",function(isValid_, cause_){
		if(!isValid_){
			$.unblockUI();
			return;
		}
		$.blockUI();
		JGService.ajax(RKCommon.ministry.requestURLKey,{
			data : {
				srvID : "addMinistryTeam"
				,teamData : teamData_.toJSONString(false)
			},success : function(data_){
				var misId_ = teamData_.getColumnValue("mis_id",0);
				location.href = JGService.requestURL(RKCommon.ministry.requestURLKey)+"/"+misId_+"/"+data_.message;
			},error : function(response_, errorStr_){
				alert("에러발생!");
			}
		});
	});
}
function atFuncS01003_update(){
	$.blockUI();
	var teamData_ = JGDS("dataset","s01003TeamData");
	var teamDataView_ = $("[jg-dataset='s01003TeamData']");
	teamDataView_.JGValidator("validate",function(isValid_, cause_){
		if(!isValid_){
			$.unblockUI();
			return;
		}
		$.blockUI();
		JGService.ajax(RKCommon.ministry.requestURLKey,{
			data : {
				srvID : "updateMinistryTeam"
				,teamData : teamData_.toJSONString(false)
			},success : function(data_){
				$.unblockUI({
					onUnblock : function(){
						atFuncS01003_refresh();
					}
				});
			},error : function(response_, errorStr_){
				alert("에러발생!");
			}
		});
	});
}
function atFuncS01003_remove(){
	if(confirm("해당팀을 정말로 삭제하시겠습니까?")){
		$.blockUI();
		var condData_ = {
			misId : atFuncS01003_misId()
			,teamId : atFuncS01003_teamId()
		};
		RKCommon.cryptJSON(condData_,function(cryptedData_){
			JGService.ajax(RKCommon.ministry.requestURLKey,{
				data : $.extend(cryptedData_,{srvID : "removeMinistryTeam"})
				,success : function(data_){
					location.href = JGService.requestURL(RKCommon.ministry.requestURLKey)+"/"+condData_.misId;
				},error : function(response_, errorStr_){
					alert("에러발생!");
				}
			});
		});
	}
}

function atFuncS01003_selectOrganization(){
	RKCommon.organization.popupSelectOrganization(function(result_){
		if(isNull(result_)) return; 
		
		var teamData_ = JGDS("dataset","s01003TeamData");
		teamData_.setColumnValue("ORG_ID",0,result_.orgId);
		teamData_.setColumnValue("ORG_NM",0,result_.orgNm);
	});
}
function atFuncS01003_emptyOrganization(){
	var teamData_ = JGDS("dataset","s01003TeamData");
	teamData_.setColumnValue("ORG_ID",0,null);
	teamData_.setColumnValue("ORG_NM",0,"");
}

function atFuncS01003_selectLeader(){
	RKCommon.apply.popupSelectLeader(atFuncS01003_misId(), function(result_){
		if(isNull(result_)) return; 
		
		var teamData_ = JGDS("dataset","s01003TeamData");
		teamData_.setColumnValue("LEADER_SID",0,result_.memSid);
		teamData_.setColumnValue("LEADER_NM",0,result_.name);
		teamData_.setColumnValue("LEADER_PHONE1",0,result_.phone1);
		teamData_.setColumnValue("LEADER_BELONG_CTG1",0,result_.belongCtg1);
		teamData_.setColumnValue("LEADER_BELONG_CTG2",0,result_.belongCtg2);
	});
}
function atFuncS01003_emptyLeader(){
	var teamData_ = JGDS("dataset","s01003TeamData");
	teamData_.setColumnValue("LEADER_SID",0,null);
	teamData_.setColumnValue("LEADER_NM",0,"");
	teamData_.setColumnValue("LEADER_PHONE1",0,"");
	teamData_.setColumnValue("LEADER_BELONG_CTG1",0,null);
	teamData_.setColumnValue("LEADER_BELONG_CTG2",0,null);
}