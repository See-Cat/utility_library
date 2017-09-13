function getUrlParam(url){
	var index = url.indexOf("?"),
		obj = {};
	if(index === -1){
		return obj;
	}
	var params = url.slice(index + 1).split(/&/);
	for(var i = 0; i<params.length; i++){
	    obj[params[i].split(/=/)[0]] = params[i].split(/=/)[1];
	}
	return obj;
}

