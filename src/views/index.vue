<template>
  <div class="xiaobing">
      <headOne></headOne>
      <headTwo></headTwo>

      <div class="searchArea">


          <div class="commenZoom">
              <div class="arealeft"><span>出发港口:</span></div>
              <div class="arearight">
                  <p class="allStarCity" index="0"><span  class="firstOne" v-bind:class="showObject"  @click="addThisAsCurrentType('555','全部港口',0)">全部港口</span><span v-bind:class="{now:city.isshow}"  v-for="city in startcity" @click="addThisAsCurrentType(city.id,city.cityName,0)" :index="city.id">{{city.cityName}}</span></p>
              </div>
          </div>
          <div class="commenZoom">
              <div class="arealeft"><span>邮轮船只:</span></div>
              <div class="arearight">
                  <p class="allStarBoat" index="1"><span  class="firstOne" v-bind:class="showObjectTwo" @click="addThisAsCurrentType('666','全部船只',1)">全部船只</span><span v-bind:class="{now:boats.isshow}"  v-for="boats in allBoats" @click="addThisAsCurrentType(boats.cruiseId,boats.cruiseName,1)" :index="boats.cruiseId">{{boats.cruiseName}}</span></p>
              </div>
          </div>


          <div class="allConditions">
              <div class="alldetails">共<span>{{total}}</span>条结果</div>
              <ul id="chaxuntiaojian">
                  <li v-for="condation in condations" :index="condation.id"><span class="searchname">{{condation.name}}</span><span class="close"  @click="removeCurrent(condation.id)"></span></li>
              </ul>

              <div class="resetAllBtn" @click="clearAllCondations">清除全部</div>
          </div><!--列出所有的当前查询条件-->
      </div><!--searchArea-->

      <div class="listHead oldlisthead">
          <div style="width: 114px;">出发时间</div>
          <div style="width: 70px; padding-left:30px; margin-left:20px;text-align: left">船只</div>
          <div style="width: 36px;">天数</div>
          <div style="width: 125px; margin-left: 40px; text-align: left">行程</div>
          <div class="n1 nn">内双</div>
          <div class="n2 nn">内三</div>
          <div class="n3 nn">内四</div>
          <div class="n4 nn">海双</div>
          <div class="n5 nn">海三</div>
          <div class="n6 nn">海四</div>
          <div class="n7 nn">阳双</div>
          <div class="n8 nn">阳三</div>
          <div class="n9 nn">阳四</div>
          <div class="n10 nn">套房(起)</div>

      </div><!--List导航-->


      <div class="ListAll" id="ListAll"  >

          <div class="mylist " v-for="(items, index) in lineData">
              <div class="listone" style="width: 114px;"><span class="listDate">{{items.sailingDate}}({{items.weekDay}})</span></div>
              <div class="listone" style="width: 100px; margin-left:20px;"><span class="listBoat">{{items.cruiseName}}<span style="color: #ff0000"></span></span></div>
              <div class="listone" style="width: 36px;">5天</div>
              <div class="listone" style="width: 125px; margin-left: 40px; text-align: left" title="">{{items.routes}}</div>
              <div class="listone mm m1">{{items.listPrice[3].peerPrice}}</div>
              <div class="listone mm m2">{{items.listPrice[4].peerPrice}}</div>
              <div class="listone mm m3">{{items.listPrice[5].peerPrice}}</div>
              <div class="listone mm m4">{{items.listPrice[0].peerPrice}}</div>
              <div class="listone mm m5">{{items.listPrice[1].peerPrice}}</div>
              <div class="listone mm m6">{{items.listPrice[2].peerPrice}}</div>
              <div class="listone mm m7">{{items.listPrice[6].peerPrice}}</div>
              <div class="listone mm m8">{{items.listPrice[7].peerPrice}}</div>
              <div class="listone mm m9">{{items.listPrice[8].peerPrice}}</div>
              <div class="listone mm m10">{{items.listPrice[9].peerPrice}}</div>
              <div class="listone showanymore" style="width: 39px;"><img src="../images/blacksjs.png" class="anymore" index="0"></div>
          </div>
      </div>
  </div>

</template>

<script>
  import  {headOne, headTwo} from '@/components/head'
  import {mapMutations} from 'vuex'
  import store from '@/store'
  export default{
    name:'index',
    data(){
      return {
        headName:"这是首页",
        startcity:[],
        allBoats:[],
          lineData:[],
        isActivity:true,
        isActivityTwo:true,
        condations:[],  //  条件
        ishowMe:false,

      }
    },
    components: {
        headOne,
        headTwo
    },
      created(){

          if(!store.state.islogin.loginStatus){
              this.$router.push({path:"/login"})
          }
      },

      beforeMount(){
        this.getAllStartCity();
        this.getAllBoats();
        this.getAllCuriseLineByCondation()
      },
    methods:{
          //  清除全部查询条件

        clearAllCondations(){
           this.condations=[];
           this.isActivity=true;
           this.isActivityTwo=true;
            for(var n=0;n<this.startcity.length;n++){
                this.startcity[n].isshow=false
            };
            for(var m=0;n<this.allBoats.length;m++){
                this.allBoats[m].isshow=false
            };
            this.getAllCuriseLineByCondation()

        },

        getAllStartCity(){

            var that=this;
            that.$http.get("/findStartCityList").then( (json)=> {

            }).catch(()=>{
               var json={"status":200,"msg":"","rows":[{"isDefault":1,"cityName":"上海","id":1}],"total":0,"other":null};
                that.startcity=json.rows;
            })
        },

        getAllBoats(){
            var that=this;
            that.$http.get("/getAllboats").then((json)=>{

            }).catch((error)=>{
                var json={"status":200,"msg":"","rows":{"listCruise":[{"cruiseEName":"Quantum of the Seas","cruiseName":"海洋量子号","cruiseId":67},{"cruiseEName":"Norwegian Joy","cruiseName":"喜悦号","cruiseId":16},{"cruiseEName":"Majestic Princess","cruiseName":"盛世公主号","cruiseId":59},{"cruiseEName":"Serena","cruiseName":"赛琳娜号","cruiseId":15},{"cruiseEName":"Splendida","cruiseName":"辉煌号","cruiseId":72},{"cruiseEName":"STAR SUPERSTAR VIRGO","cruiseName":"处女星号","cruiseId":74},{"cruiseEName":"Golden Era","cruiseName":"新世纪号","cruiseId":14}],"listCompany":[{"simpleName":"RCL","companyName":"皇家加勒比国际游轮","copanyEName":"Royal Caribbean International","cruiseCompanyId":4},{"simpleName":"Costa","companyName":"歌诗达邮轮","copanyEName":"Costa Cruise","cruiseCompanyId":6},{"simpleName":"NCL","companyName":"诺唯真游轮","copanyEName":"Norwegian Cruise Line","cruiseCompanyId":10},{"simpleName":"Skysea","companyName":"天海邮轮","copanyEName":"Skysea Cruise","cruiseCompanyId":11},{"simpleName":"Princess","companyName":"公主邮轮","copanyEName":"Princess Cruise","cruiseCompanyId":12},{"simpleName":"Star","companyName":"丽星邮轮","copanyEName":"Star Cruises","cruiseCompanyId":22},{"simpleName":"Dream ","companyName":"星梦邮轮","copanyEName":"Dream Cruises","cruiseCompanyId":23},{"simpleName":"MSC","companyName":"地中海邮轮","copanyEName":"MSC Cruises","cruiseCompanyId":24},{"simpleName":"DC","companyName":"钻石邮轮公司","copanyEName":"Diamond Cruises","cruiseCompanyId":25},{"simpleName":"HAL","companyName":"荷美邮轮","copanyEName":"Holland Americal Line","cruiseCompanyId":50},{"simpleName":"gs","companyName":"公司","copanyEName":"gongsi","cruiseCompanyId":51}]},"total":0,"other":null}
                that.allBoats=json.rows.listCruise;
            })
        },

        addThisAsCurrentType(id,name,index){

            var that=this, condation=that.condations,o=0; // id,name,index
           for(var i=0;i<condation.length;i++){
               if(condation[i].index===index){
                   o=1;
                   condation[i].name=name;
                   that.condations[i].name=name;
               }
           };
           if(o==0){
               that.condations.push({
                   id:id,
                   name:name,
                   index:index
               })
           };


           switch (index){
               case 0: {

                    var has=0;
                   for(var n=0;n<this.startcity.length;n++){
                       if(this.startcity[n].id==id){
                           this.startcity[n].isshow=true;
                           this.isActivity=false;
                           has=1
                       }else{
                           this.startcity[n].isshow=false;
                       }
                   };
                    if(has==0){

                        this.isActivity=true;
                    }
                 break;
               };
               case 1: {
                   var hasTwo=0;
                      for(var m=0;m<this.allBoats.length;m++){
                          if(this.allBoats[m].cruiseId==id){
                              this.allBoats[m].isshow=true;
                              this.isActivityTwo=false;
                              hasTwo=1
                          }else{
                              this.allBoats[m].isshow=false;
                          };
                      };
                   if(hasTwo==0){
                       this.isActivityTwo=true;
                   }
               }
           };

          that.getAllCuriseLineByCondation();

        },

        getAllCuriseLineByCondation(){
            var that=this;
            that.$http.get("/GetData",{param:that.condations}).then((json)=>{

            }).catch((error)=>{

                var jsonData={"status":200,"msg":"","rows":[{"id":416,"voyageNo":"QN181201","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201801/20180130103358a0a82231-89b2-4842-8f74-72c60b68ce59.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月1日","afterMoney":0,"endDate":"12月6日","routes":"上海-长崎-冲绳-上海","date":"5晚6天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3799.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3599.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":3299.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4499.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":4099.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3799.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周六","weekDayBack":"周四","smallPrice":null,"sailingDateReal":"2018-12-01 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"15:00\",\"port\":\"长崎\"},{\"arrivalTime\":\"13:00\",\"departureTime\":\"22:00\",\"port\":\"冲绳\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":562,"voyageNo":"JOY181201","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512075914259c71-b943-4a23-a5fa-17611dd9f539.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月1日","afterMoney":0,"endDate":"12月5日","routes":"上海-福冈-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3199.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":2999.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":2799.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3800.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3600.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3400.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":4000.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3800.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3600.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周六","weekDayBack":"周三","smallPrice":null,"sailingDateReal":"2018-12-01 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":417,"voyageNo":"QN181206","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512075914259c71-b943-4a23-a5fa-17611dd9f539.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月6日","afterMoney":0,"endDate":"12月10日","routes":"上海-福冈-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3599.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3399.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3399.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3199.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3599.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3599.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":4699.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":4299.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":4299.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周四","weekDayBack":"周一","smallPrice":null,"sailingDateReal":"2018-12-06 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":564,"voyageNo":"JOY181209","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512075914259c71-b943-4a23-a5fa-17611dd9f539.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月9日","afterMoney":0,"endDate":"12月13日","routes":"上海-福冈-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3299.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3099.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3099.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":2899.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3499.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3499.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3299.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3899.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3699.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周日","weekDayBack":"周四","smallPrice":null,"sailingDateReal":"2018-12-09 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":418,"voyageNo":"QN181210","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/20170925125034282aad8c-638b-4af9-b863-cff60a17f207.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月10日","afterMoney":0,"endDate":"12月15日","routes":"上海-长崎-福冈-上海","date":"5晚6天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3799.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3499.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":3199.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3499.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3199.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4199.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3799.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3499.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":5199.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":4699.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周一","weekDayBack":"周六","smallPrice":null,"sailingDateReal":"2018-12-10 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"19:00\",\"port\":\"长崎\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":565,"voyageNo":"JOY181213","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512075914259c71-b943-4a23-a5fa-17611dd9f539.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月13日","afterMoney":0,"endDate":"12月17日","routes":"上海-福冈-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3199.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3199.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":2799.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":2699.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":2499.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3699.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3399.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":2999.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3599.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3399.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周四","weekDayBack":"周一","smallPrice":null,"sailingDateReal":"2018-12-13 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":419,"voyageNo":"QN181215","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512495013f5247e-bb0e-4a71-bb5a-b28330b066ee.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月15日","afterMoney":0,"endDate":"12月20日","routes":"上海-熊本-福冈-上海","date":"5晚6天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3999.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3799.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3599.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3399.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":3299.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4399.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":4199.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":4199.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":5399.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":4999.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":4799.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周六","weekDayBack":"周四","smallPrice":null,"sailingDateReal":"2018-12-15 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"19:00\",\"port\":\"熊本\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":566,"voyageNo":"JOY181217","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/201709251207398a63586b-bfbb-4adf-8dcf-9825f331ee9b.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月17日","afterMoney":0,"endDate":"12月21日","routes":"上海-冲绳-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":1526634335677,"lastUpdatedBy":"赵新月","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3499.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3299.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":2999.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":2699.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":2499.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3699.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3399.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3199.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3599.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3399.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周一","weekDayBack":"周五","smallPrice":null,"sailingDateReal":"2018-12-17 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:00\",\"port\":\"熊本\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":567,"voyageNo":"JOY181221","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/2017092512075914259c71-b943-4a23-a5fa-17611dd9f539.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月21日","afterMoney":0,"endDate":"12月25日","routes":"上海-福冈-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":4088.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3488.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":3238.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3888.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3288.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":3038.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4388.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3688.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3438.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":4088.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3888.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3638.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周五","weekDayBack":"周二","smallPrice":null,"sailingDateReal":"2018-12-21 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":421,"voyageNo":"QN181224","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/20170925125034282aad8c-638b-4af9-b863-cff60a17f207.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月24日","afterMoney":0,"endDate":"12月29日","routes":"上海-长崎-福冈-上海","date":"5晚6天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":4199.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3899.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3699.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3599.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":3499.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4599.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":4399.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":4299.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":5599.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":5099.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周一","weekDayBack":"周六","smallPrice":null,"sailingDateReal":"2018-12-24 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"19:00\",\"port\":\"长崎\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":568,"voyageNo":"JOY181225","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201709/20170925121058d0cf270c-df98-4beb-8731-1b7081ea71a8.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月25日","afterMoney":0,"endDate":"12月29日","routes":"上海-长崎-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":null,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3699.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":3299.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":2999.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4199.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3699.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3399.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":4399.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3999.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3599.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周二","weekDayBack":"周六","smallPrice":null,"sailingDateReal":"2018-12-25 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"16:00\",\"port\":\"长崎\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":569,"voyageNo":"JOY181229","cruiseCompany":"诺唯真游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"喜悦号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122114830_56E7AC83EA9A47CCAE6BFA853933BB1E.png","voyageImg":"https://www.youlunhui.com/ERP//upload/voyageImg/201710/20171012131822c65fb828-909d-42f6-9b61-e5b9a02db69d.jpg","promptAppLogo":null,"abbreviation":"JOY","orignPort":null,"endPort":null,"sailingDate":"12月29日","afterMoney":0,"endDate":"1月2日","routes":"上海-佐世保-上海","date":"4晚5天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 20:18:43","updateTime":1521219587250,"lastUpdatedBy":"王阳","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":3399.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":3099.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":3699.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":3499.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3299.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":3899.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":3699.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":3499.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周六","weekDayBack":"周三","smallPrice":null,"sailingDateReal":"2018-12-29 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:00\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"18:00\",\"port\":\"佐世保\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"06:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null},{"id":422,"voyageNo":"QN181229","cruiseCompany":"皇家加勒比国际游轮","sailingDateYear":"2018","sailingMonth":"12","cruiseName":"海洋量子号","cruiseLogo":"https://www.youlunhui.com/youlh/upload/notice/2018/01//20180122113442_D6C5B4808FE24012B2FD2C52FAB0020C.png","voyageImg":"http://106.14.63.154:8080/ERP//upload/voyageImg/201710/201710121315077f7ffb02-1725-4ba9-886d-cfc1b5f08378.jpg","promptAppLogo":null,"abbreviation":"QN","orignPort":null,"endPort":null,"sailingDate":"12月29日","afterMoney":0,"endDate":"1月3日","routes":"上海-长崎-鹿儿岛-上海","date":"5晚6天","dockingperson":null,"dockingTel":null,"isDelete":false,"createTime":"2018-01-25 15:20:33","updateTime":1534757050667,"lastUpdatedBy":"李梦","remark":null,"peerPriceOrder":-1.0,"cabinTypeOrder":"","listPrice":[{"cabinTypeEnd":"海景","peerPrice":4399.0,"maxInStay":2},{"cabinTypeEnd":"海景","peerPrice":3999.0,"maxInStay":3},{"cabinTypeEnd":"海景","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"内舱","peerPrice":4199.0,"maxInStay":2},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"内舱","peerPrice":-1.0,"maxInStay":4},{"cabinTypeEnd":"阳台","peerPrice":4699.0,"maxInStay":2},{"cabinTypeEnd":"阳台","peerPrice":4199.0,"maxInStay":3},{"cabinTypeEnd":"阳台","peerPrice":3899.0,"maxInStay":4},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":2},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":3},{"cabinTypeEnd":"套房","peerPrice":-1.0,"maxInStay":4}],"item":null,"storeward":"","weekDay":"周六","weekDayBack":"周四","smallPrice":null,"sailingDateReal":"2018-12-29 00:00:00","routeInfo":"[{\"arrivalTime\":\"-\",\"departureTime\":\"16:45\",\"port\":\"上海\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"08:00\",\"departureTime\":\"19:00\",\"port\":\"长崎\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"18:45\",\"port\":\"福冈\"},{\"arrivalTime\":\"-\",\"departureTime\":\"-\",\"port\":\"海上巡游\"},{\"arrivalTime\":\"07:00\",\"departureTime\":\"-\",\"port\":\"上海\"}]","reason":"","cabinPriceSmall":null,"phoneTopFlag":null,"saleTagSingle":false,"saleTagEarly":false,"saleTagPromo":false,"saleTagLast":false,"cabinTypeEndList":null}],"total":13,"other":null}
                that.lineData=jsonData.rows;

            })
        },
        removeCurrent(id){
            var that=this, condations=that.condations;
              for(var i=0;i<condations.length;i++){
                  if(condations[i].id===id){
                      switch (condations[i].index){
                          case 0: {
                              for(var n=0;n<this.startcity.length;n++){
                                      this.startcity[n].isshow=false;
                              };
                              this.isActivity=true;
                              break;
                          };
                          case 1: {
                              for(var m=0;m<this.allBoats.length;m++){
                                      this.allBoats[m].isshow=false;
                                  }
                                this.isActivityTwo=true;
                              };
                          }
                      that.condations.splice(i,1);
                   };
              };
            that.getAllCuriseLineByCondation()
        },

    },
      computed:{
          showObject:function(){
              return{
                  now:this.isActivity
              }
          },
          showObjectTwo:function(){
              return{
                  now:this.isActivityTwo
              }
          },

          getji(index){
              alert(index)
              if(index%2==0){
                  return {
                      jishu:true
                  }
              }else{
                  return {
                      jishu:false
                  }
              }
          },

      }
  }
</script>
<style src="@/styles/global.scss"></style>
<style src="@/styles/index.scss"></style>
<style scoped>
    .liMonth{
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
        text-align: left;
    }
</style>

