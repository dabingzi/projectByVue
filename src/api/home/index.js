/**
 * Created by paul on 2018/11/28.
 */
import { api } from '../request'

api({
    'findStartCityList!GET':"/findStartCityList",
    'getAllboats!GET':'/getAllboats',
    'GetData!GET':'/GetData',
    'getMyCruiseDetails!GET': '/getCuriseDetails',
});

const index_api=api;


export {index_api}