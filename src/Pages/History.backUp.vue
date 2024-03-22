<!-- 订餐历史记录 -->
<template>
  <div class="main">
    <div class="hread">
      <div class="top"><img src="../imgaes/fanhui.png" @click="backingout" />历史订餐记录</div>
      <div class="time">
        <span class="title-font">请选择时间</span>
        <div class="choose">
          <span class="run-time" @click="displaytime(0)">{{starttime}}</span>
          <img class="right-img" src="../imgaes/img_05.png"/>
          <span class="stop-time" @click="displaytime(1)">{{endtime}}</span>
          <div @click="searchHistory"> <img class="sousuo-img" src="../imgaes/sousuo.png"/></div> 
        </div>
      </div>
    </div>
    <scroller :on-infinite= 'infinite' ref="infinite" class="scroller">
      <div class="item">
        <div class="main-ul" v-for="(item,index) in initData" :key="index">
          <div class="main-li">
            <span class="title-font">已定{{item.count}}餐</span><p class="time-font"><img src="../imgaes/time-logo.png"/> {{item.date}}  {{item.day}}</p>
            <span class="monay-font">-¥ {{item.fee}} 元</span>
          </div>
        </div>
      </div>
    </scroller>
    <date-time :type="type" :IsShow="IsShow" @Set_IsShow="ChangeState"></date-time>
  </div>
</template>

<script>
import DateTime from '@/baocan/datetime'
import { MyHistory } from  '@/api/baocan'
export default {
  components: {
    DateTime
  },
  data () {
    return {
      Dateype: 0,
      type: 0,
      IsShow: false,
      DisplayTimeDate: '',
      pageIndex: 1,
      pageSize: 10,
      initData: ''
    }
  },
  computed: {
    // 查询开始时间
    starttime () {
      if (this.$store.state.StartTime == '') {
       let date = new Date ()
       return date.getFullYear() + '-' + (date.getMonth() + 1 -1 )+ '-' + date.getDate()
      } else {
        return this.$store.state.StartTime 
      }
    },
    // 查询结束时间
    endtime () {
      if (this.$store.state.EndTime == '') {
       let date = new Date ()
       return date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate()
      } else {
        return this.$store.state.EndTime 
      }
    }  
  },
  created () {
    this._MyHistory()
    // this.infinite()
  },
  methods: {
    // 选择时间
    displaytime (type) {
      this.type = type
      this.IsShow = true
    },
    // 返回上一级
    backingout () {
      this.$router.go(-1)
    },
    // 查询订历史记录
    _MyHistory (done) {
      MyHistory({
        startDate: this.starttime,
        endDate: this.endtime,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }).then(rps => {
        if (rps.data.success) {
          let data =rps.data.content
          if (this.pageIndex > 1) { // 第二页以上数据
            this.initData = this.initData.concat(data)
            if (data.length = 10) {
              this.pageIndex++
              if (done) done()
            }
            if (data.length <10) {
              if (done) {
                done (true)
              }
            }
          } else { // 第一页数据
            this.initData = data
            if (data.length == 10) {
              this.pageIndex++
              if (done) done()
            }
            if (data.length < 10) {
              if (done) {
                done (true)
              }
            }
          }
        } else {
          this.changtoast(res.data.message)
        }
      })
    },
    // 搜索历史记录
    searchHistory () {
      this._MyHistory()
    },
    // 触底下拉 添加分页
    infinite (done) {
      this._MyHistory(done)
    },
    ChangeState (type) {
      this.IsShow = type
    }
  }
}
</script>


<style lang='scss' scoped>
@import "../Style/history.scss";
</style>