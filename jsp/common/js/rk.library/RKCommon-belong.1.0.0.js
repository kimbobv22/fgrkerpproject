(function(window,$){
	
	var module_ = window.RKCommon.belong = {
		requestURLKey : "churchinfo"
		,rootBelongId : "100010000000000"
		,getBelongCategory : function(options_, callback_){
			var belongId_ = null;
			var belongNm_ = null;
			var title_ = null;
			
			if($.type(options_) === "string"){
				belongId_ = options_;
			}else if($.type(options_) === "object"){
				belongId_ = options_.belongId;
				belongNm_ = options_.belongNm;
				title_ = options_.title;
			}
			
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "list"
					,belongId : BLK(belongId_," ")
					,belongNm : BLK(belongNm_)
				},success: function(data_){
					var dataset_ = new JGDataset(data_);
					if(!isNull(title_)){
						dataset_.insertRow(0);
						dataset_.setColumnValues({
							BELONG_ID : ""
							,BELONG_NM : title_
						},0, true);
					}
					if(!isNull(callback_)) callback_(dataset_.toJSON(false));
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},getBelongInfo : function(belongId_, callback_){
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "info"
					,belongId : belongId_
				},success: function(data_){
					if(!isNull(callback_)) callback_(data_);
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		}
	};
	
	$.widget("rk.RKBelongLabel",{
		initSelector : "[rk-belong-label][rk-belong-column]"
		,_belongId : function(){
			return this.element.attr("rk-belong-label");
		},_targetColumnName : function(){
			return this.element.attr("rk-belong-column");
		},_blkValue : function(){
			return this.element.attr("rk-belong-blk");
		},_create : function(){
			this.refresh();
		},refresh : function(callback_){
			var element_ = this.element;
			var belongId_ = this._belongId();
			var targetColumnName_ = this._targetColumnName();
			var blkValue_ = this._blkValue();
			
			RKCommon.belong.getBelongInfo(belongId_,function(data_){
				if(data_ === undefined){
					element_.text("##error##");
					return;
				}
				element_.text(BLK(data_[targetColumnName_],blkValue_));
			});
		}
	});
	
	return module_;
})(window,jQuery);