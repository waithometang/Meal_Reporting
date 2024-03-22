<!-- 报餐模块 -->
<template>
  <div class="OrderFood" :class="{ action: logoIsmboa }">
    <HreadStatusBar
      :GMBC_Show_title="!logoIsmboa"
      :GMBC_type="GMBC_type"
      @GMBC_advance="advance"
      @GMBC_current="current"
      @GMBC_retreat="retreat"
    ></HreadStatusBar>
    <div class="FoodList">
      <div class="content">
        <div
          class="list-conetnt"
          :class="{ 'list-content-over': items.isOver }"
          v-for="(items, indexs) in iniData"
          :key="indexs"
        >
          <div class="week">
            <div class="week-icon"></div>
            <div class="week-content">
              <div class="content-top">{{ items.day }}</div>
              <div class="content-bottom">({{ items.date }})</div>
            </div>
          </div>
          <div class="mea">
            <div
              class="mea-li"
              v-for="(item, index) in items.baocan"
              @click="predetermine(item, items, index, indexs)"
              :key="index"
            >
              <div
                class="mea-li-top"
                :class="{ 'StaleDated-color': items.isOver }"
                v-if="item.schedule_id != 0"
              >
                {{ mealsData[index] }}
              </div>
              <div
                class="mea-li-bottom"
                :class="{
                  notpayment:
                    (item.qczt === 1 ||
                      item.qczt == 3 ||
                      item.qczt == 4 ||
                      item.qczt == 5) &&
                    !item.isOver,
                  'acton-color': item.qczt === 2 && !item.isOver,
                  'StaleDated-color': item.isOver
                }"
                v-if="item.schedule_id != 0"
              >
                {{ getState(item) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttom" :class="{ gray: notPayCount == 0 }" @click="onbuttom">
        已报 {{ notPayCount }} 餐，去结算
      </div>
    </div>
    <mt-popup
      :isShow="isShow"
      :ShowData="ShowData"
      @ChangeIsshow="ChangesState"
      @RefreshData="_GetMyReport"
    ></mt-popup>
  </div>
</template>

<script>
import { GetMyReport, Login } from '@/api/baocan'
import MtPopup from '@/Pages/MtPopup_v1'
import NavigationBar from '@/Pages/NavigationBar'
import { storage } from '@/common/js/until'
import HreadStatusBar from './HreadStatusBar'
import { debug } from 'util'
import md5 from 'js-md5'

export default {
  data() {
    return {
      GMBC_type: 0,
      showbuttom: false,
      showLi: false,
      typeindex: 0,
      typeindexs: 0,
      iniData: [], // 每周排餐情况
      notPayCount: 0, // 是否有未结算
      // addWeek: 0, // 选择那周
      isShow: false, // 是否显示控件
      ShowData: '', // 控件需要的参数
      mealsData: ['早餐', '中餐', '晚餐'],
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
      corls: 0
    }
  },
  components: {
    MtPopup,
    NavigationBar,
    HreadStatusBar
  },
  computed: {
    addWeek: {
      get() {
        return this.$store.state.OrderFood_AddWeeks
      },
      set(val) {
        this.$store.state.OrderFood_AddWeeks = val
      }
    },
    account() {
      return this.$route.query.user
    },
    pwd() {
      return this.$route.query.pwd
    },
    isblock() {
      return this.$route.query.isblock
    },
    ismboa() {
      return this.$route.query.ismboa
    },
    logoIsmboa() {
      return storage.fetch('logoIsmboa').data
    }
  },
  created() {
    // 周五时自动跳转下一周
    var mydate = new Date()
    var myddy = mydate.getDay()
    if (myddy == 6) {
      // 如果为周五直接显示下一周
      this.addWeek = 1
      this.GMBC_type = 1
    }
    // 记录是否是oa进入
    if (this.ismboa) {
      storage.save('logoIsmboa', this.ismboa)
    }
    // 是否需要自动登录
    if (!this.isblock) {
      if (!this.account || !this.pwd) {
        this.$router.push({
          path: '/Login'
        })
      } else {
        this.login()
      }
    } else {
      this._GetMyReport()
    }
  },
  methods: {
    // 顶部导航点击按下状态
    touchstart(type) {
      this.corls = type
      this.showbuttom = true
    },
    // 顶部导航点击松开状态
    touchend(bollem) {
      this.showbuttom = bollem
    },
    // 选择报餐 点击按下状态
    touchstart_Li(index, indexs, item, boolem) {
      if (item.schedule_id == 0) {
        return
      }
      this.typeindex = index
      this.typeindexs = indexs
      this.showLi = boolem
    },
    // 选择报餐 点击松开状态
    touchend_Li(boolem) {
      this.showLi = boolem
    },
    // 顶部导航栏点击事件
    advance(item) {
      this.addWeek--
      this.GMBC_type = item
      this._GetMyReport()
    },
    retreat(item) {
      this.addWeek++
      this.GMBC_type = item
      this._GetMyReport()
    },
    current(item) {
      this.addWeek = 0
      this.GMBC_type = item
      this._GetMyReport()
    },
    // 请求api获取排餐列表
    _GetMyReport() {
      this.iniData = []
      GetMyReport({
        addWeek: this.addWeek
      }).then(rps => {
        if (rps.data.success) {
          this.iniData = rps.data.content.items
          this.notPayCount = rps.data.content.notPayCount
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    // 获取用户Token
    login() {
      // storage.remove('token')
      let that = this
      let encryptedPassword = md5(this.pwd)
      Login({
        Account: this.account,
        Password: encryptedPassword
      }).then(res => {
        if (res.data.success) {
          storage.save('token', res.data.content.token)
          that.$store.commit('SET_LOGINNAME', res.data.content.name)
          that.$store.commit('SET_LOGINTIME', res.data.content.time)
          this._GetMyReport()
        } else {
          this.changtoast(res.data.message)
          this.$router.push({
            path: '/Login'
          })
        }
      })
    },
    predetermine(item, items, index, indexs) {
      this.typeindex = index
      this.typeindexs = indexs
      if (item.schedule_id === 0) {
        this.changtoast('当天未排餐')
        return
      }
      if (item.qczt === 0 && item.isOver) {
        this.changtoast('当天未报餐')
        return
      }
      this.ShowData = item
      this.isShow = true
    },
    getState(bc) {
      // 未报餐 = 0, 未支付 = 1, 未取餐 = 2, 已分享 = 3, 分享中 = 4, 已取消 = 5, 已取餐 = 6, 已领餐= 7
      switch (bc.qczt) {
        case 0:
          return ''
          break
        case 1:
          return '未支付'
          break
        case 2:
          return '已报餐'
          break
        case 3:
        case 4:
          return '已分享'
          break
        case 5:
          return '已取消'
          break
        case 6:
          return '已取餐'
          break
        case 7:
          return '已领餐'
        default:
          break
      }
    },
    // 去结算
    onbuttom() {
      if (!this.notPayCount) return
      this.$router.replace({
        path: '/SettleAccounts'
      })
    },
    //更改控件显示状态
    ChangesState(type) {
      this.isShow = type
    }
  }
}
</script>
<style lang="scss">
@import '@/Style/OrderFood.scss';
</style>
