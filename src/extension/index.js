/**
 * Created by paul on 2018/11/2.
 */

var app={
    setCookie:function (name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie = name+'='+value+';expires='+oDate;
    },
    getCookie:function (name) {

        var arr = document.cookie.split('; ');
        for (var i = arr.length - 1; i >= 0; i--) {
            var arr2 = arr[i].split('=');
            if(arr2[0]===name){
                return arr2[1];
            }
        }
        return '';
    },
    removeCookie:function (name) {
        this.setCookie(name,1,-1);
    },

     strToHexCharCode:function(str) {
    if(str === "")
        return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for(var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}
}


export {app}