var utilityLib = (function(){

    /*
     * Gets the parameters in the URL
     */
    function getUrlParam(url){
        var index = url.indexOf("?"),
            obj = {};
        if(index !== -1){    
            var params = url.slice(index + 1) && url.slice(index + 1).split(/&/);
            for(let i = 0; i<params.length; i++){
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
     * internal use
     */
    function isArrayLike(arr){
        if(arr == null || !arr.hasOwnProperty("length") || getVarType(arr) === "object" || getVarType(arr) === "function"){
            return false;
        }
        var len = arr.length;
        return typeof len === "number" && len >= 0; 
    }
var a = [1,3,2,6,2,3,22,6,8]
console.log(insertSort(a))
    /*
     * sort array
     * Default ascending
     * Modify the original array
     */
    function insertSort(arr, isDown=false){
        if(getVarType(arr) === "array"){
            for(let i=1, len=arr.length; i<len; i++){
                let t = arr[i],
                	p = i - 1;
                while(arr[p] > t && p >= 0){
                    arr[p + 1] = arr[p];
                    p--;
                }
                arr[p + 1] = t;
            }
            isDown && arr.reverse();
        }
        return arr;
    }

    /*
     * sort array
     * Default ascending
     * return a new array
     */
    function fastSort(arr, isDown=false){
        if(getVarType(arr) !== "array" || arr.length <= 1){
            return arr;
        }
        var mid = arr.splice(Math.floor((arr.length-1)/2), 1)[0],
            left = [],
            right = [];
        for(let i=0; i<arr.length; i++){
            let [t, m] = !isNaN(Number(arr[i])) && !isNaN(Number(mid))? [Number(arr[i]), Number(mid)]:
                        [arr[i], mid];
            t > m? right.push(arr[i]):
                    left.push(arr[i]);
        }
        var [l, r] = isDown?[right, left]:
                        [left, right];

        return fastSort(l, isDown).concat(mid, fastSort(r, isDown));
    }

    /*
     * return a new variable
     */
    function copyVar(v){
        var newV = getVarType(v) === "object"? copyObj():
                    getVarType(v) === "array"? v.concat([]):
                    v;
        return newV;
    }

    /*
     * internal use
     */
    function getVarType(v){
        return Object.prototype.toString.call(v).slice(1, -1).split(" ")[1].toLowerCase();
    }

    /*
     * internal use
     */
    function copyObj(obj){
        if(obj == null || typeof obj === "object"){
            return obj;
        }
        var newObj = getVarType(obj) === "object"? {}: [];
        for(let key in obj){
            obj.hasOwnProperty(key) && (newObj[key] = arguments.callee(obj[key]));
        }
        return newObj;
    }

    /*
     * internal use
     */
    function toArray(obj){
        if(obj == null){
            return [];
        }
        return [].slice.call(obj);
    }

    return {
        getUrlParam: getUrlParam,
        copyVar: copyVar
    };
})()
