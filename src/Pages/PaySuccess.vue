<template>
  <div class="PaySuccess">
    <div class="icon">
      <img src="@/imgaes/icon_123.png" alt="">
      <p>支付成功</p>
    </div>
    <div class="number">
      ￥ <span>{{totalPrice}}</span>
    </div>
    <div class="but" @click="block">
      <span>完成</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalPrice () {
      return this.$route.query.pay
    },
  },
  methods: {
    block () {
      if (sessionStorage.getItem('key') === 2) {
        this.$store.commit('SET_BottomTagType', 2)
        sessionStorage.removeItem('key')
      }
      this.$router.replace({
        path: '/home',
        query: {
          isblock: true
        }
      })
    }
  },
  created () {
    if (!this.totalPrice) {
      this.block()
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
.PaySuccess {
  position: relative;
  height: 100vh;
  background: #ffffff;
  .icon{
    margin: 0 auto;
    padding-top: 100px;
    width: 750px;
    text-align: center;
    img{
      height: 70px;
      width: 80px;
    }
    p{
      margin: 0;
      color: rgb(27, 189, 27);
    }
  }
  .number {
    height: auto;
    padding-top: 100px;
    font-size: 40px;
    color: black;
    display: flex;
    justify-content: center;
    font-weight: bold;
    span{
      font-size: 70px;
    }
  }
  .but{
    height: 60px;
    width: 300px;
    border: 2px solid ;
    border-color: #93D6B8;
    background: #ffffff;
    border-radius: 10px;
    color: black;
    font-size: 36px;
    text-align: center;
    position: absolute;
    bottom: 100px;
    left: 225px;
    span{
      display: inline-block;
      height: auto;
      padding: 6px 0;
    }
  }
}
</style>
