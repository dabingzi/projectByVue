
<template>
    <div>
    <div class="mylist ">
        <div class="listone"><span class="listDate">{{todo.sailingDate}}({{todo.weekDay}})</span></div>
        <div class="listone"><span class="listBoat">{{todo.cruiseName}}<span style="color: #ff0000"></span></span></div>
        <div class="listone">5天</div>
        <div class="listone">{{todo.routes}}</div>
        <div class="listone mm m1">{{todo.listPrice[3].peerPrice}}</div>
        <div class="listone mm m2">{{todo.listPrice[4].peerPrice}}</div>
        <div class="listone mm m3">{{todo.listPrice[5].peerPrice}}</div>
        <div class="listone mm m4">{{todo.listPrice[0].peerPrice}}</div>
        <div class="listone mm m5">{{todo.listPrice[1].peerPrice}}</div>
        <div class="listone mm m6">{{todo.listPrice[2].peerPrice}}</div>
        <div class="listone mm m7">{{todo.listPrice[6].peerPrice}}</div>
        <div class="listone mm m8">{{todo.listPrice[7].peerPrice}}</div>
        <div class="listone mm m9">{{todo.listPrice[8].peerPrice}}</div>
        <div class="listone mm m10">{{todo.listPrice[9].peerPrice}}</div>
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
                <p>入住：<span class="allInNum">成人4位</span></p>
                <p>房间：<span class="roomInNum">2间</span></p>
                <div class="noProducts">请在下方选择入住人数进行预定</div>
            </div>
            <div class="boomFour">
                <p class="p_one">总价：<span class="z_price">-</span>  <span class="z_mingxi"><span class="curMx">明细</span> > </span></p>
                <p class="p_one">人均: <span class="z_pre">-</span></p>
                <div class="boomNext">
                    <p>下一步：</p>
                    <p>选择附加产品> </p>
                </div>
                <div class="boomDetail">
                    <div class="zoomBG">
                        <ul class="ulZoom">
                            <li>
                                标准内舱四人房11/12<span class="anypeople">(4成人)</span>    <span class="howmany">X1</span> 8796 <span class="deleteThis">删除</span>
                            </li>
                        </ul>
                        <p class="z_detail">以上价格包含：行程内的船票、邮轮港务税费、领队费、赠送的岸上观光（如适用）、船舶观光登陆许可证（日本免签）</p>
                    </div>
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
                <div class="oneline" v-for="cruise in tds">
                    <div class="lname">{{cruise.cabinTypeHead}}</div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[0].peerPrice==-1?"":cruise.price234[0].peerPrice}}</div>  <div class="limitAdd plusLimit " v-if="cruise.price234[0].peerPrice!==-1"><span class="limitIt">-</span><input type="text" class="curNubs" value="0"  readonly="readonly"><span class="addIt">+</span>间</div><div v-else ></div></div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[1].peerPrice==-1?"":cruise.price234[1].peerPrice}}</div>  <div class="limitAdd plusLimit" v-if="cruise.price234[1].peerPrice!==-1"><span class="limitIt">-</span><input type="text" class="curNubs" value="0" readonly="readonly"><span class="addIt">+</span>间</div><div v-else ></div></div>
                    <div class="lprice adprice"><div class="limitPrice">{{cruise.price234[2].peerPrice==-1?"":cruise.price234[2].peerPrice}}</div>  <div class="limitAdd plusLimit" v-if="cruise.price234[2].peerPrice!==-1"><span class="limitIt">-</span><input type="text" class="curNubs" value="0" readonly="readonly"><span class="addIt">+</span>间</div><div v-else ></div></div>
                </div>
            </td></tr>
        </table>
    </div>

    </div>
</template>


<script>
 import {index_api} from '../../api/home'
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
               }
           }
        },

    methods:{
        getSingleDetails(voyageNo){
            var that=this;
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
                this.cabinList=json.rows.item;

            })
        }
    },
     watch:{
         cruiseData:{
             deep:true,
             handler:function () {
                 console.log("")
             }
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
</style>

