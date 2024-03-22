<template>
  <div class="main">
    <div class="top">报餐结算</div>
    <div class="pages">
    <div class="item" v-for="(item,index) in listData" :key="index">
      <div class="title">
          <img src="../imgaes/baocanlogo.png" /><span>{{item.day}} {{item.date}}</span>
          <span class="state-font">已报餐</span>
      </div>
        <div class="detailed">
          <div class="main-li" v-for="(c, ii) in item.bcxxes" :key="ii">
          <img :src="getIcon(c.pclb)" /><span>{{c.content}}</span>
          <!-- <span class="money-font">$3</span> -->
          </div>
        </div>
        <div class="money">
            小计：<span>¥ {{item.price}}</span>
        </div>
    </div>
    </div>
    <div class="fot">
      合计：<span class="money-font">￥{{totalPrice}}</span>
      <div class="fot-right" @click="gotoPay">
        提交结算
      </div>
    </div>
  </div>
</template>
<script>
  let serverUrl='/baocanImg/'
  let iconArr=['','zao.png','wu.png','wan.png']
  import { MySettlement,PayTest } from '@/api/baocan'
  export default {
    data(){
      return {
        listData:[],
        totalPrice:0
      }
    },
    methods:{
      getIcon(pclb){ //早午晚icon
        return serverUrl+iconArr[pclb]
      },
      init(){
        let that=this
        MySettlement({})
          .then(res=>{
            if(res.data.success){
              that.listData=res.data.content.settlements
              that.totalPrice=res.data.content.price
            }else{
              this.changtoast(res.data.message)
            }
          })
      },
      gotoPay(){
        if(!this.totalPrice) return;
        let that=this
        PayTest({price:this.totalPrice})
          .then(res=>{
            if(res.data.success){
              that.$router.back(-1)
            }else{
              this.changtoast(res.data.message)
            }
          })
      }
    },
    created(){
      this.init()
    }
  }
</script>
<style lang='scss' scoped>
@import "../Style/settlement.scss";
</style>