(function(window,$){
	
	var module_ = window.RKCommon = {
		requestURLKey_root : "root"
		,requestURLKey : "common"
		,addJS : function(src_, target_){
			if($.type(src_) === "string"){src_ = [src_];}
			
			target_ = $(NVL(target_,"head"));
			var length_ = src_.length;
			for(var index_=0;index_<length_;++index_){
				if(target_.children("script[src='"+src_[index_]+"']").length == 0){
					target_.append($("<script src='"+src_[index_]+"'></script>"));
				}
			}
		},addCSS : function(href_, target_){
			if($.type(href_) === "string"){href_ = [href_];}
			
			target_ = $(NVL(target_,"head"));
			var length_ = href_.length;
			for(var index_=0;index_<length_;++index_){
				if(target_.children("link[href='"+href_[index_]+"']").length == 0){
					target_.append($("<link rel='stylesheet' href='"+href_[index_]+"'></link>"));
				}
			}
		},openPopupWindow : function(options_){
			options_ = $.extend({
				width : screen.width / 2
				,height : screen.height / 1.5
				,left : (screen.width - NVL(options_.width,(screen.width / 2))) / 2
				,top : (screen.height - NVL(options_.height,(screen.height / 1.5))) / 2
				,directories : false,location : false,menubar : false,resizable : false,scrollbars : false
				,status : false,toolbar : false,dialog : true,titlebar : false
			},options_);
			
			var params_ = "height="+options_.height+",width="+options_.width;
			params_ += (",top=" + options_.top + ",left=" + options_.left
				+(options_.directories ? ",directories=1" : "")+(options_.location ? ",location=1" : "")
				+(options_.menubar ? ",menubar=1" : "")+(options_.resizable ? ",resizable=1" : "")
				+(options_.scrollbars ? ",scrollbars=1" : "")+(options_.status ? ",status=1" : "")
				+(options_.toolbar ? ",toolbar=1" : "")+(options_.dialog ? ",dialog=1" : "")
				+(options_.titlebar ? ",titlebar=1" : ""));
			
			var popupWindow_ = window.open(options_.url, options_.name, params_);
			if(!isNull(options_.didOpen)) options_.didOpen(popupWindow_);
			var that_ = this;
			that_.interval = setInterval(function(){
				if(popupWindow_.closed){
					clearInterval(that_.interval);
					if(!isNull(options_.didClose)) options_.didClose();
				}
			}, 1000);
			
			if(popupWindow_){popupWindow_.focus();return false;}
			return true;
		},delayCall : function(func_, delay_){
			setTimeout(func_, NVL(delay_,1));
		},_genCryptionKey : function(callback_){
			JGService.ajax(RKCommon.requestURLKey,{
				data : {srvID : "genCryptionKey"}
				,success : function(data_){
					callback_(data_.message);
				}
			});
		},cryptJSON : function(json_, callback_){
			this._genCryptionKey(function(key_){
				var rsa_ = new RSAKey();
				rsa_.setPublic(key_.modules, key_.exponent);
				
				var result_ = {};
				for(var key_ in json_){
					result_[key_] = rsa_.encrypt(json_[key_]);
				}
				
				callback_(result_);
			});
		},gcode : function(codes_,callback_){
			if($.type(codes_) === "string"){
				var codeId_ = codes_;
				codes_ = new Array();
				codes_.push(codeId_);
			}else if($.type(codes_) !== "array"){
				console.error("invalid arguments");
				if(!isNull(callback_)) callback_(undefined);
				return;
			}
			
			var condData_ = new JGDataset();
			var rowCount_ = codes_.length;
			for(var rowIndex_=0;rowIndex_<rowCount_;++rowIndex_){
				condData_.addRow();
				
				var code_ = codes_[rowIndex_];
				if($.type(code_) === "string")
					condData_.setColumnValue("CODE_ID",rowIndex_,code_,true);
				else{
					condData_.setColumnValue("CODE_ID",rowIndex_,code_.codeId,true);
					if(!isNull(code_.col1)) condData_.setColumnValue("COL1",rowIndex_,code_.col1,true);
					if(!isNull(code_.col2)) condData_.setColumnValue("COL2",rowIndex_,code_.col2,true);
					if(!isNull(code_.col3)) condData_.setColumnValue("COL3",rowIndex_,code_.col3,true);
					if(!isNull(code_.col4)) condData_.setColumnValue("COL4",rowIndex_,code_.col4,true);
					if(!isNull(code_.addTitle)) condData_.setColumnValue("ADD_TITLE",rowIndex_,code_.addTitle,true);
				}
				
				JGService.ajax(RKCommon.requestURLKey,{
					data : {
						srvID : "getGCode"
						,condData : condData_.toJSONString()
					},success : function(data_){
						var resultCodes_ = data_.message;
						for(var codeDId_ in resultCodes_){
							JGDS("dataset","GCODE_"+codeDId_,resultCodes_[codeDId_]);
						}
						if(!isNull(callback_)) callback_(true);
					},error : function(response_, errorStr_){
						console.error(errorStr_);
						if(!isNull(callback_)) callback_(undefined);
					}
				});
			}
		},getBelongCategory : function(upBelongId_, callback_){
			
		}
	};
	
	var serverURL_ = JGService.requestURL(module_.requestURLKey_root);
	
	module_.addJS([
	serverURL_+"jsp/common/js/rsa/jsbn.js"
	,serverURL_+"jsp/common/js/rsa/prng4.js"
	,serverURL_+"jsp/common/js/rsa/rng.js"
	,serverURL_+"jsp/common/js/rsa/rsa.js"
	,serverURL_+"jsp/common/js/jquery.plugin/RKExtension.1.0.0.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.blockUI.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.RKPhoto.1.0.0.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/jqm-datebox.core.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/jqm-datebox.mode.calbox.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/jqm-datebox.mode.datebox.js"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/i8n/jquery.mobile.datebox.i18n.ko.js"
	,serverURL_+"jsp/common/js/jquery.plugin/JGDatasetCount.1.0.0.js"]);
	
	JGService.requestURL(module_.requestURLKey, JGService._requestURLs[RKCommon.requestURLKey_root]+"common");
	
	module_.addJS([
	serverURL_+"jsp/common/js/rk.library/RKCommon-map.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-ministry.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-member.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-organization.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-belong.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-photo.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-apply.1.0.0.js"
	,serverURL_+"jsp/common/js/rk.library/RKCommon-education.1.0.0.js"
	]);
	
	module_.addCSS([
	serverURL_+"jsp/common/css/RKCommon.css"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/jqm-datebox.css"
	,serverURL_+"jsp/common/js/jquery.plugin/jquery.datebox/jquery.mobile.datebox.css"
	]);
	
	$.fn.rkFuncLoadServiceView = (function(requestURLKey_, parameters_, callback_){
		this.load(JGService.requestURL(requestURLKey_,parameters_),callback_);
	});
	
	$.blockUI.defaults.css = null;
	$.blockUI.defaults.message = "<div class='ui-icon-loading rk-block-loader-img'></div>";
	$.blockUI.defaults.draggable = false;
	$.blockUI.defaults.fadeIn = 100;
	$.blockUI.defaults.fadeOut = 0;
	$.blockUI.defaults.baseZ = 9999;
	$.blockUI.defaults.overlayCSS = {
		backgroundColor: '#000'
		,opacity : 0.3
	};
	
	JGValidator.prototype._options.errorMessageTag = "<label class='rk-validator-error-label rk-label rk-label-small-l3' />";
	JGValidator.prototype._engine = $.extend(JGValidator.prototype._engine,{
		"or-required" : function(validatorElement_, columnName_, rowIndex_, columnValue_, callback_){
			var splitStr_ = validatorElement_.value.split(",");
			if($.type(splitStr_) === "string"){
				var temp_ = splitStr_;
				splitStr_ = new Array();
				splitStr_.push(temp_);
			}
			var length_ = splitStr_.length;
			for(var index_=0;index_<length_;++index_){
				var tColumnName_ = splitStr_[index_];
				if(!isBlank(this.getColumnValue(tColumnName_,rowIndex_))){
					callback_(true);
					return;
				}
			}
			
			callback_(false);
		},"and-required" : function(validatorElement_, columnName_, rowIndex_, columnValue_, callback_){
			var splitStr_ = validatorElement_.value.split(",");
			if($.type(splitStr_) === "string"){
				var temp_ = splitStr_;
				splitStr_ = new Array();
				splitStr_.push(temp_);
			}
			var length_ = splitStr_.length;
			for(var index_=0;index_<length_;++index_){
				var tColumnName_ = splitStr_[index_];
				if(isBlank(this.getColumnValue(tColumnName_,rowIndex_))){
					callback_(false);
					return;
				}
			}
			
			callback_(true);
		},"date-pattern" : function(validatorElement_, columnName_, rowIndex_, columnValue_, callback_){
			var regex_ = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
			callback_(regex_.test(columnValue_));
		}
	});
	
	var today_ = new Date();
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		//overrideDateFormat : "yyyy-mm-dd",
		useHeader : false,
		useTodayButton : true,
		mode : "datebox"
	});

	return module_;
})(window,jQuery);