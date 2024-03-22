<template>
  <div class="main">
    <!-- 头部 -->
    <div class="hread">
      <div class="top"><img src="../imgaes/fanhui.png" @click="backingout">支付详情</div>
    </div>
    <!-- 支付失败 -->
    <div class="failed" v-if="isfailed">
      <div class="img-fa"><img src="@/imgaes/paymentfailed.png"></div>
      <div class="font-fa">
        <span>等待支付结果</span>
        <p>请等待支付结果</p>
      </div>
      <div class="but-fa" @click="goto">
        <div>返回报餐</div>
      </div>
    </div>
    <!-- 支付成功 -->
    <div class="success" v-if="issuccess">
      <div class="title"><img src="@/imgaes/paymentsuccess.png">订单支付成功</div>
      <div class="pages">
        <ul class="main-ul">
          <li class="main-li-title">
            <span class="title-font">订单信息</span>
          </li>
          <li class="main-li">
            <div class="font-name">支付方式</div>
            <div class="font-page">微信支付</div>
          </li>
          <li class="main-li">
            <div class="font-name">订单金额</div>
            <div class="font-page">￥{{TotalFee}}</div>
          </li>
          <li class="main-li">
            <div class="font-name">支付时间</div>
            <div class="font-page">{{time}}</div>
          </li>
        </ul>
      </div>
      <div class="but">
        <div class="return" @click="goto">返回报餐</div>
        <!-- <div class="examine">查看订单</div> -->
      </div>
    </div>
    <loading :show='!iisShows' text='加载中...'></loading>
    <div class="tishi" v-if="isTips">
      <div class="promptBox">
        <div class="title">请确认微信支付是否已完成</div>
        <div class="confirm" @click="confirm"> 已完成支付 </div>
        <div class="cancel" @click="cancel">支付遇到问题，重新支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import {QueryJsxx} from '@/api/baocan'
import { Loading  } from 'vux'

export default {
  data () {
    return {
      isfailed: false,
      issuccess: false,
      time: '',
      TotalFee: '',
      index: 1,
      iisShows: false,
      isTips: false
    }
  }, 
  components: {
    Loading
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    tagdata () {
      return this.$route.query.tagdata
    },
    AddWeekData () {
      return this.$route.query.AddWeekData
    },
  },
  mounted () {
    this._QueryJsxx()
  },
  methods: {
    /** 
     * 每隔1.5秒请求三次
     * 返回 true 跳出，
     * 连续三次false
     * 弹出支付确认提示
     * 再次查询，返回为false显示失败，返回true显示成功
    */
    _QueryJsxx () {
      QueryJsxx ({
        id: this.id
      }).then(rps => {
        if (rps.data.content) {
          this.time = rps.data.content.time
          this.TotalFee = rps.data.content.totalFee
          if (rps.data.content.isPay == true) {
            this.issuccess = true
            this.iisShows = true
          } else {
            if (this.index > 4) {
              this.iisShows = true
              this.isfailed = true
              this.index++
            } else {
              if (this.index > 3) {
                this.iisShows = true
                this.isTips = true
              } else {
                setTimeout(() => {
                  this._QueryJsxx()
                }, 1500);
              }
              this.index++
            }
          }
        } else {
          this.iisShows = true
          this.changtoast(rps.data.message)
        }
      })
    },
    /** 
     * 返回首页订餐
     * isblock: 已登录用户，ismboa：一级页面顶部导航栏，tagdata：支付前选择的周，AddWeekData：支付前报餐的周
    */
    goto () {
      this.$router.push({
        path:'/home',
        query: {
          isblock: true,
          tagdata: this.tagdata,
          AddWeekData: this.AddWeekData
        }
      })
    },
    /** 
     * 返回首页报餐
    */
    backingout () {
      this.goto()
    },
    /** 
     * 已完成支付，查询支付结果
    */
    confirm () {
      this.iisShows = false
      this.isTips = false
      this._QueryJsxx()
    },
    /** 
     * 未完成支付， 返回首页报餐
    */
    cancel () {
      this.goto()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../Style/payment.scss";
</style>