function atFuncS01001_getMinistryID(){
	return $("#s01001").attr("rk-mis-id");
}

$(document).on("pagebeforecreate",function(){
	var misId_ = atFuncS01001_getMinistryID();
	
	var condData_ = JGDS("dataset","s01001CondData");
	var condDataView_ = $("[jg-dataset='s01001CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	condData_.setColumnValue("MISID",0,misId_,true);
	condData_.setColumnValue("MISAREA1",0,"",true);
	condData_.setColumnValue("MISAREA2",0,"",true);
	condData_.setColumnValue("MISCTG1",0,"",true);
	condData_.setColumnValue("MISCTG2",0,"",true);
	condData_.setColumnValue("LEADER_YN",0,true,true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "MISAREA1"){
			atFuncS01001_loadMisArea2();
		}else if(columnName_ === "MISCTG1"){
			atFuncS01001_loadMisCtg2();
		}
		
		if(columnName_ === "MISAREA1" || columnName_ === "MISAREA2"
			|| columnName_ === "MISCTG1" || columnName_ === "MISCTG2"
			|| columnName_ === "LEADER_YN"){
			atFuncS01001_search();
		}
	});
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var misTeamView_ = $("[jg-dataset='s01001MinistryTeamList']");
	misTeamView_.JGDatasetUI();
	misTeamView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misTeamView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	var misId_ = atFuncS01001_getMinistryID();
	var condDataView_ = $("[jg-dataset='s01001CondData']");
	
	RKCommon.ministry.getMinistryArea1(misId_,function(data_){
		var dataset_ = JGDS("dataset","s01001Area1Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역1");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
		atFuncS01001_loadMisArea2();
	});
	RKCommon.ministry.getMinistryCategory1(misId_,function(data_){
		var dataset_ = JGDS("dataset","s01001Ctg1Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"사역구분1");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
		atFuncS01001_loadMisCtg2();
	});
	
	atFuncS01001_search();
});

function atFuncS01001_loadMisArea2(){
	var misId_ = atFuncS01001_getMinistryID();
	var condData_ = JGDS("dataset","s01001CondData");
	var condDataView_ = $("[jg-dataset='s01001CondData']");
	condData_.setColumnValue("MISAREA2",0,"",true);
	RKCommon.ministry.getMinistryArea2(misId_,condData_.getColumnValue("MISAREA1",0),function(data_){
		var dataset_ = JGDS("dataset","s01001Area2Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역2");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
}
function atFuncS01001_loadMisCtg2(){
	var misId_ = atFuncS01001_getMinistryID();
	var condData_ = JGDS("dataset","s01001CondData");
	var condDataView_ = $("[jg-dataset='s01001CondData']");
	condData_.setColumnValue("MISCTG2",0,"",true);
	RKCommon.ministry.getMinistryCategory2(misId_,condData_.getColumnValue("MISCTG1",0),function(data_){
		var dataset_ = JGDS("dataset","s01001Ctg2Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"사역구분2");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
}

function atFuncS01001_search(){
	var condData_ = JGDS("dataset","s01001CondData");
	var misTeamData_ = JGDS("dataset","s01001MinistryTeamList");
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "getMinistryTeamList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			misTeamData_.applyJSON(data_.message);
			$("#s01001").attr("rk-content-list-count",misTeamData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}
function atFuncS01001_teamDetailView(element_){
	element_ = $(element_);
	var misId_ = atFuncS01001_getMinistryID();
	var teamId_ = element_.attr("rk-team-id");
	location.href = JGService.requestURL(RKCommon.ministry.requestURLKey)+"/"+misId_+"/"+teamId_;
}