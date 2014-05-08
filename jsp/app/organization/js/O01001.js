$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","o01001CondData");
	var condDataView_ = $("[jg-dataset='o01001CondData']");
	
	condDataView_.JGDatasetUI();
	condData_.addRow();
	condData_.setColumnValue("ORGAREA1",0,"",true);
	condData_.setColumnValue("ORGAREA2",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "ORGAREA1"){
			atFuncO01001_loadOrgArea2();
		}
		
		if(columnName_ === "ORGAREA1" || columnName_ === "ORGAREA2"){
			atFuncO01001_search();
		}
	});
	
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var orgListView_ = $("[jg-dataset='o01001OraganizationData']");
	orgListView_.JGDatasetUI();
	orgListView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	orgListView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	var condDataView_ = $("[jg-dataset='o01001CondData']");
	
	RKCommon.organization.getOrganizationArea1(function(data_){
		var dataset_ = JGDS("dataset","o01001Area1Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역1");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
		atFuncO01001_loadOrgArea2();
	});
	atFuncO01001_search();
});

function atFuncO01001_loadOrgArea2(){
	var condData_ = JGDS("dataset","o01001CondData");
	var condDataView_ = $("[jg-dataset='o01001CondData']");
	RKCommon.organization.getOrganizationArea2(condData_.getColumnValue("ORGAREA1",0),function(data_){
		var dataset_ = JGDS("dataset","o01001Area2Data");
		dataset_.applyJSON(data_);
		dataset_.insertRow(0);
		dataset_.setColumnValue("NM",0,"지역2");
		dataset_.setColumnValue("ID",0,"");
		condDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
}

function atFuncO01001_search(){
	var condData_ = JGDS("dataset","o01001CondData");
	var orgListData_ = JGDS("dataset","o01001OraganizationData");
	JGService.ajax(RKCommon.organization.requestURLKey,{
		data : {
			srvID : "getOrganizationList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			orgListData_.applyJSON(data_.message);
			$("#o01001").attr("rk-content-list-count",orgListData_.getRowCount());
		},error : function(){
			alert("에러발생!");
		}
	});
}

function atFuncO01001_organizationDetailView(element_){
	element_ = $(element_);
	var orgId_ = element_.attr("rk-org-id");
	location.href = JGService.requestURL(RKCommon.organization.requestURLKey)+"/"+orgId_;
}

function atFuncO01001_newOrganizationInfo(){
	JGService.forwardService(RKCommon.organization.requestURLKey,{
		srvID : "newOrganizationInfo"
	});
}