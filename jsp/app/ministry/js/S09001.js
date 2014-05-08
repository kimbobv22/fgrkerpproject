function atFuncS09001_getMinistryID(){
	return $("#s09001").attr("rk-mis-id");
}

$(document).on("pagebeforecreate",function(){
	var misId_ = atFuncS09001_getMinistryID();
	
	var condData_ = JGDS("dataset","s09001CondData");
	var condDataView_ = $("[jg-dataset='s09001CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	condData_.setColumnValue("MISID",0,misId_,true);
	condData_.setColumnValue("MISAREA1",0,"",true);
	condData_.setColumnValue("MISAREA2",0,"",true);
	condData_.setColumnValue("MISCTG1",0,"",true);
	condData_.setColumnValue("MISCTG2",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "MISAREA1"){
			atFuncS09001_loadMisArea2();
		}else if(columnName_ === "MISCTG1"){
			atFuncS09001_loadMisCtg2();
		}
		
		if(columnName_ === "MISAREA1" || columnName_ === "MISAREA2" || columnName_ === "MISCTG1" || columnName_ === "MISCTG2"){
			atFuncS09001_search();
		}
	});
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var misTeamView_ = $("[jg-dataset='s09001MinistryTeamList']");
	misTeamView_.JGDatasetUI();
	misTeamView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misTeamView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	var misId_ = atFuncS09001_getMinistryID();
	var condDataView_ = $("[jg-dataset='s09001CondData']");
	
	RKCommon.ministry.getMinistryArea1(misId_,function(data_){
		var dataset_ = JGDS("dataset","s09001Area1Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역1");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
		atFuncS09001_loadMisArea2();
	});
	RKCommon.ministry.getMinistryCategory1(misId_,function(data_){
		var dataset_ = JGDS("dataset","s09001Ctg1Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"사역구분1");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
		atFuncS09001_loadMisCtg2();
	});
	
	atFuncS09001_search();
});

function atFuncS09001_loadMisArea2(){
	var misId_ = atFuncS09001_getMinistryID();
	var condData_ = JGDS("dataset","s09001CondData");
	var condDataView_ = $("[jg-dataset='s09001CondData']");
	condData_.setColumnValue("MISAREA2",0,"",true);
	RKCommon.ministry.getMinistryArea2(misId_,condData_.getColumnValue("MISAREA1",0),function(data_){
		var dataset_ = JGDS("dataset","s09001Area2Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역2");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
}
function atFuncS09001_loadMisCtg2(){
	var misId_ = atFuncS09001_getMinistryID();
	var condData_ = JGDS("dataset","s09001CondData");
	var condDataView_ = $("[jg-dataset='s09001CondData']");
	condData_.setColumnValue("MISCTG2",0,"",true);
	RKCommon.ministry.getMinistryCategory2(misId_,condData_.getColumnValue("MISCTG1",0),function(data_){
		var dataset_ = JGDS("dataset","s09001Ctg2Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"사역구분2");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
}

function atFuncS09001_search(){
	var condData_ = JGDS("dataset","s09001CondData");
	var misTeamData_ = JGDS("dataset","s09001MinistryTeamList");
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "getMinistryTeamList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			misTeamData_.applyJSON(data_.message);
			$("#s09001").attr("rk-content-list-count",misTeamData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}

function atFuncS09001_select(rowIndex_){
	var misTeamData_ = JGDS("dataset","s09001MinistryTeamList");
	var misId_ = misTeamData_.getColumnValue("mis_id",rowIndex_);
	var teamId_ = misTeamData_.getColumnValue("team_id",rowIndex_);
	var teamNm_ = misTeamData_.getColumnValue("team_nm",rowIndex_);
	
	if(!isNull(window.opener.S09001Callback)) window.opener.S09001Callback.apply(window.opener,[{misId : misId_, teamId: teamId_, teamNm : teamNm_}]);
	window.close();
}