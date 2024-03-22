<!-- 首页 -->
<template>
  <div class="main">
    <!-- 报餐模块 -->
    <order-food ref="orderfoodRef" v-if="BottomTagType == 1"></order-food>
    <!-- <order v-if="BottomTagType == 1"></order> -->
    <!-- 取餐模块 -->
    <take-food ref="takefoodRef" v-if="BottomTagType == 2"></take-food>
    <!-- 点评模块 -->
    <remark-on v-if="BottomTagType == 3"></remark-on>
    <!-- 查询模块 -->
    <inquire v-if="BottomTagType == 4"></inquire>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>
<script>
// import bottom from "@/baocan/bottom-tag"
import bottom from './BottomTab'
import OrderFood from './OrderFood_v2'
import order from '@/baocan/order'
import TakeFood from './TakeFood_v2'
import RemarkOn from './RemarkOn_v1'
import Inquire from './Inquire'
import { storage, GetToken } from '@/common/js/until'
import { Swiper, SwiperItem } from 'vux'
import aXios from 'axios'

export default {
  components: {
    bottom,
    order,
    TakeFood,
    RemarkOn,
    Inquire,
    OrderFood,
    Swiper,
    SwiperItem
  },
  computed: {
    BottomTagType() {
      return this.$store.state.BottomTagType
    },
    longData() {
      return storage.fetch('longData').data
    }
  },
  data() {
    return {
      isPopup: false,
      bcData: {},
      addWeek: 0,
      initFotFlag: 0 //计划表监听此变量以获取新数据
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from.name)
    next(vm => {
      if (from.path === '/') return
      if (vm.BottomTagType == 1) {
        vm.$refs.orderfoodRef._GetMyReport()
      } else if (vm.BottomTagType == 2) {
        //如果从取餐结算页面过来，则更新取餐数据
        if (from.name == 'Unclaimed' || from.name == 'TakeFoodDetails') {
          vm.$refs.takefoodRef.init()
        }
      }
    })
  },
  created() {
    this._GetIp()
  },
  methods: {
    fotClick(data) {
      this.isPopup = true
      this.bcData = data
    },
    saveDone() {
      this.initFotFlag++
    },
    updateAddWeek(isAdd) {
      if (isAdd) this.addWeek++
      else this.addWeek--
    },
    // 获取ip
    _GetIp() {
      if (!this.$store.state.PaymentIp)
        aXios.post('https://ip.znzwoa.com/').then(rps => {
          console.log(rps)
          this.$store.commit('SET_PaymentIp', rps.data)
        })
    }
  }
}
</script>
<style lang='scss'>
</style>
