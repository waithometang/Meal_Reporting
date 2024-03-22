<!-- 查询 -->
<template>
  <div class="main">
    <div class="top">
      <div  class="hread-img">
        <img class="portrait-img" src="../imgaes/touxiang.png"/>
        <img class="editor-img" src="../imgaes/bianji.png"/>
      </div>
      <div class="hread-font">
        <p class="name-font">{{name}}</p>
        <p class="time-font">本次登录：{{loginTime}}</p>
      </div>
      <!-- <div class="setting">
        <img src="../imgaes/set.png"/>
        设置
      </div> -->
    </div>
    <div class="title">
      <div class="title-left">
        <span>{{times}}</span>
        <p>本月订餐次数</p>
      </div>
      <div class="title-right">
        <span>{{totalFee}}</span>
        <p>本月消费总额(元)</p>
      </div>
      <div class="title-right">
        <span>{{balance}}</span>
        <p>我的余额(元)</p>
      </div>
    </div>
    <historical-record @onDataChange="dataChange"></historical-record>
  </div>
</template>

<script>
import HistoricalRecord  from  '@/Pages/HistoricalRecord'

export default {
  data(){
    return {
      times:0,
      totalFee:0,
      balance: 0
    }
  },
  computed:{
    name(){
      return this.$store.state.loginname
    },
    loginTime(){
      return this.$store.state.logintime
    }
  },
  components: {
    HistoricalRecord
  },
  methods:{
    dataChange(obj){
      this.times=obj.times
      this.totalFee=obj.totalFee
      console.log(obj)
      this.balance = obj.balance
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/Style/query.scss";
</style>