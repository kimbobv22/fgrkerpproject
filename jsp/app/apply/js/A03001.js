$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","a03001CondData");
	var condDataView_ = $("[jg-dataset='a03001CondData']");
	
	condDataView_.JGDatasetUI();
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	condData_.addRow();
	condData_.setColumnValue("MIS_ID",0,$("#a03001").attr("rk-mis-id"),true);
	condData_.setColumnValue("MIS_TITLE",0,$("#a03001").attr("rk-mis-title"),true);
	condData_.setColumnValue("STATUS",0,"00003",true);
	condData_.setColumnValue("ORDER_CTG",0,"00001",true);
	condData_.setColumnValue("BELONG_CTG1",0,"",true);
	condData_.setColumnValue("BELONG_CTG2",0,"",true);
	condData_.setColumnValue("BELONG_CTG3",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "BELONG_CTG1"){
			condData_.setColumnValue("BELONG_CTG2",0,"");
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA03001_loadBelongCtg2();
			atFuncA03001_loadBelongCtg3();
		}else if(columnName_ === "BELONG_CTG2"){
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA03001_loadBelongCtg3();
		}
		
		if(columnName_ === "STATUS" || columnName_ === "BELONG_CTG1"
			 || columnName_ === "BELONG_CTG2" || columnName_ === "BELONG_CTG3" || columnName_ === "MIS_ID"){
			atFuncA03001_search();
		}
	});
	
	var applyView_ = $("[jg-dataset='a03001ApplyData']");
	applyView_.JGDatasetUI();
	applyView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	applyView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});

$(document).ready(function(){
	RKCommon.belong.getBelongCategory({belongId : RKCommon.belong.rootBelongId, title : "소속1"},function(data_){
		JGDS("dataset","a03001BelongCtg1", data_);
	});
	atFuncA03001_loadBelongCtg2();
	atFuncA03001_loadBelongCtg3();
	RKCommon.gcode([{codeId : "A0003", addTitle : true},{codeId : "A0009"}],function(){
		$("[jg-dataset='a03001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
});

function atFuncA03001_loadBelongCtg2(){
	var condData_ = JGDS("dataset","a03001CondData");
	var belongCtg1_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg1_, title : "소속2"},function(data_){
		JGDS("dataset","a03001BelongCtg2", data_);		
		$("[jg-dataset='a03001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}
function atFuncA03001_loadBelongCtg3(){
	var condData_ = JGDS("dataset","a03001CondData");
	var belongCtg2_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg2_, title : "소속3"},function(data_){
		JGDS("dataset","a03001BelongCtg3", data_);		
		$("[jg-dataset='a03001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncA03001_search();
}

function atFuncA03001_selectMinistry(){
	RKCommon.ministry.popupSelectMinistry(function(data_){
		if(isNull(data_)) return;
		var condData_ = JGDS("dataset","a03001CondData");
		condData_.setColumnValue("mis_id",0,data_.misId);
		condData_.setColumnValue("mis_title",0,data_.misTitle);
	});
}
function atFuncA03001_emptyMinistry(){
	var condData_ = JGDS("dataset","a03001CondData");
	condData_.setColumnValue("mis_id",0,"");
	condData_.setColumnValue("mis_title",0,"");
}

function atFuncA03001_search(){
	var condData_ = JGDS("dataset","a03001CondData");
	var applyData_ = JGDS("dataset","a03001ApplyData");
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "admin_getMemberApplyList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			applyData_.applyJSON(data_.message);
		},error : function(){
			alert("에러발생!");
		}
	});
}
function atFuncA03001_goApply(rowIndex_){
	var applyData_ = JGDS("dataset","a03001ApplyData");
	var misId_ = applyData_.getColumnValue("mis_id",rowIndex_);
	var memSid_ = applyData_.getColumnValue("mem_sid",rowIndex_);
	
	RKCommon.openPopupWindow({
		width : screen.width,
		height: screen.height,
		scrollBars : true,
		url : JGService.requestURL(RKCommon.apply.requestURLKey)+"/member/"+misId_+"/"+memSid_
	});
}

function atFuncA03001_switchReport(btn_, rowIndex_){
	var applyData_ = JGDS("dataset","a03001ApplyData");
	var misId_ = applyData_.getColumnValue("MIS_ID",rowIndex_);
	var memSid_ = applyData_.getColumnValue("MEM_SID",rowIndex_);
	var boolValue_ = (applyData_.getColumnValue("BOOKREPORT_YN",rowIndex_) === "Y" ? false : true);
	
	$(btn_).addClass("ui-disabled");
	RKCommon.apply.updateBookReport(misId_, memSid_, boolValue_, function(result_){
		if(!NVL(result_,false)){
			alert("에러발생");
		}else{
			applyData_.setColumnValue("BOOKREPORT_YN",rowIndex_, (boolValue_ ? "Y" : "N"));
		}
		$(btn_).removeClass("ui-disabled");
	});
}
function atFuncA03001_switchFee(btn_, rowIndex_){
	var applyData_ = JGDS("dataset","a03001ApplyData");
	var misId_ = applyData_.getColumnValue("MIS_ID",rowIndex_);
	var memSid_ = applyData_.getColumnValue("MEM_SID",rowIndex_);
	var boolValue_ = (applyData_.getColumnValue("FEE_YN",rowIndex_) === "Y" ? false : true);
	
	$(btn_).addClass("ui-disabled");
	RKCommon.apply.updateFee(misId_, memSid_, boolValue_, function(result_){
		if(!NVL(result_,false)){
			alert("에러발생");
		}else{
			applyData_.setColumnValue("FEE_YN",rowIndex_, (boolValue_ ? "Y" : "N"));
		}
		$(btn_).removeClass("ui-disabled");
	});
}