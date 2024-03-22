<!-- 订餐历史记录 -->
<template>
  <div class="main_mian">
    <div class="hread">
      <div class="top">
        <img src="../imgaes/fanhui.png" @click="backingout"/>
        <div class="herad_title">
          <span>{{title}}历史记录</span>  
        </div>
      </div>
    </div>
    <div class="item">
      <div class="main-ul"  v-for="(item,index) in initData.items" :key="index" v-show="type <= 0">
        <div class="main-li">
          <div class="menay_name">
            <div class="item_count">已定{{item.count}}餐</div>
            <div class="item_fee">
              <div class="item_fee_icon">
                <img v-if="item.payWay == 0" src="../imgaes/wachat.png">
                <img v-else src="../imgaes/jinbi.png">
              </div>
              -¥ {{item.fee}} 元
            </div>
          </div>
          <div class="pay_time">
            <div class="pay_time_icon">
              <img src="../imgaes/time.png" alt="">
            </div>
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
      <div class="content_list" v-for="(item, index) in listData" :key="index" v-show="type > 0">
        <div class="icon_menay">
          <div class="icon_name">
            <div class="min_icon">
              <img src="../imgaes/img_02.png">
            </div>
            <div class="name"><span>{{item.cq}}({{item.pcrq}})</span></div>
          </div>
          <div class="menay">
            <span>￥{{item.je}}</span>
          </div>
        </div>
        <div class="content">
          <div class="content_icon">
            <div class="content_icon_min">
              <img src="../imgaes/can.png">
            </div>
            <div class="content_icon_title">
              <span>{{item.cpxx}}</span>
            </div>
          </div>
          <div class="content_icon">
            <div class="content_icon_min">
              <img src="../imgaes/time.png">
            </div>
            <div class="content_icon_title">
              <span>{{title}}时间: {{item.date}}</span>
            </div>
          </div>
          <div class="content_icon" v-if="item.fromRy">
            <div class="content_icon_min">
              <img src="../imgaes/img_06.png">
            </div>
            <div class="content_icon_title">
              <span>{{fromName}}人: {{item.fromRy}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="nodeData" v-if="initData.length == 0 && this.type <= 0">
        暂无数据
      </div>
      <div class="nodeData" v-if="listData.length == 0 && this.type >= 1">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import { MyHistoryOfMonth, Getcqtj } from  '@/api/baocan'
export default {
  data () {
    return {
      date:'',
      initData:[],
      listData: [],
    }
  },
  computed: {
    addYears () {
      return this.$route.query.addYears
    },
    month () {
      return this.$route.query.month
    },
    type () {
      return this.$route.query.type
    },
    title () {
      switch (this.type) {
        case 1:
          return '取消'
          break;
        case 2:
          return '分享'
          break;
        case 3:
          return '领餐'
          break;
        case 0:
          return '订餐'
          break;
        case -1:
          return '消费'
          break;
        default:
          break;
      }
    },
    fromName () {
      switch (this.type) {
        case 2:
          return '领餐'
          break;
        case 3:
          return '分享'
          break;
        default:
          break;
      }
    }  
  },
  methods: {
    backingout () {
      this.$router.go(-1)
    },
    _GetMyHistoryOfMonth () {
      MyHistoryOfMonth ({
        addYears: this.addYears,
        month: this.month
      }).then (rps => {
        if (rps.data.success) {
          this.initData = rps.data.content
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    _Getcqtj () {
      Getcqtj ({
        AddYears: this.addYears,
        Month: this.month,
        lb: this.type
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message)
        }
      })
    } 
  },
  created () {
    if (this.type <= 0) {
      this._GetMyHistoryOfMonth()
    } else {
      this._Getcqtj()
    }
  }
}
</script>


<style lang='scss' scoped>
@import "@/Style/history.scss";
</style>