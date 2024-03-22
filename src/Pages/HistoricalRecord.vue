<template>
  <div class="HistoricalRecord">
    <div class="FoodList">
      <div class="SelectDate">
          <div class="Week" :class="{'GMBC_action': switchoverWeekData == 1}" @click="switchoverWeek(1)" @touchstart='touchstart(1)' @touchend='touchend(false)'>
            <div class="icon-left"><img :src="switchoverWeekData != 1 ? left_c : left_d "></div>
            上一年
          </div>
          <div class="Week GMBC_middle" :class="{'GMBC_action': switchoverWeekData == 2}" @click="switchoverWeek(2)" @touchstart='touchstart(2)' @touchend='touchend(false)'>
            今年
          </div>
          <div class="Week" :class="{'GMBC_action': switchoverWeekData == 3}" @click="switchoverWeek(3)" @touchstart='touchstart(3)' @touchend='touchend(false)'>
            <div class="Week-text">
                下一年
            </div>
            <div class="icon-right"><img :src="switchoverWeekData != 3 ? right_c : right_d "></div>
          </div>
      </div>
      <div class="content" v-if="listData.length > 0">
        <div class="content_list" v-for="(item, index) in listData"  :key="index">
          <div class="WeekMeals">
            <div class="week_icon">
              <img src="../imgaes/img_02.png"> 
              <span>{{item.month}}月</span>
            </div>
            <!-- <div class="week_meny">
              总消费￥<span>{{item.fee}}</span> 元
            </div> -->
          </div>
          <div class="list">
            <div class="list_li" @click="viewMonth(item.month, 0)">
              <div class="name color_1">订餐</div>
              <div class="li_meny">{{item.times}}次</div>
            </div>
            <div class="list_li" @click="viewMonth(item.month, 1)">
              <div class="name color_2">取消</div>
              <div class="li_meny">{{item.qxcq}}次</div>
            </div>
            <div class="list_li" @click="viewMonth(item.month, 2)">
              <div class="name color_3">分享</div>
              <div class="li_meny">{{item.fxcq}}次</div>
            </div>
            <div class="list_li" @click="viewMonth(item.month, 3)">
              <div class="name color_1">领餐</div>
              <div class="li_meny">{{item.lqcq}}次</div>
            </div>
            <div class="list_li" @click="viewMonth(item.month, -1)">
              <div class="name color_2">消费</div>
              <div class="li_meny">{{item.fee}}元</div>
            </div>
          </div>
        </div>
      </div>
      <div class="notData" v-if="false">
        暂无支付信息
      </div>
    </div>
  </div>
</template>

<script>
import { ConsumeRecord } from '@/api/baocan'

export default {
  data () {
    return {
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
      switchoverWeekData: 2,
      listData: '',
      addYears:0,
      showbuttom: false,
      initData: 0,
    }
  },
  methods: {
    // 顶部导航点击按下状态
    touchstart (type) {
      this.initData = type
      this.showbuttom = true
    },
    // 顶部导航点击松开状态
    touchend (bollem) {
      this.showbuttom = bollem
    },
    // 导航栏点击事件
    switchoverWeek (item) {
      if(item===1) this.addYears--
      else if(item===2) this.addYears=0
      else this.addYears++
      this.getData()
      this.switchoverWeekData = item
    },
    // 请求api获取数据列表
    getData(){
      let that=this
      ConsumeRecord({AddYear:this.addYears})
        .then(res=>{
          if(res.data.success){
            if(this.addYears===0)
              that.$emit('onDataChange',{times:res.data.content.times,totalFee:res.data.content.fee,balance: res.data.content.balance})
            this.listData=res.data.content.items
            console.log(this.listData)
          }else{
            this.changtoast(res.data.message)
          }
        })
    },
    // 查看列表详情
    viewMonth(month, type){
      this.$router.push({
        path:'/History',
        query:{
          addYears: this.addYears,
          month: month,
          type: type
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang='scss'>
@import "@/Style/HistoricalRecord.scss";
</style>
