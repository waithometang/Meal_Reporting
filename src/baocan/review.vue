<template>
  <div class="main">
    <div class="hread">
       <div class="top">高明区政府智慧饭堂</div>
        <div class="main-tab">
          <span class="main-font-left"><img src="../imgaes/left-c.png"/>上一周</span>
          <span class="main-font-title">本周</span>
          <span class="main-font-right">下一周<img src="../imgaes/right-c.png"/></span>
        </div>
    </div>
    <lastweek></lastweek>
  </div>
</template>
<script>
import thisweek from "@/baocan/thisweek"
import lastweek from "@/baocan/lastweek"
export default {
  components: {
    thisweek,
    lastweek
  }
}
</script>


<style lang='scss' scoped>
@import "../Style/review.scss";
</style>