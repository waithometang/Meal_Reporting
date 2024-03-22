<!-- 报餐模块 -->
<template>
  <div class="OrderFood" :class="{'action': !logoIsmboa}">
    <navigation-bar v-if="!logoIsmboa"></navigation-bar>
    <div class="FoodList">
      <div class="SelectDate">
        <div class="LastWeek" tabindex='1' id="LastWeek" :class="{'actionLastWeek': corls == 1 && showbuttom}" @click="switchoverWeek(1)" @touchstart='touchstart(1)' @touchend='touchend(false)'>
          <div class="icon"><img :src="switchoverWeekData != 1 ? left_c : left_d "></div>
          <div class="text" :class="{'action-text': switchoverWeekData == 1}">
            <!-- <mt-spinner type="triple-bounce" color="yellow" :size="20" v-if="corls == 1 && showbuttom"></mt-spinner> -->
            <span>上一周</span>
          </div>
        </div>
        <div class="ThisWeek" :class="{'action-week': switchoverWeekData == 2, 'actionLastWeek': corls == 2 && showbuttom }" @click="switchoverWeek(2)" @touchstart='touchstart(2)' @touchend='touchend(false)'>
          <!-- <mt-spinner type="triple-bounce" color="yellow" :size="20" v-if="corls == 2 && showbuttom"></mt-spinner> -->
          <span>本周</span>
        </div>
        <div class="NextWeek" :class="{'actionLastWeek': corls == 3 && showbuttom}" @click="switchoverWeek(3)" @touchstart='touchstart(3)' @touchend='touchend(false)'>
          <div class="texts" :class="{'action-text': switchoverWeekData == 3}">
            <!-- <mt-spinner type="triple-bounce" color="yellow" :size="20" v-if="corls == 3 && showbuttom"></mt-spinner> -->
            <span>下一周</span>
          </div>
          <div class="icons"><img :src="switchoverWeekData != 3 ? right_c : right_d "></div>
        </div>
      </div>
      <div class="content">
        <template v-if="iniData.length>0">
        <div class="WeekMeals" :class="{'StaleDated': items.isOver}" v-for="(items, indexs) in iniData" :key="indexs">
          <div class="week">
            <div class="min-icon" :class="{'StaleDated-min-icon': items.isOver}"></div>
            <div class="names" >
              <div class="title">{{items.day}}</div>
              <div class="time">({{items.date}})</div>
            </div>
          </div>
          <div class="meals">
            <ul>
              <li v-for="(item,index) in items.baocan" :key="index" 
              :class="{'action-li': typeindexs == indexs && typeindex==index && showLi}" 
              @click="predetermine(item,items, index,indexs)" 
              @touchstart='touchstart_Li(index, indexs, item, true)' 
              @touchend='touchend_Li(false)'>
                <div class="title"
                :class="{'StaleDated-color': items.isOver || item.schedule_id == '' || item.isOver, 
                'acton-color': item.report_id != '' && !items.isOver && !item.isOver, 
                'actiontitle': !item.isPay && !items.isOver && item.report_id != '',
                'Centered_title': !item.isPay && item.report_id == '' && !item.isShare
                }" 
                v-show="(!items.isOver && item.schedule_id == 0) ? false : true">{{mealsData[index]}}</div>
                <div class="time"
                :class="{'StaleDated-color': items.isOver || item.schedule_id == '' || item.isOver,
                  'notpayment': !item.isPay
                }"  
                v-show="(!items.isOver && item.schedule_id == 0 && item.report_id == '') ? false : true">{{getState(item)}}</div>
              </li>
            </ul>
          </div>
        </div>
        </template>
        <template v-else>
        <div class="WeekMeals" v-for="row of 7" :key="row">
          <div class="week">
            <div class="min-icon"></div>
            <div class="names" >
            </div>
          </div>
          <div class="meals">
          </div>
        </div>
        </template>
      </div>
      <div class="buttom" :class="{'gray':notPayCount==0}" @click="onbuttom">
        已报 {{notPayCount}} 餐，去结算
    </div>
    </div>
    <mt-popup :isShow='isShow' :ShowData='ShowData' @ChangeIsshow="ChangesState"  @changeshowLi='ChangactionLi'></mt-popup>
  </div>
</template>

<script>
import { GetMyReport, Login } from '@/api/baocan'
import MtPopup from '@/Pages/MtPopup'
import NavigationBar from '@/Pages/NavigationBar'
import { storage } from '@/common/js/until'
export default {
  data () {
    return {
      switchoverWeekData: 2,
      showbuttom: false,
      showLi: false,
      typeindex: 0,
      typeindexs: 0,
      iniData: [], // 每周排餐情况
      notPayCount: 0, // 是否有未结算
      addWeek: 0, // 选择那周
      isShow: false, // 是否显示控件
      ShowData: '', // 控件需要的参数
      mealsData: ['早餐', '中餐', '晚餐'],
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
      corls : 0,
    }
  },
  components: {
    MtPopup,
    NavigationBar
  },
  computed: {
    RefreshData () {
      return this.$store.state.RefreshData
    },
    account () {
      return this.$route.query.user
    },
    pwd () {
      return this.$route.query.pwd
    },
    isblock () {
      return this.$route.query.isblock
    },
    ismboa () {
      return this.$route.query.ismboa
    },
    logoIsmboa () {
      return storage.fetch('logoIsmboa').data
    }
  },
  created () {
    // 周五时自动跳转下一周
    var mydate=new Date();
    var myddy=mydate.getDay()
    if (myddy == 6) { // 如果为周五直接显示下一周
      this.switchoverWeekData = 3
      this.addWeek = 1
    }
    // 记录是否是oa进入
    if (this.ismboa) {
      storage.save('logoIsmboa', this.ismboa)
    }
    // 是否需要自动登录
    if (!this.isblock) {
      if (!this.account || !this.pwd) {
        this.$router.push({
          path:'/Login'
        })
      } else {
        this.login()
      }
    } else {
      // 是否是支付后回调
      if (this.$route.query.tagdata) {
        this.addWeek = this.$route.query.AddWeekData,
        this.switchoverWeekData = this.$route.query.tagdata
      }
      this._GetMyReport()
    }
  },
  methods: {
    // 顶部导航点击按下状态
    touchstart (type) {
      this.corls = type
      this.showbuttom = true
    },
    // 顶部导航点击松开状态
    touchend (bollem) {
      this.showbuttom = bollem
    },
    // 选择报餐 点击按下状态
    touchstart_Li (index, indexs, item, boolem) {
      if (item.schedule_id == 0) {
        return
      }
      this.typeindex = index
      this.typeindexs = indexs
      this.showLi = boolem
    },
    // 选择报餐 点击松开状态
    touchend_Li (boolem) {
      this.showLi = boolem
    },
    // 顶部导航栏点击事件
    switchoverWeek (item) {
      if (item ==1) {
        this.addWeek--
        this._GetMyReport()
      } else if (item == 2) {
        this.addWeek = 0
        this._GetMyReport()
      } else {
        this.addWeek++
        this._GetMyReport()
      }
      this.switchoverWeekData = item
      this.$store.commit('SET_TopTagData', this.switchoverWeekData)
      this.$store.commit('SET_AddWeekData', this.addWeek)
    },
    // 请求api获取排餐列表
    _GetMyReport () {
      // console.log(this.addWeek)
      this.iniData = []
      GetMyReport({
        addWeek: this.addWeek
      }).then (rps => {
        if (rps.data.success) {
          this.iniData = rps.data.content.items
          this.notPayCount = rps.data.content.notPayCount
        } else {
         this.changtoast(rps.data.message)
        }
      })
    },
    // 获取用户Token
      login(){
        storage.remove('token') 
        let that=this
        Login({
          Account:this.account,
          Password:this.pwd
        }).then(res=>{
          if(res.data.success){
            storage.save('token',res.data.content.token)
            that.$store.commit('SET_LOGINNAME',res.data.content.name)
            that.$store.commit('SET_LOGINTIME',res.data.content.time)
            this._GetMyReport()
          }else{
            this.changtoast(res.data.message)
            this.$router.push({
              path:'/Login'
            })
          }
        })
      },
    predetermine (item, items, index, indexs) {
      this.typeindex = index
      this.typeindexs = indexs
      if (item.schedule_id == 0 && !items.isOver) {
        this.changtoast('当天未排餐')
        return
      } else {
        if (items.isOver) {
        this.changtoast('已过报餐时间') 
        return
        }
      }
      this.ShowData = item
      this.isShow = true
    },
    getState(bc){ //获取排餐报餐状态
      if (bc.report_id == 0) {
        if(bc.isShare) {
          return '已分享'
        } else {
          return ''
        }
      } else{
        if (!bc.isPay) {
          return '未支付'
        } else {
          if (bc.isTake) {
            return '已取餐'
          } else {
            return '已报餐'
          }
        }
      }
    },
    // 去结算
    onbuttom () {
      if(!this.notPayCount) return
      this.$router.push({
        path:'/SettleAccounts'
      })
    },
    //更改控件显示状态
    ChangesState (type) {
      this.isShow = type
    },
    // 接受组件接口响应状态，控制背景颜色 (暂时放弃) 更新数据
    ChangactionLi (type) {
      return
      // this.showLi = type
    }
  }
}
</script>
<style lang="scss">
@import '@/Style/OrderFood.scss'
</style>
