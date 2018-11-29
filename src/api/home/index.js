/**
 * Created by paul on 2018/11/28.
 */
import { api } from '../request'

api({
    'findStartCityList':"/findStartCityList",
    'getAllboats':'/getAllboats',
    'GetData':'/GetData',
    'getMyCruiseDetails': '/getCuriseDetails',
});

const index_api=api;


export {index_api}