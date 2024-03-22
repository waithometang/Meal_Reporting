<template>
  <div class="main">
    <div class="top">
      <div  class="hread-img">
        <img class="portrait-img" src="../imgaes/touxiang.png"/>
        <img class="editor-img" src="../imgaes/bianji.png"/>
      </div>
      <div class="hread-font">
        <p class="name-font">张达权</p>
        <p class="time-font">本次登录：2018-10-08 10:00</p>
      </div>
      <div class="setting">
        <img src="../imgaes/set.png"/>
        设置
      </div>
    </div>
    <div class="title">
      <div class="title-left">
        <span>10</span>
        <p>本周订餐次数</p>
      </div>
      <div class="title-right">
        <span>80</span>
        <p>本周消费总额(元)</p>
      </div>
    </div>
    <div class="pages">
      <div class="title-font">
        <div></div>
        历史订餐记录
      </div>
      <div class="item">
        <div class="main-ul" v-for="(item,index) in 3" :key="index">
          <div class="main-li">
            <span class="title-font">已定早餐、午餐、晚餐</span><p class="time-font"><img src="../imgaes/time-logo.png"/> 2018-10-08  周一</p>
            <span class="monay-font">-¥ 8.00</span>
          </div>
        </div>
      </div>
      <div class="onclick">点击查看>>></div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import "../Style/query.scss";
</style>