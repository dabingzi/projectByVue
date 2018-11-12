<template>
  <div class="getAllMyCabinsLine">
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
          <div>出发时间</div>
          <div>船只</div>
          <div>天数</div>
          <div>行程</div>
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
              <div class="listone"><span class="listDate">{{items.sailingDate}}({{items.weekDay}})</span></div>
              <div class="listone"><span class="listBoat">{{items.cruiseName}}<span style="color: #ff0000"></span></span></div>
              <div class="listone">5天</div>
              <div class="listone">{{items.routes}}</div>
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
            for(let n=0;n<this.startcity.length;n++){
                this.startcity[n].isshow=false
            };
            for(let m=0;m<this.allBoats.length;m++){
                this.allBoats[m].isshow=false
            };
            this.getAllCuriseLineByCondation();
        },
        getAllStartCity(){
            var that=this;
            that.$http.get("http://127.0.0.1:8081/findStartCityList").then((json)=>{
                that.startcity=json.data.rows;
            }).catch((error)=>{
                 new Error(error);
            });
        },

        getAllBoats(){
            var that=this;
            that.$http.get("http://127.0.0.1:8081/getAllboats").then((json)=>{
                that.allBoats=json.data.rows.listCruise;
            }).catch((error)=>{
                new Error(error)
            })
        },
        addThisAsCurrentType(id,name,index){
            var that=this, condation=that.condations,o=0; // id,name,index
               for(let i=0;i<condation.length;i++){
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
                   for(let n=0;n<this.startcity.length;n++){
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
                      for(let m=0;m<this.allBoats.length;m++){
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
            that.$http.get("http://127.0.0.1:8081/GetData",{param:that.condations}).then((json)=>{
                that.lineData=json.data.rows;
            }).catch((error)=>{
                new Error(error)
            })
        },
        removeCurrent(id){
            var that=this, condations=that.condations;
              for(let i=0;i<condations.length;i++){
                  if(condations[i].id===id){
                      switch (condations[i].index){
                          case 0: {
                              for(let n=0;n<this.startcity.length;n++){
                                      this.startcity[n].isshow=false;
                              };
                              this.isActivity=true;
                              break;
                          };
                          case 1: {
                              for(let m=0;m<this.allBoats.length;m++){
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

