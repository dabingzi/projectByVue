/**
 * Created by paul on 2018/11/5.
 */
const  islogin={
    state:{
        loginStatus:false
    },
    mutations:{

        onlogin(){
            islogin.state.loginStatus=true
        },
        nologin(){
            islogin.state.loginStatus=false
        }
    }

};


export {islogin}