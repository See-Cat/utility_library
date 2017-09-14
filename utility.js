var utilityLib = (function(){

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
	 * internal use
	 * The array must be sorted
	 * The array must be ascending
	 * Just want to write a binary algorithm..
	 */
	function binary(arr, num){
		if(!isArrayLike(arr)){
			return -1;
		}
	    var i = 0, 
	        j = arr.length-1, 
	        k, half;   
	    while(i <= j){
	        k = Math.floor((i + j)/2);
	        half = arr[k]
	        if(half == num){
	            return k;
	        }
	        num < half? j = k-1: i = k+1;
	    }
	    return -1; 
	}

	/*
	 *internal use
	 */
	function isArrayLike(arr){
		if(arr == null || !arr.hasOwnProperty("length") || getVarType(arr) === "object" || getVarType(arr) === "function"){
            return false;
        }
        var len = arr.length;
        return typeof len === "number" && len >= 0; 
	}

	/*
	 *sort array
	 *Default ascending
	 */
	function insertSort(arr, isDown=false){
		var newArr = copyVar(arr);
		for(var i=1, len=newArr.length; i<len; i++){
			var t = newArr[i],
				p = i - 1;
			var a = t, b = newArr[p];
			while(newArr[p] > t && p >= 0){
				newArr[p + 1] = newArr[p];
				p--;
			}
			newArr[p + 1] = t;
		}
		isDown && newArr.reverse();
		return newArr;
	}

	/*
	 *return a new variable
	 */
	function copyVar(v){
		var newV = getVarType(v) === "object"? copyObj():
					getVarType(v) === "array"? v.concat([]):
					v;
		return newV;
	}

	/*
	 *internal use
	 */
	function getVarType(v){
		return Object.prototype.toString.call(v).slice(1, -1).split(" ")[1].toLowerCase();
	}

	/*
	 *internal use
	 */
	function copyObj(obj){
		if(obj == null || typeof obj === "object"){
			return obj;
		}
		var newObj = getVarType(obj) === "object"? {}: [];
		for(var key in obj){
			obj.hasOwnProperty(key) && (newObj[key] = arguments.callee(obj[key]));
		}
		return newObj;
	}

	/*
	 *internal use
	 */
	function toArray(obj){
		if(obj == null){
			return [];
		}
		return [].slice.call(obj);
	}

	return {
		getUrlParam: getUrlParam,
		copyVar: copyVar,
		fastSort: null
	};
})()
