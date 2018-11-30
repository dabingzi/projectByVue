/**
 * Created by paul on 2018/11/28.
 */
import { api } from '../request'

api({
    'siginIn!post':"/user/login",

});

const login_api=api;


export {login_api}