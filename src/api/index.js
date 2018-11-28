/**
 * Created by paul on 2018/11/28.
 */
import axios from  'axios'
import  cfg from '../baseConfig'


 const onServerError = cfg.onServerError || function(code, errorMsg, data) {
        alert(errorMsg)
    }

class ServerFn{
    constructor(url,name,method='GET'){
        if(url.indexOf('http') ===0 ||url.indexOf('https://')===0) this.url=url;
        else this.url = cfg.baseUrl +url.replace(/^\//, '');
        this.name=name;
        this.method=method;
        this.timeOut =cfg.ajaxTimeOut || 1000*60
    };

    handleError(code,error,callback){
        if(typeof this.error==='function'){
            return this.onError.call(this,code,error,callback)
        } else {
            return onServerError.call(this,code,error,callback)
        }
    };

    invoke(data){
        const  that=this;
        const   reqConfig={
            url:that.url,
            method:that.method,
            timeout:that.timeOut
        };
        if(that.method==="GET"){
            reqConfig.params=data;
        }else {
            reqConfig.params=data;
        };

        return new Promise((resolve)=>{
            axios(reqConfig).then(res=>{
                let data=res.data;
                if(data.error){
                    that.handleError.call(that,res.status,data.error,data)
                };
                resolve(data)
            }).catch((err)=> {
                //new Error(err);
                let code;
                if(err.code){
                    code=err.code;
                }
                that.handleError.call(that,code,err.msg,err)
            })
        })
    }
};

let api=function (apiSet) {
    for(let key in apiSet){
        let uArr=key.split('!'),   //url是否满足  name!GET or name!POST 命名规则
            pName=uArr[0],
            pMethod=uArr[1]?uArr[1].toString().toUpperCase() : 'GET';
        if(!api[pName]){
            api[pName]=(function (srvFn) {
                let fn= function (data, callback) {
                    return srvFn.invock.call(srvFn,data,callback)
                };
                fn.set=(k,v)=>{
                    srvFn[k]=v;
                    return fn
                }
                fn.get=(k)=>{
                    srvFn[k]
                };
                fn.toString = () => srvFn.url;
                return fn;
            })(new ServerFn(apiSet[key],pName,pMethod))
        }else{
            console.error(`api [${pName}] duplicate definition`)
        }
    };
    return api
};


export {api}