var un = un || {};

function onGeoData(data) {
	un.ads.onGeoData(data);
}

un.ads = (function() {
		
	function defineParametrs(sid) {	
	}
	
	function load(src, options) {
      	if(typeof(src)==="string") {
          	var script=document.createElement('script');
          	script.type='text/javascript';
          	script.async=true;
          	script.charset='UTF-8';
          	script.src=src;
          	if (options && options.cb) {
              	script.onload = script.onreadystatechange = options.cb;
          	}
          	document.body.appendChild(script);
      	}
  	}
	
	function call_zone(custom){
		adriver_zone_onscroll(custom);	
	}
	
	function defineCustom(gd) {
		  var custom = {};        
		  custom = gd; 
		  var cats = custom[10] ? custom[10] : '';
		  var catArray = cats.split("c_");
		  for(var i=1; i<catArray.length; i++){
		  custom[catArray[i]]	= 'set'; 		
		  }
		  var fm = custom[11] ? custom[11] : '';
		  var fmArray = fm.split(/f_|m_/);
		  for(var i=1; i<fmArray.length; i++){
		  custom[fmArray[i]]	= 'set';
		  }
		  call_zone(custom);
	}
	
	function adriver_zone(custom){
		if(custom[20])var s = custom[20];  
		var gender	= custom[100];
		var age		= custom[101];
		var std = {gender:100, age:101},i;for(i in std){try{custom[std[i]]=eval(i);}catch(e){}}
		var banner = new adriver("un_zone_place", {sid:param.sid,bt:52,pz:param.pz,bn:param.bn,keyword:encodeURIComponent(gender+'_'+age+'v'+cats+fm+s),custom:custom});
	}
	
	function adriver_zone_onscroll(custom){
		if(custom[20]){s="'"+encodeURIComponent(custom[20])+"'"} else {s="''"}
		custom.getStd = function(){var s = [];
		for(i in this){if(typeof(this[i])=='function')break;
		if(this[i])s.push((i+':')+"'"+this[i]+"'");}
		return s.length?'{'+s.join(',')+'}':''
		};
		var place = document.getElementById('un_zone_place'+param.bn);
		place.innerHTML = '<meta name="adriverDefaults" content="sid:'+param.sid+', bt:52" /> <meta name="adriverOptions" content="autoLoad:1" /><div id="banner'+param.bn+'" class="ext adriverBanner" data-Adriver="pz:'+param.pz+',bn:'+param.bn+',onScroll: '+param.onscroll+', custom:'+custom.getStd()+',keyword:'+s+'"></div>';
		new adriver.Plugin.require("onScroll.adriver");
	}
	
	function onGeoData(data) {
	  	  var ri,ci,ct;
	  	  var skipCities = {};
	  	  var serveTo = [];
	  	  var ctm = {};
		  var country = data.g.country;
		  if(country && country != "null") {
			  ctm[60] = country.id;
		  }
		  
	  	  for(ct=1; ct<102; ct++) {
	  	      if(data.c[ct]) ctm[ct] = data.c[ct];
	  	  }
		  
		  var regions = data.g.regions;
		  if(regions && regions != "null") {
			  var region = regions[0];
			  if(region && region != "null") {
				ctm[61] = region.id;
				var cities = region.cities;
				if(cities && cities != "null") {
					var city = cities[0];
					if(city && city != "null") {
						ctm[62] = city.id;
					}
					else {
						ctm[62] = "noneGD";
					}
				}
			  }
		  }
		 
	  	  var slots = data.c;
	  	  if (slots != undefined && typeof slots["20"] == "string") {
	  	      ctm[20] = parse_20(slots["20"]);
	  	  }

	  	defineCustom(ctm);
	  }

	 function parse_20(values) {
	  	var pairs = values.split(/\./);
	  	var data = {}; // not used
	  	var today = parseInt( new Date().valueOf() / 1000 );
	  	var str = "";
	  	    
	  	for (var i=0; i<pairs.length; i++) {
	  		var pair = pairs[i].split('_');
	  	    var delta_days = parseInt( (today - pair[1]) / 86400 );
	  	    var date_type = 's%d_d;s%d_w;s%d_m';
	  	    if (delta_days > 1) date_type = 's%d_w;s%d_m';
	  	    if (delta_days > 7) date_type = 's%d_m' ;
	  	    data[ pair[0] ] = date_type;
	  	    str += date_type.replace(/%d/g,pair[0]);
	  	    if (i != pairs.length-1) str += ";";
	  	} 
	  	    return str;
	  }

	return {
		defineParametrs: defineParametrs,
		load: load,
		onGeoData: onGeoData
	}
	
})();