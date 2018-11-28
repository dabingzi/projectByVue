
<template>
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
        <div class="listone showanymore" style="width: 39px;"><img src="../../images/blacksjs.png" class="anymore" index="0"></div>
    </div>
</template>


<script>

export default {
        name:'navyList',
        props:['todo'],

}
</script>