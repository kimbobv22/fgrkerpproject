(function(window){
	
	$.widget("jg.JGDatasetCount", {
		initSelector : "[jg-dataset-count]",
		_datasetName : null,
		dataset : function(){
			return JGDS("dataset",this._datasetName);
		},
		_create : function(){
			this._datasetName = this.element.attr("jg-dataset-count");
			var that_ = this;
			var dataset_ = this.dataset();
			
			$(dataset_).on("rowinserted rowremoved datasetchanged"
					+" datasetclear datasetreset datasetapply",function(){
				var rowCount_ = this.getRowCount();
				var targetText_ = rowCount_;
				if(rowCount_ > 0){
					var pattern_ = that_.element.attr("jg-dataset-count-pattern");
					if(!isBlank(pattern_)){
						targetText_ = pattern_.replace("#",rowCount_);
					}
				}else{
					var zeroMsg_ = that_.element.attr("jg-dataset-count-zero");
					if(!isBlank(zeroMsg_)){
						targetText_ = zeroMsg_;
					}
				}
				that_.element.text(targetText_);
			});
		}
	});
	
})(window);