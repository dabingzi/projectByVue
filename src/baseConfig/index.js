/**
 * Created by paul on 2018/11/28.
 */


export  default  config={
       baseUrl:"/api/"
};


const onUnauthorizedError = () => {
       alert("hello,Error")
   // 路由跳转
};
const urlLetGo = () => {
    alert("hello,Error")
    // 路由跳转
};
config.onServerError = (code, errorMsg, data) => {
    const statusCode = data.statusCode;
    if (statusCode === 401 || statusCode === 403) {
        onUnauthorizedError()
    } else {
        urlLetGo();
    }
}