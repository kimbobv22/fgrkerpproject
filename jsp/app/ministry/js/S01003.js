function atFuncS01003_misId(){
	return $("#s01003").attr("rk-mis-id");
}
function atFuncS01003_teamId(){
	return $("#s01003").attr("rk-team-id");
}

$(document).on("pagebeforecreate",function(){
	var teamDataView_ = $("[jg-dataset='s01003TeamData']");
	teamDataView_.JGDatasetUI();
	
	teamDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	teamDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});

function atFuncS01003_refresh(callback_){
	$.blockUI();
	var teamData_ = JGDS("dataset","s01003TeamData");
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "GetDetailMinistryTeam"
			,misId : atFuncS01003_misId()
			,teamId : atFuncS01003_teamId()
		},success : function(data_){
			teamData_.applyJSON(data_.message);
			if(!isNull(callback_)) callback_(teamData_);
			$.unblockUI();
		},error : function(response_, errorStr_){
			$.unblockUI();
			alert("에러발생!");
		}
	});
}