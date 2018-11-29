
<template>
    <div>
    <div class="mylist ">
        <div class="listone"><span class="listDate">{{todo.sailingDate}}({{todo.weekDay}})</span></div>
        <div class="listone"><span class="listBoat">{{todo.cruiseName}}<span style="color: #ff0000"></span></span></div>
        <div class="listone">5天</div>
        <div class="listone">{{todo.routes}}</div>
        <div class="listone mm m1">{{todo.listPrice[3].peerPrice==-1?"--":todo.listPrice[3].peerPrice}}</div>
        <div class="listone mm m2">{{todo.listPrice[4].peerPrice==-1?"--":todo.listPrice[4].peerPrice}}</div>
        <div class="listone mm m3">{{todo.listPrice[5].peerPrice==-1?"--":todo.listPrice[5].peerPrice}}</div>
        <div class="listone mm m4">{{todo.listPrice[0].peerPrice==-1?"--":todo.listPrice[0].peerPrice}}</div>
        <div class="listone mm m5">{{todo.listPrice[1].peerPrice==-1?"--":todo.listPrice[1].peerPrice}}</div>
        <div class="listone mm m6">{{todo.listPrice[2].peerPrice==-1?"--":todo.listPrice[2].peerPrice}}</div>
        <div class="listone mm m7">{{todo.listPrice[6].peerPrice==-1?"--":todo.listPrice[6].peerPrice}}</div>
        <div class="listone mm m8">{{todo.listPrice[7].peerPrice==-1?"--":todo.listPrice[7].peerPrice}}</div>
        <div class="listone mm m9">{{todo.listPrice[8].peerPrice==-1?"--":todo.listPrice[8].peerPrice}}</div>
        <div class="listone mm m10">{{todo.listPrice[9].peerPrice==-1?"--":todo.listPrice[9].peerPrice}}</div>
        <div class="listone showanymore" @click="getSingleDetails(todo.voyageNo)" style="width: 39px;"><img src="../../images/blacksjs.png" class="anymore" index="0"></div>
    </div>

    <div class="listDetails"  v-bind:class="showmydetails">
        <div class="cuxiaoInfos">
            <div class="boomOne"><div class="outMemery">{{cruiseData}}</div> <div class="curCuXiao"><span class="cuxiaoText">{{cruiseData}}</span><span class="ishiddenThem">...查看</span></div>
            </div>
            <div class="boomTwo">
                <span class="xingcheng">
                        <a href="#" class="checkXingCheng" target="_blank">查看</a>
                        <a href="#" class="downXingCheng" target="_blank">下载</a>
                </span>
            </div>
            <div class="boomThree">
                <p>入住：<span class="allInNum">可住成人{{maxRoomForPeolpleNum}}位</span></p>
                <p>房间：<span class="roomInNum">{{maxRoomNum}}间</span></p>
                <div class="noProducts" v-bind:class="{ishidden:showmylab}">请在下方选择入住人数进行预定</div>
            </div>
            <div class="boomFour">
                <p class="p_one">总价：<span class="z_price">{{allPrice}}元</span>  </p>
                <p class="p_one">人均: <span class="z_pre">{{prePeople}}元</span></p>
                <div class="boomNext" v-bind:class="{boomNextnow:shoNext}" @click="routPath">
                    <p>下一步：</p>
                    <p>选择附加产品> </p>
                </div>

            </div>
        </div>
        <div class="headLists">
            <span style="width: 352px;">舱房</span>
            <span style="width: 280px; margin-left:1px">双人间(元/人)</span>
            <span style="width: 281px; margin-left:1px">三人间(元/人)</span>
            <span style="width: 280px; margin-left:1px">四人间(元/人)</span>
        </div>
        <table  class="listTable"  cellpadding="0" cellspacing="0">
            <tr v-for="(tds, index) in cabinList"><td width="90" class="firsttd">{{myname[index]}}</td><td>
                <div class="oneline" v-for="(cruise,indexTwo) in tds">
                    <div class="lname">{{cruise.cabinTypeHead}}</div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[0].peerPrice==-1?"":cruise.price234[0].peerPrice}}</div>  <div class="limitAdd plusLimit " v-if="cruise.price234[0].peerPrice!==-1"><span class="limitIt" @click="computedMycurise(0,index,indexTwo,2)">-</span><input type="text" class="curNubs" v-model="cruise.price234[0].model"  readonly="readonly"><span class="addIt" @click="computedMycurise(1,index,indexTwo,2)">+</span>间</div><div v-else ></div></div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[1].peerPrice==-1?"":cruise.price234[1].peerPrice}}</div>  <div class="limitAdd plusLimit" v-if="cruise.price234[1].peerPrice!==-1"><span class="limitIt" @click="computedMycurise(0,index,indexTwo,3)">-</span><input type="text" class="curNubs"  v-model="cruise.price234[1].model" readonly="readonly"><span class="addIt" @click="computedMycurise(1,index,indexTwo,3)">+</span>间</div><div v-else ></div></div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[2].peerPrice==-1?"":cruise.price234[2].peerPrice}}</div>  <div class="limitAdd plusLimit" v-if="cruise.price234[2].peerPrice!==-1"><span class="limitIt" @click="computedMycurise(0,index,indexTwo,4)">-</span><input type="text" class="curNubs"  v-model="cruise.price234[2].model" readonly="readonly"><span class="addIt" @click="computedMycurise(1,index,indexTwo,4)">+</span>间</div><div v-else ></div></div>
                </div>
            </td></tr>
        </table>
    </div>

    </div>
</template>


<script>
 import {index_api} from '../../api/home'
 import  {app,bus} from  '@/extension'
 export default {
        name:'navyList',
        props:['todo'],
        data(){
           return{
               isActivity:false,
               cruiseData:'',
               cabinList:[],
               myname:{
                   0:"内舱",
                   1:"海景",
                   2:"阳台",
                   3:"套房"
               },
               showmylab:false,
               maxRoomNum:0, //最大房间数
               maxRoomForPeolpleNum:0, //最大可住人数
               allPrice:0, //  总价
               prePeople:0, // 人均
               shoNext:false
           }
        },


    methods:{
        getSingleDetails(voyageNo){
            var that=this;
            bus.$emit("isopenMeAndCloseOther");
            if(this.isActivity){
                this.isActivity=false;
                return;
            }
            that.PostJoson={
                voyageNo:voyageNo
            };
            index_api.getMyCruiseDetails({param:that.condations}).then((json)=>{
                this.isActivity=true;
                this.cruiseData=json.rows.storeward;
                for(let i=0;i<json.rows.item.length;i++){
                    for(let m=0;m<json.rows.item[i].length;m++){
                        for(var n=0;n<json.rows.item[i][m].price234.length;n++)
                        json.rows.item[i][m].price234[n].model=0;
                    }
                }
                this.cabinList=json.rows.item;

            })
        },

        computedMycurise(type,fatherindex,childindex,oneRoomCanIn){
            // 计算房间数，计算可住人数， 计算总价，计算人均，push单条仓房的数据。
            var that=this;
            if(type=="1"){
             //alert(fatherindex);  // 内海阳套
             //alert(childindex)   // 内N 海N 阳N 套N
                if(oneRoomCanIn==2){
                    that.cabinList[fatherindex][childindex].price234[0].model++;
                    that.maxRoomForPeolpleNum=that.maxRoomForPeolpleNum+2;
                    that.allPrice=that.allPrice+that.cabinList[fatherindex][childindex].price234[0].peerPrice*2;

                };
                if(oneRoomCanIn==3){
                    that.cabinList[fatherindex][childindex].price234[1].model++;
                    that.maxRoomForPeolpleNum=that.maxRoomForPeolpleNum+3;
                    that.allPrice=that.allPrice+that.cabinList[fatherindex][childindex].price234[0].peerPrice*3
                }
                if(oneRoomCanIn==4){
                    that.cabinList[fatherindex][childindex].price234[2].model++;
                    that.maxRoomForPeolpleNum=that.maxRoomForPeolpleNum+4;
                    that.allPrice=that.allPrice+that.cabinList[fatherindex][childindex].price234[0].peerPrice*4
                }
                that.prePeople=Math.ceil(that.allPrice/that.maxRoomForPeolpleNum)
                that.showmylab=true;
                that.shoNext=true;
                that.maxRoomNum=that.maxRoomNum+1

            }else{
                that.maxRoomNum=that.maxRoomNum-1
                if(oneRoomCanIn==2){
                    if(that.cabinList[fatherindex][childindex].price234[0].model==0){return};
                    if(that.maxRoomForPeolpleNum<0){return}
                    that.cabinList[fatherindex][childindex].price234[0].model--;
                    that.maxRoomForPeolpleNum=this.maxRoomForPeolpleNum-2;
                    that.allPrice=that.allPrice-that.cabinList[fatherindex][childindex].price234[0].peerPrice*2
                    if(that.maxRoomNum<=0){that.showmylab=false;that.shoNext=false; return;}
                };
                if(oneRoomCanIn==3){
                    if(that.cabinList[fatherindex][childindex].price234[1].model==0){return};
                    if(that.maxRoomForPeolpleNum<0){return}
                    that.cabinList[fatherindex][childindex].price234[1].model--;
                    that.maxRoomForPeolpleNum=this.maxRoomForPeolpleNum-3;
                    that.allPrice=that.allPrice-that.cabinList[fatherindex][childindex].price234[0].peerPrice*3
                    if(that.maxRoomNum<=0){that.showmylab=false;that.shoNext=false;  return;}
                }
                if(oneRoomCanIn==4){
                    if(that.cabinList[fatherindex][childindex].price234[2].model==0){return};
                    if(that.maxRoomForPeolpleNum<=0){that.showmylab=false;return}else{that.maxRoomNum}
                    that.cabinList[fatherindex][childindex].price234[2].model--;
                    that.maxRoomForPeolpleNum=this.maxRoomForPeolpleNum-4;
                    that.allPrice=that.allPrice-that.cabinList[fatherindex][childindex].price234[0].peerPrice*4
                    if(that.maxRoomNum<=0){that.showmylab=false;that.shoNext=false;  return;}
                };
                that.prePeople=Math.ceil(that.allPrice/that.maxRoomForPeolpleNum)

            }
        },
        routPath(){
            this.$router.push({path:"/login"})
        }
    },

     computed:{
         showmydetails:function(){
             return{
                 now:this.isActivity
             }
         },

     }


}
</script>

<style>
    .now{ display: block!important;}
    .ishidden{
        display: none;
    }
</style>

