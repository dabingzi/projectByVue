<template>
  <div class="b_head">
    <div class="headNavy">
      <div class="usersName"><a href="index.shtml"></a></div>
      <div class="navyList ordercenterlist"><a href="orderCenterNew.shtml">订单中心</a> </div><!--orderList-->
    </div>
    <div class="navyList searchList"><a href="index.shtml">首页列表</a> </div>

  </div><!--头部导航-->
</template>



<script>
  export  default{
      name:'headTwo',
  }
</script>

<style scoped>
  .b_head{
    width: 100%;
    background-color:#182547 ;
    border-bottom: 1px solid #fff;
    height: 50px;
    min-width: 1200px;
  }

  .headNavy{
    width: 1200px;
    margin: 0 auto;
    padding: 0px 0px 0px 0px;
  }

  .usersName{
    float: left;
    line-height: 50px;
    font-size: 26px;
    color: #fff;
  }
  .usersName a{
    font-size: 30px;
    color: #fff;
  }

  .navyList{
    float: right;
    line-height: 32px;
    margin-top: 8px;
    color: #fff;
    font-size: 16px;
    padding: 0px 10px;
    margin-left: 25px;
    position: relative;

  }
  .navyList a{
    color: #fff;
    font-size: 16px;
  }
</style>
