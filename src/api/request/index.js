/**
 * Created by paul on 2018/11/28.
 */
import axios from  'axios'
import cfg from '../../baseConfig'
 const onServerError = cfg.onServerError || function(code, errorMsg, data) {
        //alert(errorMsg)
    };

class ServerFn{
    constructor(url,name,method="GET"){
        if(url.indexOf('http://') ===0 ||url.indexOf('https://')===0) this.url=url;
        else this.url = cfg.baseUrl +url.replace(/^\//, '');
        this.name=name;
        this.method=method;

    };

    handleError(code,error,callback){
        if(typeof this.onError==='function'){
            return this.onError.call(this,code,error,callback)
        } else {
            return onServerError.call(this,code,error,callback)
        }
    };

    invoke(data){
        const   that=this;
        const   reqConfig={
            url:that.url,
            method:that.method,
        };
        if(that.method==="GET"){
            reqConfig.params=data;
        }else {
            reqConfig.data=data;
        };

        return new Promise((resolve)=>{
            axios(reqConfig).then(res=>{
                let data=res.data;
                if(data.status!==200){
                    that.handleError.call(that,data.status,data.msg,"")
                };
                resolve(data)
            }).catch((err)=> {
                //new Error(err);
                let response, code
                if (err.response) {
                    response = err.response
                    code = response.status
                } else {
                    if (err.code) {
                        code = err.code
                    }
                }
                that.handleError.call(that, code, err.message, err)
            })
        })
    }
};

let api=function (apiSet) {
    for(let key in apiSet){
        let uArr=key.split('!');   //ur l是否满足  name!GET or name!POST 命名规则
        let pName=uArr[0];
        let pMethod=uArr[1]?uArr[1].toString().toUpperCase() : 'GET';
        if(!api[pName]){
            api[pName]=(function (srvFn) {
                let fn= function (data, callback) {
                    return srvFn.invoke.call(srvFn,data,callback)
                };
                fn.set=(k,v)=>{
                    srvFn[k] = v;
                    return fn
                };
                fn.get=(k)=> srvFn[k];

                fn.toString = () => srvFn.url;
                return fn;
            })(new ServerFn(apiSet[key],pName,pMethod))
        }else{}
    };
    return api
};


export {api}