<!-- 点评 -->
<template>
  <div class="main"  :class="{'ismboa_main': logoIsmboa}">
    <HreadStatusBar :GMBC_Show_title="!logoIsmboa" :GMBC_listData="GMBC_listData" :GMBC_type="GMBC_type" @GMBC_advance="advance" @GMBC_current="current" @GMBC_retreat="retreat"></HreadStatusBar>
    <thisweek :addDay="addDay" @changeshowbuttom='ChangesState'></thisweek>
  </div>
</template>
<script>
import thisweek from "./thisweek"
import NavigationBar from '@/Pages/NavigationBar'
import { storage } from '@/common/js/until'
import HreadStatusBar from '@/Pages/HreadStatusBar'
export default {
  components: {
    thisweek,
    NavigationBar,
    HreadStatusBar
  },
  data(){
    return {
      addDay:0,
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
      switchoverWeekData: 2,
      showbuttom: false,
      initData: 0,
      GMBC_listData: {middle:'今天' , left: '上一天', right: '下一天'},
      GMBC_type: 0,
    }
  },
  computed: {
    logoIsmboa () {
      return storage.fetch('logoIsmboa').data
    }
  },
  methods:{
    // 顶部导航点击按下状态
    touchstart (type) {
      this.initData = type
      this.showbuttom = true
    },
    // 顶部导航点击松开状态
    touchend (bollem) {
      this.showbuttom = bollem
    },
    //  按钮点击事件
    advance (item) {
      this.addDay--
      this.GMBC_type = item
    },
    retreat (item) {
      this.addDay++
      this.GMBC_type = item
    },
    current (item) {
      this.addDay = 0
      this.GMBC_type = item
    },
    // 接受组件返回的接口响应状态 (暂时弃用)
    ChangesState (type) {
      return
    }
  }
}
</script>


<style lang='scss' scoped>
@import "../Style/review.scss";
</style>