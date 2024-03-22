<template>
  <div class="TakeFood">
    <HreadStatusBar @GMBC_advance="advance" @GMBC_current="current" @GMBC_retreat="retreat"></HreadStatusBar>
    <div class="TakeFoodList" v-if="listData">
      <div class="main-title" v-if="listData.items.length > 0">
        <img src="../imgaes/baocanlogo.png"/> {{listData.day}} {{listData.date}}
      </div>
      <div class="list" v-for="(item, index) in listData.items" :key="index" v-show="listData.items.length > 0">
        <div class="haveContent">
          <div class="content">
            <div class="type">
              <div class="icon">
                <img :src="breakfast">
              </div>
              <div class="meal">{{item.mealName}}</div>
              <div class="price">￥ {{item.price}}.00</div>
            </div>
            <div class="name">
              <div class="name_icons">
                <img :src="can">
              </div>
              <div class="text">
              {{item.content ? item.content : '未报餐'}}
              </div>
            </div>
            <div class="time">
              <div class="time_icon">
                <img :src="wancan">
              </div>
              <div class="time_text">
                取餐时间：{{item.kcsj}} - {{item.jcsj}}
              </div>
            </div>
          </div>
          <div class="buttom">
            <div class="yes" @click="TackFood(item)" v-if="item.takeStatus === 2 || item.takeStatus === 1"><span>{{item.takeStatus === 1 ? '立即取餐' : '等待开餐'}}</span></div>
            <div class="yes share" v-if="item.takeStatus === 2 || item.takeStatus === 1" @click="setindex(item)"> <span>分享</span> </div>
            <div class="yes take" v-if="item.takeStatus === 4 || item.takeStatus ===5" @click="Unclaimed(item)"> <span>领餐</span></div>
            <div class="none" v-if="item.takeStatus === 0 || item.takeStatus === 3">
              <img :src="item.takeStatus === 0 ? yiqucan : nottake">
            </div>
          </div>
        </div>
      </div>
      <div class="notData" v-show="listData.items.length <= 0">
       {{listData.date}} 暂无取餐信息
      </div>
      <div :class="{'hide':index == 2}" class="my_popup" >
        <div class="share_Buttom" @click="appointShara()">
          分享给指定的人
        </div>
        <div class="share_Buttom" @click="entireShara()">
          一键分享
        </div>
        <div class="share_Buttom" @click="quexiao()">
          取消
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="alert" v-if="closealertv">
        <div>
          <div class="img-mian">
            <img src="@/imgaes/img_01.png">
            <p>分享成功</p>
          </div>
          <div class="close" @click="close">
            <img src="@/imgaes/close.png">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HreadStatusBar from './HreadStatusBar'
import { MyTakeMeal, GetToAll, DeleteOneReport } from '@/api/baocan'
import { storage } from '@/common/js/until'
import { MessageBox } from 'mint-ui';

export default {
  components: {
    HreadStatusBar,
  },
  data () {
    return {
      breakfast: require('@/imgaes/breakfast.png'),
      can: require('@/imgaes/can.png'),
      wancan: require('@/imgaes/wancan.png'),
      yiqucan: require('@/imgaes/yiqucan.png'),
      nottake: require('@/imgaes/nottake.png'),
      index: 2,
      GMBC_listData: {middle:'今天' , left: '上一天', right: '下一天'},
      addDay: 0,
      listData: '',
      klcryid: '',
      sharaId: '',
      closealertv: false
    }
  },
  methods: {
    // 分享
    setindex (item) {
      this.klcryid = item.pcid
      this.sharaId = item.id
      if (this.index === 1) {
        this.index = 2
      } else {
        this.index = 1
      }
    },
    Unclaimed(item){
      if (item.takeStatus == 5) {
        MessageBox({
          title: '提示',
          message: '你有未支付订单是否取消?',
          showCancelButton: true,
          cancelButtonClass:'cancelButton',
          confirmButtonClass:'confirmButton',
        }).then (
          actions =>{
            if (actions == 'confirm') {
              DeleteOneReport ({
                id: item.id
              }).then (rps => {
                if (rps.data.success) {
                  this.$toast('取消成功')
                  this.$router.push({
                    path: '/Unclaimed',
                    query: {
                      id: item.pcid
                    }
                  })
                } else {
                  this.$toast(rps.data.message)
                }
              })
            } else {
              console.log('取消')
            }
          }
        )
        return
      }
      this.$router.push({
        path: '/Unclaimed',
        query: {
          id: item.pcid
        }
      })
    },
    quexiao () {
      this.index = 2
    },
    GetMyTakeMeal () {
      MyTakeMeal ({
        addDay: this.addDay
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    advance (item) {
      this.addDay--
      this.GetMyTakeMeal()
    },
    retreat (item) {
      this.addDay++
      this.GetMyTakeMeal()
    },
    current (item) {
      console.log(item)
      this.addDay = 0
      this.GetMyTakeMeal()
    },
    // 分享给指定的
    appointShara () {
      this.$router.push({
        path: '/SelectContact',
        query: {
          id: this.klcryid,
          sharaId: this.sharaId
        }
      })
    },
    // 一键
    entireShara () {
      this.index = 2
      MessageBox ({
        title: '提示',
        message: '确认一键分享?',
        showCancelButton: true,
        cancelButtonClass:'cancelButton',
        confirmButtonClass:'confirmButton',
      }).then (actions => {
        if (actions == 'confirm') {
          GetToAll ({
            id: this.sharaId
          }).then (rps => {
            if (rps.data.success) {
              this.$toast('分享成功')
              this.closealertv = true
            } else {
              this.$toast(rps.data.message)
            }
          })
        }
      })
    },
    TackFood (item) {
      if (item.takeStatus == 1) {
        this.$router.push({
          path: '/TakeFoodCode',
          query: {
            code: item.takeCode,
            id: item.id
          }
        })
      }
    },
    close () {
      this.closealertv = false
      this.$store.commit('SET_BottomTagType', 1)
    },
  },
  created () {
    this.GetMyTakeMeal()
  }
}
</script>

<style lang='scss' scoped>
@import '@/Style/TakeFood_v1.scss';
</style>
