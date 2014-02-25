(function(window,$){
	
	var module_ = window.RKCommon.map = {
		_initializedMapAPI : false, _loadingMapAPI : false
		,_initializeMapAPI : function(callback_){
			if(this._initializedMapAPI) callback_(true);
			if(this._loadingMapAPI) callback_(false);
			
			this._loadingMapAPI = true;
			
			var that_ = this;
			window._RKCommon_map_initializeCallback = (function(){
				that_._initializedMapAPI = true;
				callback_(true);
				that_._loadingMapAPI = false;
			});
			
			JGModule.ajax(RKCommon.requestURLKey,{
				data : {
					srvID : "getMapAPIKey"
				},success : function(result_){
					if(result_.result === 0){
						RKCommon.addJS("http://maps.googleapis.com/maps/api/js?key="+result_.message+"&sensor=false&callback=_RKCommon_map_initializeCallback");
					}else{
						console.error("can't initialize Map API");
						callback_(undefined);
					}
				},error : function(error_){
					console.error("can't initialize Map API");
					callback_(undefined);
				}
			});
		},search : function(data_, callback_){
			$.ajax({
				url : "http://maps.googleapis.com/maps/api/geocode/json"
				,data : $.extend({
					sensor : false 
				},data_)
				,success : function(result_){
					callback_(result_.results);
				}
			});
		},geocode : function(data_, callback_){
			this.search(data_, function(result_){
				if(result_.length === 0){
					callback_(undefined);
					return;
				}
				
				var geometry_ = result_[0].geometry;
				callback_(geometry_.location);
			});
		}
	};
	
	$.widget("rk.RKMapView",{
		initSelector : "[rk-map-view]"
		,options : {
			address : null
			,zoom : 15
			,mapType : null
			,showMarker : true
		},_mapObject : null, mapObject : function(){
			return this._mapObject;
		},_marker : null
		,_lazyLoad : function(callback_){
			var that_ = this;
			setTimeout(function(){
				RKCommon.map._initializeMapAPI(function(bool_){
					if(bool_){
						callback_();
					}else that_._lazyLoad(callback_);
				});
			},100);
		},_create : function(){
			var that_ = this;
			var element_ = this.element;
			
			this.options.address = element_.attr("rk-map-view");
			this._lazyLoad(function(){
				that_.options.mapType = google.maps.MapTypeId.ROADMAP;
				that_._mapObject = new google.maps.Map(element_[0], {
					center : new google.maps.LatLng(-34.397, 150.644)
					,zoom : that_.options.zoom
					,mapTypeId : that_.options.mapType
				});
				that_.reload();
			});
		},option : function(key_, value_){
			this._super();
			
			if(value_ === undefined) return;
			
			if(key_ === "address"){
				this.reload();
			}else if(key_ === "zoom"){
				this._mapObject.setZoom(value_);
			}else if(key_ === "mapType"){
				this._mapObject.setMapTypeId(value_);
			}
		},reload : function(callback_){
			var that_ = this;
			var element_ = this.element;
			RKCommon.map.geocode({
				address : this.options.address
			},function(result_){
				var latLng_ = new google.maps.LatLng(result_.lat,result_.lng);
				that_._mapObject.setCenter(latLng_);
				
				if(that_._marker === null){
					that_._marker = new google.maps.Marker({
						position: latLng_
						,map: null
					});
				}
				
				that_._marker.setMap(null);
				if(that_.options.showMarker){
					that_._marker.setMap(that_._mapObject);
					that_._marker.setPosition(latLng_);
				}
				
				element_.trigger("rkmapviewreload");
				if(!Object.isNull(callback_)) callback_.apply(element_);
			});
		}
	});
	
	return module_;
})(window,jQuery);