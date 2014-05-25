$(document).on("pagebeforecreate",function(){
	var condView_ = $("[jg-dataset='e05001CondData']");
	var dataView_ = $("[jg-dataset='e05001AttendData']");
	
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
	
	var page_ = $("#e05001");
	condData_.addColumns("MIS_ID","BELONG_CTG1","BELONG_CTG2","BELONG_CTG3","SEARCH_TEXT");
	condData_.addRow();
	condData_.setColumnValues({
		MIS_ID : page_.attr("rk-mis-id"),
		MIS_TITLE : page_.attr("rk-mis-title"),
		EDU_ID : page_.attr("rk-edu-id"),
		EDU_NM : page_.attr("rk-edu-nm"),
		EDU_DID : page_.attr("rk-edu-did"),
		EDU_DNM : page_.attr("rk-edu-dnm"),
		BELONG_CTG1 : "",
		BELONG_CTG2 : "",
		BELONG_CTG3 : "",
		SEARCH_TEXT : ""
	},0,true);
	
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "BELONG_CTG1"){
			condData_.setColumnValue("BELONG_CTG2",0,"");
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncE05001_loadBelongCtg2();
			atFuncE05001_loadBelongCtg3();
		}else if(columnName_ === "BELONG_CTG2"){
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncE05001_loadBelongCtg3();
		}
	});
});

$(document).ready(function(){
	RKCommon.belong.getBelongCategory({belongId : RKCommon.belong.rootBelongId, title : "소속1"},function(data_){
		JGDS("dataset","e05001BelongCtg1", data_);
	});
	atFuncE05001_loadBelongCtg2();
	atFuncE05001_loadBelongCtg3();
	atFuncE05001_search();
});

function atFuncE05001_loadBelongCtg2(){
	var condData_ = JGDS("dataset","e05001CondData");
	var belongCtg1_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg1_, title : "소속2"},function(data_){
		JGDS("dataset","e05001BelongCtg2", data_);		
		$("[jg-dataset='e05001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}
function atFuncE05001_loadBelongCtg3(){
	var condData_ = JGDS("dataset","e05001CondData");
	var belongCtg2_ = condData_.getColumnValue("belong_ctg2",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg2_, title : "소속3"},function(data_){
		JGDS("dataset","e05001BelongCtg3", data_);		
		$("[jg-dataset='e05001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncE05001_search();
}

function atFuncE05001_search(callback_){
	JGService.ajax(RKCommon.education.requestURLKey,{
		data : {
			srvID : "getAttendList",
			condData : JGDS("dataset", "e05001CondData").toJSONString(true)
		},success : function(data_){
			if(data_.result === 0){
				JGDS("dataset", "e05001AttendData").applyJSON(data_.message);
				if(!isNull(callback_)) callback_(true);
			}else if(!isNull(callback_)) callback_(false);
			
		},error : function(){
			alert("에러발생");
			if(!isNull(callback_)) callback_(false);
		}
	});
}

function atFuncE05001_switchAttend(btn_, rowIndex_){
	var attendData_ = JGDS("dataset","e05001AttendData");
	var misId_ = attendData_.getColumnValue("MIS_ID",rowIndex_);
	var eduId_ = attendData_.getColumnValue("EDU_ID",rowIndex_);
	var eduDid_ = attendData_.getColumnValue("EDU_DID",rowIndex_);
	var memSid_ = attendData_.getColumnValue("MEM_SID",rowIndex_);
	var attendStatus_ = BLK(attendData_.getColumnValue("ATTEND_STATUS",rowIndex_),"00001");
	attendStatus_ = (attendStatus_ === "00001" ? "00003" : (attendStatus_ === "00003" ? "00005" : "00001"));
	
	$(btn_).addClass("ui-disabled");
	RKCommon.education.updateAttend(misId_, eduId_, eduDid_, memSid_, attendStatus_, function(result_){
		if(!NVL(result_,false)){
			alert("에러발생");
		}else{
			attendData_.setColumnValue("ATTEND_STATUS",rowIndex_, attendStatus_);
		}
		$(btn_).removeClass("ui-disabled");
	});
}

function atFuncE05001_switchFee(btn_, rowIndex_){
	var attendData_ = JGDS("dataset","e05001AttendData");
	var misId_ = attendData_.getColumnValue("MIS_ID",rowIndex_);
	var memSid_ = attendData_.getColumnValue("MEM_SID",rowIndex_);
	var boolValue_ = (attendData_.getColumnValue("FEE_YN",rowIndex_) === "Y" ? false : true);
	
	$(btn_).addClass("ui-disabled");
	RKCommon.apply.updateFee(misId_, memSid_, boolValue_, function(result_){
		if(!NVL(result_,false)){
			alert("에러발생");
		}else{
			attendData_.setColumnValue("FEE_YN",rowIndex_, (boolValue_ ? "Y" : "N"));
		}
		$(btn_).removeClass("ui-disabled");
	});
}

function atFuncE05001_switchReport(btn_, rowIndex_){
	var attendData_ = JGDS("dataset","e05001AttendData");
	var misId_ = attendData_.getColumnValue("MIS_ID",rowIndex_);
	var memSid_ = attendData_.getColumnValue("MEM_SID",rowIndex_);
	var boolValue_ = (attendData_.getColumnValue("BOOKREPORT_YN",rowIndex_) === "Y" ? false : true);
	
	$(btn_).addClass("ui-disabled");
	RKCommon.apply.updateBookReport(misId_, memSid_, boolValue_, function(result_){
		if(!NVL(result_,false)){
			alert("에러발생");
		}else{
			attendData_.setColumnValue("BOOKREPORT_YN",rowIndex_, (boolValue_ ? "Y" : "N"));
		}
		$(btn_).removeClass("ui-disabled");
	});
}