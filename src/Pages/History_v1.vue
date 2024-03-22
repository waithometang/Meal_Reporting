<template>
  <div class="history">
    <HreadStatusBar :GMBC_isShow="false" :GMBC_title="GMBC_title" :GMBC_backtracktype="true"></HreadStatusBar>
    <div class="history-content">
      <div class="list" v-for="(item, index) in listData" :key="index" v-if="listData.length > 0">
        <div class="list-icon">
          <img src="@/imgaes/img_02.png" alt="">
        </div>
        <div class="list-content">
          <div class="cancel-list">
            <div class="cancel-list-li">
              <div class="time-price">
                <div class="time" v-if="type <= 0">已定{{item.count}}餐</div>
                <div class="time" v-else>{{item.cq}}({{item.date}})</div>
                <div class="price">
                  <div class="price-icon" v-if="type <= 0">
                    <img v-if="item.payWay ==0" src="@/imgaes/wachat.png" alt="">
                    <img v-else src="@/imgaes/jinbi.png" alt="">
                  </div>
                  <div class="money">￥ {{item.fee || item.je}}</div>
                </div>
              </div>
              <div class="icon-title" v-if="type > 0">
                <div class="icon">
                  <img src="@/imgaes/can.png">
                </div>
                <div class="title">{{item.cpxx}}</div>
              </div>
              <div class="icon-title">
                <div class="icon">
                  <img src="@/imgaes/time.png">
                </div>
                <div class="title" v-if="type <= 0">{{item.date}}</div>
                <div class="title" v-else>{{title}}时间: {{item.date}}</div>
              </div>
              <div class="icon-title" v-if="type > 0 && item.fromRy">
                <div class="icon">
                  <img src="@/imgaes/img_06.png">
                </div>
                <div class="title">{{fromName}}人: {{item.fromRy}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="net-data" v-if="listData.length == 0">暂无数据</div>
    </div>
  </div>
</template>

<script>
import HreadStatusBar from './HreadStatusBar'
import { MyHistoryOfMonth, Getcqtj } from  '@/api/baocan'

export default {
  components: {
    HreadStatusBar
  },
  data () {
    return {
      listData: []
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
    GMBC_title () {
      switch (this.type) {
        case 1:
          return '取消历史记录'
          break;
        case 2:
          return '分享历史记录'
          break;
        case 3:
          return '领餐历史记录'
          break;
        case 0:
          return '订餐历史记录'
          break;
        case -1:
          return '消费历史记录'
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
    /** 订餐 消费 历史记录 */
    _GetMyHistoryOfMonth () {
      MyHistoryOfMonth ({
        addYears: this.addYears,
        month: this.month
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content.items
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    /** 分享 取消 领取 历史记录 */
    _Getcqtj () {
      Getcqtj ({
        AddYears: this.addYears,
        Month: this.month,
        lb: this.type
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
          console.log(this.listData.length)
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

<style lang="scss" type="text/css" scoped>
@import '@/Style/History_v1.scss';
</style>


