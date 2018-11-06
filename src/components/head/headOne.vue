<template>
  <div class="sideAlong">
    <div class="sidelistsWapper">
      <div class="sidelist userName versionBk"  @click="show = !show"><span id="theName" >13774490474</span><span> <img src="../../images/blackTriangel.png" /></span>
        <ul class="userSet" v-if="show">
          <li index="查看"> <a href="priceadd.shtml">设置</a>  </li>
          <li index="结算版">退出</li>
        </ul>
      </div>


      <div class="sidelist versionBk" @click="isshow=!isshow"><span >手机APP</span><span> <img src="../../images/blackTriangel.png" /></span>
        <ul class="androidAndios " v-if="isshow">
          <li >
            <img src="../../images/xiazai.png">
            <p>"扫一扫下载App"</p>
          </li>

        </ul></div>

      <div class="sidelist versionBk" @click="onshow=!onshow"><span >销售支持</span><span> <img src="../../images/blackTriangel.png" /></span>
        <ul class="sellersInfo " v-if="onshow">
          <li>
            <img src="https://www.youlunhui.com/ERP//upload/userImg/201806/201806261546471a56225a-1f84-46aa-861a-efaaf3d459a8.jpg" class="myercode">
            <h3>客户经理:&nbsp;&nbsp;展静雪</h3>
            <p class="smallPhone">13817489495</p>
            <p class="smallTel"></p>
          </li>
          <li>
            <img src="https://www.youlunhui.com/ERP//upload/userImg/201806/20180626154750800610da-b20e-42cf-b306-ba64142b2e94.jpg" class="myercode">
            <h3>销售经理:&nbsp;&nbsp;施浩</h3>
            <p class="smallPhone">15221084849</p>
            <p class="smallTel"></p>
          </li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
  export default{
  name:'headOne',
  data(){
     return{
         show:false,
         isshow:false,
         onshow:false
     }
  },
  methods:{

  }


}
</script>
<style scoped>
  .sideAlong{
    width: 100%;
    height: 23px;
    background-color: #eee;
    min-width: 1200px;
  }
  .sidelistsWapper{
    width:1200px;
    margin: 0 auto;
    height: 23px;
  }

  .sidelist{
    float: right;
    margin-left: 20px;
    position: relative;
  }
  .sidelist span{
    color: #383838;
    font-size: 11px;
    line-height: 20px;
  }
  .androidAndios{
    position: absolute;
    z-index: 999;
    left: -60px;
    width: 150px;
    padding: 10px 10px 10px 10px;
    background-color: #fff;
    box-shadow: 0px 0px 3px #ddd;


  }
  .androidAndios li{
    width: 150px;
    float: left;
    text-align: center;
  }
  .androidAndios li p{
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
  }
  .androidAndios li img{
    width: 140px;
    height: 140px;
  }


  .sellersInfo{
    position: absolute;
    z-index: 999;
    left: -135px;
    width: 310px;
    padding: 10px 10px 10px 20px;
    background-color: #fff;
    box-shadow: 0px 0px 3px #ddd;

  }
  .sellersInfo li{
    position: relative;
    float: left;
    width: 100%;
    height: 150px;
    margin-top: 15px;
    border-bottom: 1px dashed #999;
    padding-bottom: 10px;

  }
  .myercode{
    position: absolute;
    width: 155px;
    height: 150px;
    line-height: 75px;
    text-align: center;
    left: 0px;
    top:0px;
  }
  .sellersInfo li h3{
    position: absolute;
    left: 160px;
    top:15px;
    font-size: 14px;
  }
  .sellersInfo li p.smallPhone{
    position: absolute;
    left: 160px;
    top:50px;
    font-size: 14px;
    background: url("../../images/xiaophone.png") no-repeat left center;
    padding-left: 20px;
  }
  .sellersInfo li p.smallTel{
    position: absolute;
    left: 160px;
    top:75px;
    font-size: 14px;
    padding-left: 20px;
    background: url("../../images/smalltel.png") no-repeat left center;
  }


  .sellersInfo li p.myweixinhao{
    position: absolute;
    left: 0px;
    top:75px;

    background: url("../../images/wechat.png") no-repeat left center;
    padding-left: 28px;
    font-size: 11px;

  }

.userSet{
    /*display: none;*/
    position: absolute;
    left: 0px; top:0px;
    padding-top: 25px;
    width: 100%;
    border-bottom: 1px solid #fff;
    z-index: 999;
  }
  .userSet{

    right: 0px;
  }
  .versionBk{
    cursor: pointer;
  }
  .userSet li{
    background-color: #fff!important;
    color: #666!important;
    font-size: 12px;
  }
  .userSet  li a{
    display: block;
    width: 100%;
    height: 100%;
    color: #666;
  }
  .userSet li:hover{
    background-color:#009aef!important;
    color: #fff!important;
  }
  .userSet li:hover a{
    color: #fff!important;
  }

  .userName{
    width: auto;
    min-width: 40px;
    max-width: 180px;
    text-align: right;
    padding-left: 0px!important;

  }


  .youlunbaike li{
    width:100%;
    line-height: 33px;
    text-align: center;
    border-top: 1px solid #fff;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    background-color: #182547;

  }
  .youlunbaike li:hover{
    background-color: #fff;
  }
  .youlunbaike li:hover a{
    color: #182547;
  }


  .jiesuanVersion li{
    width:100%;
    line-height: 33px;
    text-align: center;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    border-top: 1px solid #fff;
    background-color: #fff;
    font-size: 12px;

  }
  .jiesuanVersion li:hover{
    background-color: #009aef;
    color: #fff;
  }
  .jiesuanVersion li:hover a{
    color: #fff;
  }


  .userSet li{
    width:100%;
    line-height: 33px;
    text-align: center;
    border-top: 1px solid #fff;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    background-color: #182547;

  }
  .userSet li:hover{
    background-color: #fff;
    color: #182547;
  }
  .userSet li:hover a{
    color: #182547;
  }


  .ultab h6{
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px 15px 0px;

  }
  .ultab ul{
    width: 100%;
    border-top: 1px solid #666;
    padding-top: 10px;
  }
  .ultab ul li{
    float: left;
    width: 100%;
    height: 35px;


  }
  .ultab ul li input[type=checkbox]{
    margin-right: 15px;
    margin-top: 4px;
  }

  .s_btns input,.s_btns a{
    display: block;
    float: left;
  }


  .linArea p{
    width: 890px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    margin-top: 18px;
    line-height: 26px;
  }
  .linArea p a{
    margin: 0px 8px;
    color: #535454;

  }


  .allprompt p{
    padding: 0px 5px;
    line-height: 22px;
    text-align: center;
    max-height: 85px;

    overflow-y: auto;


  }

</style>
