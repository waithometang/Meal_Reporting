<template>
  <div class="TakeFoodDetails">
    <div class="head">
      <div class="icon" @click="backingout">
        <img src="@/imgaes/fanhui.png">
      </div>
      <div class="title">
        取餐详情
      </div>
    </div>
    <div class="content">
      <div class="picture">
        <img src="@/imgaes/TakeFoodSuccess.png">
      </div>
      <div class="tips">
        <div class="Success">取餐成功</div>
        <div class="stateTips">服务人员正在为你配餐，请稍候...</div>
      </div>
      <div class="button-fail"  @click="backingout">
        返回取餐
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    iscontent () {
      return this.$route.query.iscontent
    }
  },
  created () {
    if (this.iscontent == 'true') {
      this.Success = '取餐成功'
      this.stateTips = '服务人员正在为你配餐，请稍候...'
    } else {
      this.Success = '取餐失败'
      this.stateTips = '请重新展示取餐二维码进行扫码取餐'
    }
  },
  methods: {
    backingout () {
      this.$store.commit('SET_BottomTagType', 2)
      this.$router.push({
        path:'/home',
      })
    }
  }
}
</script>

<style lang='scss'>
@import '@/Style/TakeFoodDetails.scss';
</style>
