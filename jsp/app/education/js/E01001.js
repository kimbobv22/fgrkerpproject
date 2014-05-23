$(document).on("pagebeforecreate",function(){
	var condView_ = $("[jg-dataset='e01001CondData']");
	var dataView_ = $("[jg-dataset='e01001EduData']");
	
	condView_.JGDatasetUI();
	dataView_.JGDatasetUI();
	
	var condData_ = condView_.JGDatasetUI("dataset");
	
	condView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	dataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	dataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	condData_.addRow();
	condData_.setColumnValues({
		MIS_ID : $("#e01001").attr("rk-mis-id"),
		MIS_TITLE : $("#e01001").attr("rk-mis-title"),
		STATUS : "",
		SEARCH_TEXT : ""
	},0,true);
});

$(document).ready(function(){
	RKCommon.gcode([{codeId : "E0001", addTitle : true}],function(){
		$("[jg-dataset='e01001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncE01001_search();
});

function atFuncE01001_search(callback_){
	JGService.ajax(RKCommon.education.requestURLKey,{
		data : {
			srvID : "getEducationList",
			condData : JGDS("dataset", "e01001CondData").toJSONString(true)
		},success : function(data_){
			if(data_.result === 0){
				JGDS("dataset", "e01001EduData").applyJSON(data_.message);
				if(!isNull(callback_)) callback_(true);
			}else if(!isNull(callback_)) callback_(false);
			
		},error : function(){
			alert("에러발생");
			if(!isNull(callback_)) callback_(false);
		}
	});
}

function atFuncE01001_selectMinistry(){
	RKCommon.ministry.popupSelectMinistry(function(data_){
		if(isNull(data_)) return;
		var condData_ = JGDS("dataset","e01001CondData");
		condData_.setColumnValue("mis_id",0,data_.misId);
		condData_.setColumnValue("mis_title",0,data_.misTitle);
	});
}

function atFuncE01001_select(rowIndex_){
	var eduData_ = JGDS("dataset","e01001EduData");
	var misId_ = eduData_.getColumnValue("mis_id",rowIndex_);
	var eduId_ = eduData_.getColumnValue("edu_id",rowIndex_);
	location.href = JGService.requestURL(RKCommon.education.requestURLKey)+"/"+misId_+"/"+eduId_;
}