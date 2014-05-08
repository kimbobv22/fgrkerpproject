$(document).on("pagebeforecreate",function(){
	var basicDataView_ = $("[jg-dataset='a01009BasicData']");
	basicDataView_.on("datasetuirowmapped",function(event_, rowIndex_){
		$("[rk-photo][rk-photo-id]").on("rkphotochange",function(){
			var basicData_ = JGDS("dataset","a01009BasicData");
			basicData_.setColumnValue("DID_CHANGE_PHOTO",0,true, true);
		});
	});
});
	
function atFuncA01009_checkValidation(callback_){
	var basicDataView_ = $("[jg-dataset='a01009BasicData']");
	basicDataView_.JGValidator("validate",function(result_){
		if(!result_){
			callback_(false);
			return;
		}
		var qnaDataView_ = $("[jg-dataset='a01009QnaData']");
		qnaDataView_.JGValidator("validate",callback_);
	});
}

function _atFuncA01009_update(callback_){
	$.blockUI();
	var misData_ = JGDS("dataset","a01009MisData");
	var basicData_ = JGDS("dataset","a01009BasicData");
	var qnaData_ = JGDS("dataset","a01009QnaData");
	
	JGService.ajax(RKCommon.apply.requestURLKey,{
		data : {
			srvID : "updateLeaderApplyData"
			,misData : misData_.toJSONString(false)
			,basicData : basicData_.toJSONString(false)
			,qnaData : qnaData_.toJSONString(false)
		},success : function(data_){
			$.unblockUI();
			atFuncA01009_refresh(function(){
				if(!isNull(callback_)) callback_(true);
			});
		},error : function(response_, errorStr_){
			$.unblockUI();
			alert("에러발생");
			if(!isNull(callback_)) callback_(false);
		}
	});
}
function atFuncA01009_update(callback_){
	var photoView_ = $("[rk-photo][rk-photo-id]");
	var basicData_ = JGDS("dataset","a01009BasicData");
	if(basicData_.getColumnValue("DID_CHANGE_PHOTO",0) === true
			&& photoView_.RKPhoto("isLocalPath")
			&& BLK(photoView_.RKPhoto("previewPath")).length > 0){
		
		$.blockUI();
		photoView_.RKPhoto("upload",function(photoId_){
			$.unblockUI();
			if(isNull(photoId_)){
				alert("에러발생");
				return;
			}
			
			basicData_.setColumnValue("PHOTO_ID",0,photoId_);
			_atFuncA01009_update(callback_);
		});
		
	}else _atFuncA01009_update(callback_);
}

function atFuncA01009_submit(){
	atFuncA01009_checkValidation(function(result_){
		if(!result_) return;
		
		atFuncA01009_update(function(){
			if(!confirm("지원서를 제출하면 수정할 수 없습니다. 지원서를 제출하시겠습니까?")) return;
			
			$.blockUI();
			var misData_ = JGDS("dataset","a01009MisData");
			var misId_ = misData_.getColumnValue("mis_id",0);
			var memSid_ = misData_.getColumnValue("mem_sid",0);
			
			RKCommon.cryptJSON({misId : misId_, memSid : memSid_},function(cryptedData_){
				JGService.ajax(RKCommon.apply.requestURLKey,{
					data : $.extend({srvID : "submitLeaderApplyData"},cryptedData_)
					,success : function(){
						location.href = JGService.requestURL(RKCommon.apply.requestURLKey)+"/leader/"+misId_;
					},error : function(response_, errorStr_){
						$.unblockUI();
						alert("에러발생");
					}
				});
			});
		});
	});
	
	
}

function atFuncA01009_remove(){
	if(!confirm("지원서를 삭제하면 복구할 수 없습니다. 지원서를 삭제하시겠습니까?")) return;
	
	$.blockUI();
	var misData_ = JGDS("dataset","a01009MisData");
	var misId_ = misData_.getColumnValue("mis_id",0);
	var memSid_ = misData_.getColumnValue("mem_sid",0);
	
	RKCommon.cryptJSON({misId : misId_, memSid : memSid_},function(cryptedData_){
		JGService.ajax(RKCommon.apply.requestURLKey,{
			data : $.extend({srvID : "removeLeaderApplyData"},cryptedData_)
			,success : function(){
				location.href = JGService.requestURL(RKCommon.apply.requestURLKey)+"/leader";
			},error : function(response_, errorStr_){
				$.unblockUI();
				alert("에러발생");
			}
		});
	});
}

$(document).ready(function(){
	var basicDataView_ = $("[jg-dataset='a01009BasicData']");
	var qnaDataView_ = $("[jg-dataset='a01009QnaData']");
	
	basicDataView_.JGValidator();
	qnaDataView_.JGValidator();
	
	basicDataView_.JGValidator("failedMessages",{
		photo_id : {
			required: "사진을 첨부하여 주세요"
		},name : {
			required: "지원자명을 입력하여 주세요"
		},birth_date : {
			required: "생일을 입력하여 주세요"
		},phone1 : {
			"or-required": "연락처를 입력하여 주세요"
		},address : {
			required: "주소를 입력하여 주세요"
		},belong_ctg1 : {
			"and-required": "소속을 입력하여 주세요"
		},belong_dtl : {
			required: "상세 소속을 입력하여 주세요"
		},favor_team_id1 : {
			"or-required": "선호사역지을 입력하여 주세요"
		}
	});
	
	qnaDataView_.JGValidator("failedMessages",{
		col1 : {
			minLength : "문답1을 입력하여 주세요"
		},col2 : {
			minLength : "문답2을 입력하여 주세요"
		},col3 : {
			minLength : "문답3을 입력하여 주세요"
		},col4 : {
			minLength : "문답4을 입력하여 주세요"
		},col5 : {
			minLength : "문답5을 입력하여 주세요"
		}
	});
});

function atFuncA01009_selectFavorTeam(valueColumnName_, displayColumnName_){
	var basicData_ = JGDS("dataset","a01009BasicData");
	var misId_ = basicData_.getColumnValue("mis_id",0);
	RKCommon.ministry.popupSelectMinistryTeam(misId_,function(data_){
		if(isNull(data_)) return;
		basicData_.setColumnValue(valueColumnName_,0,data_.teamId);
		basicData_.setColumnValue(displayColumnName_,0,data_.teamNm);
	});
}
function atFuncA01009_clearFavorTeam(valueColumnName_, displayColumnName_){
	var basicData_ = JGDS("dataset","a01009BasicData");
	basicData_.setColumnValue(valueColumnName_,0,null);
	basicData_.setColumnValue(displayColumnName_,0,null);
}

function atFuncA01009_removePhoto(){
	var basicData_ = JGDS("dataset","a01009BasicData");
	$("[rk-photo][rk-photo-id]").RKPhoto("previewPath","");
	basicData_.setColumnValue("photo_id",0,null);
	basicData_.setColumnValue("photo_path",0,null);
}