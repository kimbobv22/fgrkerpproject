(function(window,$){
	
	var module_ = window.RKCommon.belong = {
		requestURLKey : "churchinfo"
		,rootBelongId : "100010000000000"
		,_cachedBelongCtg : {}
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
			
			function addTitle(aDataset_, aTitle_){
				if(!isNull(aTitle_)){
					aDataset_.insertRow(0);
					aDataset_.setColumnValues({
						BELONG_ID : ""
						,BELONG_NM : aTitle_
					},0, true);
				}
			}
			
			if(!isNull(this._cachedBelongCtg[belongId_])){
				var result_ = new JGDataset(this._cachedBelongCtg[belongId_].toJSONString(false));
				addTitle(result_, title_);
				callback_(result_.toJSON(false));
				return;
			}
			
			var that_ = this;
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "list"
					,belongId : BLK(belongId_," ")
					,belongNm : BLK(belongNm_)
				},success: function(data_){
					var dataset_ = new JGDataset(data_);
					that_._cachedBelongCtg[belongId_] = new JGDataset(data_);
					addTitle(dataset_, title_);
					if(!isNull(callback_)) callback_(dataset_.toJSON(false));
				},error : function(response_, errorStr_){
					if(!isNull(callback_)) callback_(undefined);
				}
			});
		},_cachedBelongInfo : {}
		,getBelongInfo : function(belongId_, callback_){
			if(!isNull(this._cachedBelongInfo[belongId_])){
				if(!isNull(callback_)) callback_($.extend(true,this._cachedBelongInfo[belongId_],{}));
			}
			
			var that_ = this;
			JGService.ajax(this.requestURLKey,{
				data : {
					srvID : "info"
					,belongId : belongId_
				},success: function(data_){
					that_._cachedBelongInfo[belongId_] = $.extend(true,data_,{});
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