function atFuncS02003_misId(){
	return $("#s02003").attr("rk-mis-id");
}

$(document).on("pagebeforecreate",function(){
	var misDataView_ = $("[jg-dataset='s02003MisData']");
	misDataView_.JGDatasetUI();
	misDataView_.JGValidator();
	misDataView_.JGValidator("failedMessages",{
		mis_title : {
			required : "사역명을 입력하여 주세요"
		},mis_desc : {
			required : "사역소개를 입력하여 주세요"
		},status : {
			required : "사역상태를 선택하여 주세요"
		},start_date : {
			required : "사역시작일을 선택하여 주세요"
		},end_date : {
			required : "사역종료일을 선택하여 주세요"
		}
	});
	
	misDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$($(this).children()[rowIndex_]).trigger("create");
	});
	misDataView_.on("datasetuicolumnrefreshed",function(event_, columnName_, rowIndex_){
		$($(this).children()[rowIndex_]).find("select").selectmenu("refresh");
	});
});
$(document).ready(function(){
	RKCommon.gcode([{codeId : "S0001",addTitle : true}],function(){
		var misDataView_ = $("[jg-dataset='s02003MisData']");
		misDataView_.trigger("datasetuicolumnrefreshed",[null,0]);
	});
	atFuncS02003_refresh();
});

function atFuncS02003_refresh(){
	$.blockUI();
	JGService.ajax(RKCommon.ministry.requestURLKey,{
		data : {
			srvID : "getMinistryData"
			,misId : atFuncS02003_misId()
		},success : function(data_){
			var misData_ = JGDS("dataset","s02003MisData");
			misData_.applyJSON(data_.message);
			if(misData_.getRowCount() === 0){
				misData_.addRow();
				misData_.setColumnValue("STATUS",0,"",true);
			}
			
			$.unblockUI();
		},error : function(response_, errorStr_){
			$.unblockUI();
			alert("에러발생!");
		}
	});
}

function atFuncS02003_update(){
	$.blockUI();
	var misData_ = JGDS("dataset","s02003MisData");
	var misDataView_ = $("[jg-dataset='s02003MisData']");
	misDataView_.JGValidator("validate",function(result_){
		if(!result_){
			$.unblockUI();
			return;
		}
		
		JGService.ajax(RKCommon.ministry.requestURLKey,{
			data : {
				srvID : "updateMinistryData"
				,misData : misData_.toJSONString(false)
			},success : function(data_){
				atFuncS02003_refresh();
				$.unblockUI();
			},error : function(response_, errorStr_){
				$.unblockUI();
				alert("에러발생!");
			}
		});
	});
}
function atFuncS02003_add(){
	$.blockUI();
	var misData_ = JGDS("dataset","s02003MisData");
	var misDataView_ = $("[jg-dataset='s02003MisData']");
	misDataView_.JGValidator("validate",function(result_){
		if(!result_){
			$.unblockUI();
			return;
		}
		
		JGService.ajax(RKCommon.ministry.requestURLKey,{
			data : {
				srvID : "addMinistryData"
				,misData : misData_.toJSONString(false)
			},success : function(data_){
				location.href = JGService.requestURL(RKCommon.ministry.requestURLKey,{
					srvID : "ministryView"
					,misId : data_.message
				});
				$.unblockUI();
			},error : function(response_, errorStr_){
				$.unblockUI();
				alert("에러발생!");
			}
		});
	});
}
function atFuncS02003_remove(){
	if(confirm("사역을 삭제하면 사역에 포함되어 있는 모든 항목(팀,교육)도 같이 삭제됩니다. 진행하시겠습니까?")){
		$.blockUI();
		RKCommon.cryptJSON({misId : atFuncS02003_misId()},function(cryptedData_){
			JGService.ajax(RKCommon.ministry.requestURLKey,{
				data : $.extend({srvID : "removeMinistryData"},cryptedData_)
				,success : function(){
					location.href = JGService.requestURL(RKCommon.ministry.requestURLKey);
				},error : function(){
					$.unblockUI();
					alert("에러발생");
				}
			});
		});
	}
}