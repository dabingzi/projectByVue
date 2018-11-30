<template slot-scope>
  <div class="wapper">
  <div class="loginRight">
    <div class="lg_a">
      <div class="loginArea">
        <h1>{{systemName}}</h1>
        <div class="loginZoom" :model="groceryList" >
        <p class="userNamebg"><input type="text" v-model="groceryList.userName" name="userName" class="userName" autocomplete="off" placeholder="输入账号" ></p>
        <p class="userpasswordbg"><input type="password" name="password" class="u_password" v-model="groceryList.password" @keyup.13="LoginMyAccount"></p>
        <p ><span class="checkedBtn" @click="isshow"><input type="button" name="fadeleft" class="authRuller" v-if="show"></span><span class="rememberpsd">&nbsp;记住密码</span> <span class="forgetpsw"><a href="/one" target="_blank">找回密码</a><a href="/two" target="_blank">免费注册 /</a></span> </p>
        <p  style=""><input type="button" class="loginIn" value="登 录"  @click="LoginMyAccount"></p>
         <p class=" errorInfo"></p>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>
<script>


    import {mapMutations} from 'vuex'
    import store from '@/store'
    import  {app} from  '@/extension'
    import {login_api} from '../api/login'
    export default {
    name: 'login',
    components:"",
    data:function () {
        return {
          systemName:"用户登录界面",
          groceryList:{
            userName:"",
            password:"",
          },
            show:true,
            isonClick:0,
        }
    },
      beforeMount: function(){
        var getData=app.getCookie("auth");
            getData=JSON.parse(getData);
          this.groceryList.userName=getData.params.account?getData.params.account:"";
          this.groceryList.password=getData.params.password?getData.params.password:"";
      },
    methods:{
      ...mapMutations(['rememberPSD']),
         LoginMyAccount(){
          // 防重点  ==> 或使用节流
             if(this.isonClick==1){ return};
             this.isonClick=1;
             var param={
                 account:this.groceryList.userName,
                 password:this.groceryList.password
             };
             login_api.siginIn({params:param}).then((json)=> {
                if(json.status==200){
                    this.isonClick=0;
                    if(store.state.loginUser.isAuth){
                        var p=JSON.stringify({params:param});
                        app.setCookie("auth",p,7)
                    };
                    store.commit('onlogin');
                    //window.location.assign("/")            OK
                    // this.$router.push({name:"index"})     OK
                    this.$router.push({path:"/"})
                }else{
                    this.isonClick=0;
                    alert(json.msg)
                }
             }).catch((error) => {
                 this.isonClick=0;
                 new Error(error);
             })
         },
         isshow(){
              if(!this.show){
                  this.show=true;
                  store.commit('rememberPSD');
              }else {
                  this.show=false;
                  store.commit('noRememberPSD');
              }
          }
    },
  }

</script>
<style rel="stylesheet/scss" lang="css">
  .wapper{
    width: 100%;
    height: 100%;
  }
  .logoLeft{
    width: 33%;
    min-width:270px;
    height: 100%;
    text-align: center;
    position: absolute;
    left: 0px;
    top:0px;
    background-color:#012456;
    font-size: 0px;
    z-index: 10;
  }
  .c_logoLeft{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .logoLeft img{
    position: absolute;/*260*88*/
    left:50%;
    margin-left: -130px;
    top:50%;
    margin-top: -44px;

  }

  .loginRight{
    z-index: 9;
    position: absolute;
    left: 0px; top:0px;
    width: 100%;
    padding-right: 0px;
    height: 100%;
    background: url("../images/loginBg.jpg") no-repeat left center;
    background-size: cover;

  }
  .loginZoom{
    background: url("../images/loginzoomBg.png") no-repeat left center;
    width: 345px;
    height: 270px;
    padding: 70px;
  }

  .lg_a{ position: relative; width: 100%; height: 100%}

  .loginArea{
    width: 500px; height: 500px;
    position: absolute;
    left: 50%; margin-left: -250px;
    top:50%; margin-top: -250px;


  }

  .loginArea h1{
    font-size: 40px;
    color: #093158;
    margin-bottom: 40px;
    font-weight: 700;
    text-align: center;
    span{
      color: #ff0000;
    }
  }

  .loginArea p{
    margin-bottom: 30px;

    overflow: hidden;
  }
  .loginArea p input[type=text],.loginArea p input[type=password]{
    width: 330px; height: 38px;


    margin: 0 auto;
  }

  .userNamebg{
    background: url("../images/loginren.png") no-repeat 10px center #fff;
    padding-left: 40px;
    border-bottom: 1px solid #b3b3b3;
  }
  .userpasswordbg{
    background: url("../images/loginsuo.png") no-repeat 10px center #fff;
    padding-left: 40px;
    border-bottom: 1px solid #b3b3b3;
  }
  .userName{
    color: #333;
    font-size: 16px;
  }
  .u_password{

  }
  #autoLogin{
    cursor: pointer;
  }
  .loginIn{
    width: 345px; hight:44px;
    border: 0px;
    background-color:#00357e;
    color: #fff;
    font-size: 22px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-top: 5px;
  }

  .errorInfo{
    color: #ff0000;
  }


  .checkedBtn{
    width: 26px;
    height: 18px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    float: left;
    background: url("../images/switch.png") no-repeat left center;
    cursor: pointer;
  }
  .authRuller{
    width: 15px;
    height: 18px;
    float: right;
    background: url("../images/point.png") no-repeat right center;
    cursor: pointer;
  }

  .rememberpsd{

    float: left;
    display: block;
    height: 20px;
    line-height: 20px;
    margin-left: 5px;
    color: #093158; font-size: 16px;
  }

  .forgetpsw{
    padding-right: 10px;
    float: right;
    margin-top: -2px;
  }
  .forgetpsw a{
    float: right;
    margin-left: 10px; color: #093158;
    font-size: 16px;
  }
  .forgetpsw a:hover{
    color: #ff6060;
  }

  .miaoshu span{
    padding-bottom: 4px;

  }



  #subMessage{
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    float: right;

    background-color:#0072c6 ;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    margin-right: 200px;

  }



</style>
