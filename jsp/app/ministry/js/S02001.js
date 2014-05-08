$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","s02001CondData");
	var condDataView_ = $("[jg-dataset='s02001CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	condData_.setColumnValue("STATUS",0,"",true);
	condData_.setColumnValue("YEAR",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "STATUS" || columnName_ === "YEAR"){
			atFuncS02001_search();
		}
	});
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var misView_ = $("[jg-dataset='s02001MinistryList']");
	misView_.JGDatasetUI();
	misView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	var condDataView_ = $("[jg-dataset='s02001CondData']");
	RKCommon.ministry.getMinistryStatusList(function(data_){
		var dataset_ = JGDS("dataset","s02001StatusData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역상태"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	RKCommon.ministry.getMinistryYearList(function(data_){
		var dataset_ = JGDS("dataset","s02001YearData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역년도"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncS02001_search();
});

function atFuncS02001_search(){
	var condData_ = JGDS("dataset","s02001CondData");
	var misData_ = JGDS("dataset","s02001MinistryList");
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "getMinistryList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			misData_.applyJSON(data_.message);
			$("#s02001").attr("rk-content-list-count",misData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}

function atFuncS02001_goMinistryTeamList(rowIndex_){
	var misData_ = JGDS("dataset","s02001MinistryList");
	var misId_ = misData_.getColumnValue("MIS_ID",0);
	location.href = JGService.requestURL(RKCommon.ministry.requestURLKey)+"/"+misId_;
}