/**
 * Created by paul on 2018/10/25.
 */

import  Vue from 'vue'
import  Vuex from  'vuex'
import  {loginUser} from './modules/loginUser'
import  {islogin} from './modules/islogin'
import  axios from 'axios'
Vue.use(Vuex);
Vue.prototype.$http=axios;
const  store =new Vuex.Store( {
    modules:{
        loginUser,
        islogin
    },
});
export default store
