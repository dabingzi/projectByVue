/**
 * Created by paul on 2018/10/25.
 */

const  loginUser={
    state:{
           isAuth:true,// 该状态表示是否需要记住密码

      },
    mutations:{
        rememberPSD(){
            loginUser.state.isAuth=true
        },
        noRememberPSD(){
            loginUser.state.isAuth=false
        },

    }

};


export {loginUser}