/*
 *Gets the parameters in the URL
 */
function getUrlParam(url){
	var index = url.indexOf("?"),
		obj = {};
	if(index !== -1){	
		var params = url.slice(index + 1) && url.slice(index + 1).split(/&/);
		for(var i = 0; i<params.length; i++){
		    obj[params[i].split(/=/)[0]] = params[i].split(/=/)[1];
		}
	}
	return obj;
}

/*
 * Find key numbers
 * In fact, mainly want to write a binary algorithm。。
 */
function indexOfNum(arr, num){
	//Does the likeArray support it?？。
	if(!Array.isArray(arr) || isNaN(Number(num))){
		throw new Error("Parameter is incorrect")
	};
	//Missing array sorting
    var i = 0, 
        j = arr.length-1, 
        k, half;   
    while(i <= j){
        k = Math.floor((i + j)/2);
        half = arr[k]
        if(half === num){
            return k;
        }
        num < half? j = k-1: i = k+1;
    }
    return -1; 
}