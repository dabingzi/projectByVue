/**
 * Created by paul on 2018/11/28.
 */


 const config={
       baseUrl:"/api/"
};


const onUnauthorizedError = () => {
       alert("hello,Error");
       //@如果用UI框架可以使用框架提供的message框

};
const urlLetGo = () => {
    alert("hello,Error");
    //@如果用UI框架可以使用框架提供的message框
    // 路由跳转
};
config.onServerError = (code, errorMsg, data) => {
    const statusCode = data.statusCode;
    if (statusCode === 401 || statusCode === 403) {
        onUnauthorizedError()
    } else {
        urlLetGo();
    }
};

export  default config