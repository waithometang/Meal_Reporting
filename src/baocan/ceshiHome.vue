<template>
  <div class="ceshiHome">
    <div class="top">
      <div class="week">上一周</div>
      <div class="week">本周</div>
      <div class="week">下一周</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="day" v-for="(item, index) in dayData" :key="index" :class="{'actionday': index == 0}">
          {{item}}
        </div>
      </div>
      <div class="right">
        <div class="classification">
          <div class="meal">早餐</div>
          <div class="meal">午餐</div>
          <div class="meal">晚餐</div>
        </div>
        <div class="food_content">
          <div class="icon_food" v-for="(item, index) in 12" :key="index">
            <div class="icon">
              <img src="@/imgaes/ceshiHome.jpg">
            </div>
            <div class="food">
              <div class="food_name">红烧熊掌</div>
              <div class="food_number">数量：110</div>
              <div class="food_price">￥ 120</div>
            </div>
            <div class="confirm">
              确认
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dayData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    }
  }
}
</script>

<style lang='scss'>
@import '@/Style/ceshiHome.scss'
</style>
