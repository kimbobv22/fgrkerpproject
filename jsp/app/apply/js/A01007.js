$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","a01007CondData");
	var condDataView_ = $("[jg-dataset='a01007CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	/*
	condData_.setColumnValue("STATUS",0,"",true);
	condData_.setColumnValue("YEAR",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "STATUS" || columnName_ === "YEAR"){
			atFuncS02001_search();
		}
	});*/
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var misView_ = $("[jg-dataset='a01007MinistryList']");
	misView_.JGDatasetUI();
	misView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
/*
$(document).ready(function(){
	var condDataView_ = $("[jg-dataset='a01007CondData']");
	RKCommon.ministry.getMinistryStatusList(function(data_){
		var dataset_ = JGDS("dataset","a01007StatusData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역상태"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	RKCommon.ministry.getMinistryYearList(function(data_){
		var dataset_ = JGDS("dataset","a01007YearData",data_);
		dataset_.insertRow(0);
		dataset_.setColumnValues({
			ID : ""
			,NM : "사역년도"
		},0);
		condDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncA01007_search();
});*/

function atFuncA01007_search(){
	var condData_ = JGDS("dataset","a01007CondData");
	var misData_ = JGDS("dataset","a01007MinistryList");
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "getLeaderApplyTargetList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			misData_.applyJSON(data_.message);
			$("#a01007").attr("rk-content-list-count",misData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}
function atFuncA01007_applyHandle(rowIndex_){
	var misData_ = JGDS("dataset","a01007MinistryList");
	var misId_ = misData_.getColumnValue("mis_id",rowIndex_);
	var didWrite_ = misData_.getColumnValue("did_write",rowIndex_) === "Y";
	
	if(!didWrite_){
		location.href = JGService.requestURL(RKCommon.apply.requestURLKey,{srvID : "newLeaderApplyView"
			,misId : misId_});
	}else{
		location.href = JGService.requestURL(RKCommon.apply.requestURLKey)+"/leader/"+misId_;
	}
}