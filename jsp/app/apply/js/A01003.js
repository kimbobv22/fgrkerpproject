$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","a01003CondData");
	condData_.addRow();
	condData_.setColumnValue("misId",0,$("#a01003").attr("rk-mis-id"),true);
	condData_.setColumnValue("memSid",0,$("#a01003").attr("rk-mem-sid"),true);
	
	var misDataView_ = $("[jg-dataset='a01003MisData']");
	var basicDataView_ = $("[jg-dataset='a01003BasicData']");
	var qnaDataView_ = $("[jg-dataset='a01003QnaData']");
	
	misDataView_.JGDatasetUI();
	misDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	basicDataView_.JGDatasetUI();
	basicDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	basicDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	qnaDataView_.JGDatasetUI();
	qnaDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	qnaDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	var basicData_ = JGDS("dataset","a01003BasicData");
	$(basicData_).on("columnvaluechanged",function(event_, columnName_, rowIndex_, columnValue_){
		if(columnName_ === "BELONG_CTG1"){
			basicData_.setColumnValue("BELONG_CTG2",0,"");
			basicData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA01003_loadBelongCtg2();
			atFuncA01003_loadBelongCtg3();
		}else if(columnName_ === "BELONG_CTG2"){
			basicData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA01003_loadBelongCtg3();
		}
	});
});
$(document).ready(function(){
	RKCommon.belong.getBelongCategory({belongId : RKCommon.belong.rootBelongId, title : "소속1"},function(data_){
		JGDS("dataset","a01003BelongCtg1", data_);
	});
});

function atFuncA01003_loadBelongCtg2(){
	var basicData_ = JGDS("dataset","a01003BasicData");
	var belongCtg1_ = basicData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg1_, title : "소속2"},function(data_){
		JGDS("dataset","a01003BelongCtg2", data_);		
		var basicDataView_ = $("[jg-dataset='a01003BasicData']");
		basicDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}
function atFuncA01003_loadBelongCtg3(){
	var basicData_ = JGDS("dataset","a01003BasicData");
	var belongCtg2_ = basicData_.getColumnValue("belong_ctg2",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg2_, title : "소속3"},function(data_){
		JGDS("dataset","a01003BelongCtg3", data_);
		var basicDataView_ = $("[jg-dataset='a01003BasicData']");
		basicDataView_.trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}

function atFuncA01003_refresh(callback_){
	$.blockUI();
	var condData_ = JGDS("dataset","a01003CondData");
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "getMemberApplyData"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			$.unblockUI();
			var result_ = data_.message;
			var misData_ = JGDS("dataset","a01003MisData");
			var basicData_ = JGDS("dataset","a01003BasicData");
			var qnaData_ = JGDS("dataset","a01003QnaData");
			
			misData_.applyJSON(result_.ministry);
			basicData_.applyJSON(result_.basic);
			qnaData_.applyJSON(result_.qna);
			
			basicData_.setColumnValue("BELONG_CTG2",0,BLK(basicData_.getColumnValue("BELONG_CTG2",0)));
			basicData_.setColumnValue("BELONG_CTG3",0,BLK(basicData_.getColumnValue("BELONG_CTG3",0)));
			
			if(!isNull(callback_)) callback_(true);
		},error : function(){
			$.unblockUI();
			alert("에러발생");
			if(!isNull(callback_)) callback_(false);
		}
	});
}