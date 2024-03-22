<template>
  <div class="main">
    <div class="hread">
      <div class="top"><img src="../imgaes/fanhui.png"/>历史订餐记录</div>
      <div class="time">
        <span class="title-font">请选择时间</span>
        <div class="choose">
          <span class="run-time">2018-09-08</span>
          <img class="right-img" src="../imgaes/img_05.png"/>
          <span class="stop-time">2018-10-08</span>
          <div> <img class="sousuo-img" src="../imgaes/sousuo.png"/></div> 
        </div>
      </div>
    </div>
    <div class="item">
      <div class="main-ul" v-for="(item,index) in 32" :key="index">
        <div class="main-li">
          <span class="title-font">已定早餐、午餐、晚餐</span><p class="time-font"><img src="../imgaes/time-logo.png"/> 2018-10-08  周一</p>
          <span class="monay-font">-¥ 8.00</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import "../Style/history.scss";
</style>