<template>
  <div class="main">
    <ul class="t-main-ul">
      <li class="t-main-li" @click="SwitchoverBottomTag(1)">
        <img :src="BottomTagType != 1 ?  baocan_c : baocan_d "/>
        <span :class="{'corl-cun': BottomTagType == 1}">报餐</span> 
      </li>
      <li class="t-main-li" @click="SwitchoverBottomTag(2)">
          <img :src="BottomTagType != 2 ?  qucan_c : qucan_d "/>
         <span :class="{'corl-cun': BottomTagType == 2}">取餐</span>
      </li>
      <li class="t-main-li" @click="SwitchoverBottomTag(3)">
          <img :src="BottomTagType != 3 ?  dianping_c : dianping_d "/>
         <span :class="{'corl-cun': BottomTagType == 3}">点评</span>
      </li>
      <li class="t-main-li" @click="SwitchoverBottomTag(4)">
        <img :src="BottomTagType != 4 ?  chaxun_c : chaxun_d "/>
         <span :class="{'corl-cun': BottomTagType == 4}">我的</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:['index'],
  data () {
    return {
      baocan_c: require('@/imgaes/baocan-c.png'),
      baocan_d: require('@/imgaes/baocan-d.png'),
      dianping_c: require('@/imgaes/dianping-c.png'),
      dianping_d: require('@/imgaes/dianping-d.png'),
      chaxun_c: require('@/imgaes/chaxun-c.png'),
      chaxun_d: require('@/imgaes/chaxun-d.png'),
      qucan_c: require('@/imgaes/qucan-c.png'),
      qucan_d: require('@/imgaes/qucan-d.png'),
    }
  },
  computed: {
    BottomTagType () {
      return this.$store.state.BottomTagType
    }
  },
  methods: {
    SwitchoverBottomTag (item) {
      this.$store.commit('SET_BottomTagType', item)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../Style/bottom-tag.scss";
</style>