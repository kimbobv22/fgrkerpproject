$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","s09002CondData");
	var condDataView_ = $("[jg-dataset='s09002CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	condData_.setColumnValue("STATUS",0,"",true);
	condData_.setColumnValue("YEAR",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "STATUS" || columnName_ === "YEAR"){
			atFuncS09002_search();
		}
	});
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var misView_ = $("[jg-dataset='s09002MinistryList']");
	misView_.JGDatasetUI();
	misView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	var condDataView_ = $("[jg-dataset='s09002CondData']");
	RKCommon.ministry.getMinistryStatusList(function(data_){
		var dataset_ = JGDS("dataset","s09002StatusData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역상태"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	RKCommon.ministry.getMinistryYearList(function(data_){
		var dataset_ = JGDS("dataset","s09002YearData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역년도"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncS09002_search();
});

function atFuncS09002_search(){
	var condData_ = JGDS("dataset","s09002CondData");
	var misData_ = JGDS("dataset","s09002MinistryList");
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "getMinistryList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			misData_.applyJSON(data_.message);
			$("#s09002").attr("rk-content-list-count",misData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}

function atFuncS09002_select(rowIndex_){
	var misData_ = JGDS("dataset","s09002MinistryList");
	var misId_ = misData_.getColumnValue("mis_id",rowIndex_);
	var misTitle_ = misData_.getColumnValue("mis_title",rowIndex_);
	
	if(!isNull(window.opener.S09002Callback)) window.opener.S09002Callback.apply(window.opener,[{misId : misId_, misTitle: misTitle_}]);
	window.close();
}