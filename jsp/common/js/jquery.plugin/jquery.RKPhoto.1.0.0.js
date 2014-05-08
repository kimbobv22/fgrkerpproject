(function($){
	
	$.widget("rk.RKPhoto",{
		initSelector : "[rk-photo]"
		,options : {
			fileAccept : "image/*"
			,readonly : false
		},_inputFile : null
		,_preview : null
		,_previewPath : null
		,isLocalPath : function(){
			return BLK(this._previewPath).indexOf("http") < 0;
		},previewPath : function(path_){
			if(path_ === undefined) return this._previewPath;
			
			var bValue_ = this._previewPath;
			this._previewPath = path_;
			
			this._preview.css("backgroundImage","url("+BLK(this._previewPath)+")");
			if(bValue_ !== path_) this.element.trigger("rkphotochange");
			
			return this._previewPath;
		},_create : function(){
			var that_ = this;
			var element_ = this.element;
			var inputFile_ = this._inputFile = $("<input type='file'>");
			var preview_ = this._preview = $("<a href='javascript:void(0);' />");
			
			element_.addClass("rk-photo");
			
			inputFile_.css({
				"visibility" : "hidden"
				,"display" : "none"
			});
			inputFile_.attr("accept",this.options.fileAccept);
			inputFile_.change(function(){
				var curValue_ = that_._inputFile.val();
				if(curValue_ === null || curValue_.length === 0){
					//that_.previewPath("");
				}else{
					element_.block();
					var fileReader_ = new FileReader();
					fileReader_.onload = (function(event_){
						that_.previewPath(event_.target.result);
						element_.unblock();
					});
					fileReader_.readAsDataURL(that_._inputFile[0].files[0]);
				}
			});
			element_.append(inputFile_);
			
			preview_.css({
				position : "absolute"
				,width : element_.width()
				,height : element_.height()
				,top: 0, left: 0 
			});
			preview_.addClass("rk-image rk-image-cover");
			element_.append(preview_);
			
			preview_.click(function(){
				if(that_.options.readonly) return;
				that_._inputFile.val("");
				that_._inputFile.click();
			});
			
			var photoId_ = element_.attr("rk-photo-id");
			if(!isBlank(photoId_)) this.previewPath(RKCommon.photo.photoURL(photoId_));
			
			this.options.readonly = (element_.attr("rk-photo-readonly") === "readonly");
		},upload : function(callback_){
			if(!this.isLocalPath()) if(!isNull(callback_)) callback_(undefined);
			
			var that_ = this;
			var element_ = this.element;
			
			element_.block();
			JGService.sendMultipart(RKCommon.photo.requestURLKey,{
				srvID : "uploadPhoto"
			},{
				success : function(result_){
					element_.unblock();
					var photoId_ = result_[0];
					that_.previewPath(RKCommon.photo.photoURL(photoId_));
					callback_(photoId_);
				},error : function(response_, errorStr_){
					element_.unblock();
					console.error(errorStr_);
					callback_();
				}
			},this._inputFile);
		}
	});
	
})(jQuery);