<!-- 结算 -->
<template>
  <div class="main">
    <div class="topNavigation">
      <div class="images" @click="backingout">
        <img src="@/imgaes/fanhui.png">
      </div>
      <div class="title">报餐结算</div>
    </div>
    <div class="pages">
    <div class="item" v-for="(item,index) in listData" :key="index">
      <div class="title">
          <img src="../imgaes/baocanlogo.png" /><span>{{item.day}} {{item.date}}</span>
          <span class="state-font">已报餐</span>
      </div>
        <div class="detailed">
          <div class="main-li" v-for="(c, ii) in item.bcxxes" :key="ii">
          <img :src="getIcon(c.pclb)" /><span>{{c.content}}</span>
          </div>
        </div>
        <div class="money">
            小计：<span>¥ {{item.price}} 元</span>
        </div>
    </div>
    </div>
    <div class="fot">
      合计：<span class="money-font">￥{{totalPrice}} 元</span>
      <div class="fot-right" @click="gotoPay">
        提交结算
      </div>
    </div>
    <div class="loading">
      <loading :show="LoadingShow" text='支付中'></loading>
    </div>
    <div class="My_Popup">
      <mt-popup v-model="popupVisible" class="but-com" pop-transition="popup-fade" position="bottom">
        <div class="butoom">
          <div class="but_title">
            请选择支付方式
          </div>
          <div class="but_butoom" @click="WaChatPaid()">
            <div class="icon">
              <img src="@/imgaes/wachat.png">
            </div>
            <span>微信支付</span>
            <div class="min_icon">
              <img src="@/imgaes/advance.png">
            </div>
          </div>
          <div class="but_butoom" @click="balancePaid()">
            <div class="icon">
              <img src="@/imgaes/jinbi.png">
            </div>
            <span>余额支付 (剩余￥{{this.balance}})</span>
            <div class="min_icon">
              <img src="@/imgaes/advance.png">
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  let serverUrl='/baocanImg/'
  let iconArr=['','zao.png','wu.png','wan.png']
  import { MySettlement, GetPayInfo, GetYezf } from "@/api/baocan";
  import { Loading  } from 'vux'

  export default {
    data(){
      return {
        listData:[],
        totalPrice:0,
        isShow: false,
        popupVisible: false,
        balance: 0
      }
    },
    components: {
      Loading
    },
    computed: {
      // 支付前导航栏状态
      tagdata () {
        return this.$store.state.TopTagData
      },
      // 支付前选择订餐的周
      AddWeekData () {
        return this.$store.state.AddWeekData
      },
      paymentIp () {
        return this.$store.state.PaymentIp
      },
      LoadingShow () {
        return this.$store.state.LoadingShow
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
              that.balance = res.data.content.balance
            }else{
              this.$toast(res.data.message)
            }
          })
      },
      gotoPay(){
        if (!this.totalPrice) return
        // if (this.balance < this.totalPrice) {
        //     this.WaChatPaid()
        //     return
        // }
        this.popupVisible = true
      },
      // 微信支付
      WaChatPaid () {
        this.popupVisible = false
        this.$store.commit('SET_LoadingShow', true)
        GetPayInfo({
          totolFee: this.totalPrice,
          ip: this.paymentIp
        }).then(res => {
          if (res.data.success) {
            this.$store.commit('SET_LoadingShow', false)
            let url = res.data.content.mweb_Url +'&redirect_url='+ encodeURIComponent('http://mb.gaoming.gov.cn:8090/gmbc/index.html#/payment?id='+ res.data.content.jsId+ '&tagdata=' + this.tagdata + '&AddWeekData=' + this.AddWeekData)
            window.location.href=url
            return
          } else {
            this.$store.commit('SET_LoadingShow', false)
            this.$toast(res.data.message);
          }
        })
      },
      // 余额支付
      balancePaid () {
        this.popupVisible = false
        this.$store.commit('SET_LoadingShow', true)
        GetYezf ({
          TotolFee: this.totalPrice
        }).then(rps => {
          this.$store.commit('SET_LoadingShow', false)
          if (rps.data.success) {
            this.changtoast('支付成功', 2000)
            this.$router.replace({
              path: '/PaySuccess',
              query: {
                pay: this.totalPrice
              }
            })
          } else {
            this.changtoast(rps.data.message);
          }
        })
      },
      // 返回
      backingout () {
        this.$router.back(-1)
      }
    },
    created(){
      this.init()
    }
  }
</script>
<style lang='scss' scoped>
@import "@/Style/settlement.scss";
</style>