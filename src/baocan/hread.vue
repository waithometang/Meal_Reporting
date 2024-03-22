<template>
<div class="main">
<div class="hread-title">高明区政府智慧饭堂</div>
<div class="hread-img"></div>
<div class="main-tab">
  <span class="main-font-left" @click="preWeek"><img src="../imgaes/left-c.png"/>上一周</span>
  <span class="main-font-title">本周</span>
  <span class="main-font-right" @click="nextWeek">下一周<img src="../imgaes/right-c.png"/></span>
</div>
<div class="main-title"><img  src="../imgaes/baocanlogo.png"/>我的报餐</div>
</div>
  
</template>
<script>
  export default {
    methods:{
      preWeek(){
        this.$emit('onUpdateAddWeek',false)
      },
      nextWeek(){
        this.$emit('onUpdateAddWeek',true)
      }
    }
  }
</script>
<style lang='scss' scoped>
@import "../Style/hread.scss";
</style>
