$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","a03005CondData");
	var condDataView_ = $("[jg-dataset='a03005CondData']");
	
	condDataView_.JGDatasetUI();
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	condData_.addRow();
	condData_.setColumnValue("MIS_ID",0,$("#a03005").attr("rk-mis-id"),true);
	condData_.setColumnValue("MIS_TITLE",0,$("#a03005").attr("rk-mis-title"),true);
	condData_.setColumnValue("STATUS",0,"00003",true);
	condData_.setColumnValue("ORDER_CTG",0,"00001",true);
	condData_.setColumnValue("BELONG_CTG1",0,"",true);
	condData_.setColumnValue("BELONG_CTG2",0,"",true);
	condData_.setColumnValue("BELONG_CTG3",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "BELONG_CTG1"){
			condData_.setColumnValue("BELONG_CTG2",0,"");
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA03005_loadBelongCtg2();
			atFuncA03005_loadBelongCtg3();
		}else if(columnName_ === "BELONG_CTG2"){
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA03005_loadBelongCtg3();
		}
		
		if(columnName_ === "STATUS" || columnName_ === "BELONG_CTG1"
			 || columnName_ === "BELONG_CTG2" || columnName_ === "BELONG_CTG3" || columnName_ === "MIS_ID"){
			atFuncA03005_search();
		}
	});
	
	var applyView_ = $("[jg-dataset='a03005ApplyData']");
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
		JGDS("dataset","a03005BelongCtg1", data_);
	});
	atFuncA03005_loadBelongCtg2();
	atFuncA03005_loadBelongCtg3();
	RKCommon.gcode([{codeId : "A0003", addTitle : true},{codeId : "A0009"}],function(){
		$("[jg-dataset='a03005CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
});

function atFuncA03005_loadBelongCtg2(){
	var condData_ = JGDS("dataset","a03005CondData");
	var belongCtg1_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg1_, title : "소속2"},function(data_){
		JGDS("dataset","a03005BelongCtg2", data_);		
		$("[jg-dataset='a03005CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}
function atFuncA03005_loadBelongCtg3(){
	var condData_ = JGDS("dataset","a03005CondData");
	var belongCtg2_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg2_, title : "소속3"},function(data_){
		JGDS("dataset","a03005BelongCtg3", data_);		
		$("[jg-dataset='a03005CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncA03005_search();
}

function atFuncA03005_selectMinistry(){
	RKCommon.ministry.popupSelectMinistry(function(data_){
		if(isNull(data_)) return;
		var condData_ = JGDS("dataset","a03005CondData");
		condData_.setColumnValue("mis_id",0,data_.misId);
		condData_.setColumnValue("mis_title",0,data_.misTitle);
	});
}
function atFuncA03005_emptyMinistry(){
	var condData_ = JGDS("dataset","a03005CondData");
	condData_.setColumnValue("mis_id",0,"");
	condData_.setColumnValue("mis_title",0,"");
}

function atFuncA03005_search(){
	var condData_ = JGDS("dataset","a03005CondData");
	var applyData_ = JGDS("dataset","a03005ApplyData");
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "admin_getLeaderApplyList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			applyData_.applyJSON(data_.message);
			var rowCount_ = applyData_.getRowCount();
			var title_ = (rowCount_ > 0 ? "총 "+rowCount_+"개" : "검색된 지원서가 없습니다");
			$(".a03005 .no-row h4").text(title_);
		},error : function(){
			alert("에러발생!");
		}
	});
}
function atFuncA03005_goApply(rowIndex_){
	var applyData_ = JGDS("dataset","a03005ApplyData");
	var misId_ = applyData_.getColumnValue("mis_id",rowIndex_);
	var memSid_ = applyData_.getColumnValue("mem_sid",rowIndex_);
	location.href = JGService.requestURL(RKCommon.apply.requestURLKey)+"/leader/"+misId_+"/"+memSid_;
}