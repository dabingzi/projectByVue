<template>
  <div class="getAllMyCabinsLine">

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
          <navyList v-for="(items, index) in lineData" v-bind:todo="items"></navyList>
      </div>

      <p class="checkmore" @click="checkMoreData">查看更多</p>
  </div>

</template>

<script>
  import  {headOne, headTwo} from '@/components/head'
  import  {navyList} from  '@/components/indexsrc'
  import {mapMutations} from 'vuex'
  import store from '@/store'
  import {index_api} from '../api/home'
  import  {app,bus} from  '@/extension'
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
        headTwo,
        navyList
    },
      created(){
//          if(!store.state.islogin.loginStatus){
//              this.$router.push({path:"/login"})
//          }


      },
      beforeMount(){
        this.getAllStartCity();
        this.getAllBoats();
        this.getAllCuriseLineByCondation(1)
      },
      mounted(){
          bus.$on('isopenMeAndCloseOther',function () {
              
          })
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

            index_api.findStartCityList().then((json)=>{

                that.startcity=json.rows;
            }).catch((error)=>{
                 new Error(error);
            });
        },

        getAllBoats(){
            var that=this;
            index_api.getAllboats().then((json)=>{that.allBoats=json.rows.listCruise;


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

        getAllCuriseLineByCondation(num){
            var that=this;
            index_api.GetData({param:that.condations}).then((json)=>{


                if(num==1){
                    that.lineData=json.rows;
                }else {
                    for(var key=0;key<json.rows.length;key++){
                        that.lineData.push(json.rows[key])
                    }
                }
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

        // 获得更多数据
        checkMoreData(){
            this.getAllCuriseLineByCondation(2)
        }
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
    .checkmore{
        width:1200px; height: 40px; line-height: 40px; cursor: pointer; margin: 0 auto; background-color: #ccc; color: #fff
    }
</style>

