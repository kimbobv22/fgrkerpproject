$(document).on("pagebeforecreate",function(){
	var condData_ = JGDS("dataset","a09001CondData");
	var condDataView_ = $("[jg-dataset='a09001CondData']");
	
	condDataView_.JGDatasetUI();
	condDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	condDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
	
	condData_.addRow();
	condData_.setColumnValue("MIS_ID",0,$("#a09001").attr("rk-mis-id"),true);
	condData_.setColumnValue("STATUS",0,"00003",true);
	condData_.setColumnValue("ORDER_CTG",0,"00001",true);
	condData_.setColumnValue("BELONG_CTG1",0,"",true);
	condData_.setColumnValue("BELONG_CTG2",0,"",true);
	condData_.setColumnValue("BELONG_CTG3",0,"",true);
	
	$(condData_).on("columnvaluechanged",function(event_,columnName_,rowIndex_){
		if(columnName_ === "BELONG_CTG1"){
			condData_.setColumnValue("BELONG_CTG2",0,"");
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA09001_loadBelongCtg2();
			atFuncA09001_loadBelongCtg3();
		}else if(columnName_ === "BELONG_CTG2"){
			condData_.setColumnValue("BELONG_CTG3",0,"");
			atFuncA09001_loadBelongCtg3();
		}
		
		if(columnName_ === "STATUS" || columnName_ === "BELONG_CTG1"
			 || columnName_ === "BELONG_CTG2" || columnName_ === "BELONG_CTG3"){
			atFuncA09001_search();
		}
	});
	
	var applyView_ = $("[jg-dataset='a09001LeaderData']");
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
		JGDS("dataset","a09001BelongCtg1", data_);
	});
	atFuncA09001_loadBelongCtg2();
	atFuncA09001_loadBelongCtg3();
	RKCommon.gcode([{codeId : "A0003", addTitle : true},{codeId : "A0009"}],function(){
		$("[jg-dataset='a09001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
});

function atFuncA09001_loadBelongCtg2(){
	var condData_ = JGDS("dataset","a09001CondData");
	var belongCtg1_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg1_, title : "소속2"},function(data_){
		JGDS("dataset","a09001BelongCtg2", data_);		
		$("[jg-dataset='a09001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
}
function atFuncA09001_loadBelongCtg3(){
	var condData_ = JGDS("dataset","a09001CondData");
	var belongCtg2_ = condData_.getColumnValue("belong_ctg1",0);
	RKCommon.belong.getBelongCategory({belongId : belongCtg2_, title : "소속3"},function(data_){
		JGDS("dataset","a09001BelongCtg3", data_);		
		$("[jg-dataset='a09001CondData']").trigger("datasetuicolumnrefreshed",[null, 0]);
	});
	atFuncA09001_search();
}

function atFuncA09001_search(){
	var condData_ = JGDS("dataset","a09001CondData");
	var leaderData_ = JGDS("dataset","a09001LeaderData");
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "popup_getLeaderList"
			,condData : condData_.toJSONString(false)
		},success : function(data_){
			leaderData_.applyJSON(data_.message);
			var rowCount_ = leaderData_.getRowCount();
			var title_ = (rowCount_ > 0 ? "총 "+rowCount_+"개" : "검색된 지원서가 없습니다");
			$(".a09001 .no-row h4").text(title_);
		},error : function(){
			alert("에러발생!");
		}
	});
}
function atFuncA09001_select(rowIndex_){
	var leaderData_ = JGDS("dataset","a09001LeaderData");
	var misId_ = leaderData_.getColumnValue("mis_id",rowIndex_);
	var memSid_ = leaderData_.getColumnValue("mem_sid",rowIndex_);
	var name_ = leaderData_.getColumnValue("name",rowIndex_);
	var photoId_ = leaderData_.getColumnValue("photo_id",rowIndex_);
	var phone1_ = leaderData_.getColumnValue("phone1",rowIndex_);
	var phone2_ = leaderData_.getColumnValue("phone2",rowIndex_);
	var belongCtg1_ = leaderData_.getColumnValue("belong_ctg1",rowIndex_);
	var belongCtg2_ = leaderData_.getColumnValue("belong_ctg2",rowIndex_);
	
	if(!isNull(window.opener.A09001Callback)) window.opener.A09001Callback.apply(window.opener,[
	{
		misId : misId_,
		memSid : memSid_,
		name : name_,
		photoId : photoId_,
		phone1 : phone1_,
		phone2 : phone2_,
		belongCtg1 : belongCtg1_,
		belongCtg2 : belongCtg2_
	}]);
	window.close();
}