<template>
  <div class="Unclaimed">
    <div class="GMBC_backtrackTitle">
      <div class="GMBC_backtrack" @click="GMBC_backtrack">
        <img src="@/imgaes/fanhui.png">
      </div>
      <div class="GMBC_title">订餐领取</div>
    </div>
    <div class="top"><img src="../imgaes/img_08.jpg"/></div>
    <div class="pages">
      <div class="tag">
        <div class="tag_name" v-if="showData[0]==='1'" :class="{'action_tag_name': setTagData == 1}" @click="SetTag(1)">
          <span>早餐待领取({{ListSummaryData.zao}})</span>
        </div>
        <div class="tag_name" v-if="showData[1]==='1'" :class="{'action_tag_name': setTagData == 2}" @click="SetTag(2)">
          <span>午餐待领取({{ListSummaryData.zhong}})</span>
        </div>
        <div class="tag_name" v-if="showData[2]==='1'" :class="{'action_tag_name': setTagData == 3}" @click="SetTag(3)">
          <span>晚餐待领取({{ListSummaryData.wan}})</span>
        </div>
      </div>
      <div class="content_list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="list_icon"></div>
          <div class="list_content">
            <div class="name">
              <div class="images">
                <img src="@/imgaes/can.png">
              </div>
              <div class="title">{{item.fxr}}</div>
            </div>
            <div class="content">
              <div class="images">
                <img src="@/imgaes/can.png">
              </div>
              <div class="titl">{{item.content}}</div>
            </div>
          </div>
          <div class="list_but">
            <div class="but" @click="_TakeShare(item)">
              <span>
                领取
              </span>
            </div>
          </div>
        </div>
        </scroller>
      </div>
    </div>
    <transition name="fade">
      <div class="alert" v-if="closealert">
        <div>
          <div class="img-mian">
            <img src="@/imgaes/img_01.png">
            <p>领取成功</p>
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
import { GetShareListSummary, ShareList, TakeShare } from '@/api/baocan'
import Vue from 'vue'
import VueScroller from "vue-scroller"
Vue.use(VueScroller)


let refreshing = false

export default {
  data () {
    return {
      ListSummaryData: '',
      setTagData: 1,
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      showData:'111',
      closealert:false
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    addDay () {
      return this.$store.state.TakeFood_AddDays
    }
  },
  methods: {
    _GetShareListSummary () {
      GetShareListSummary ({
        addDays: this.addDay
      }).then (rps => {
        if (rps.data.success) {
          this.ListSummaryData = rps.data.content
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    _GetShareList (done) {
      if(refreshing) return
      refreshing=true
      ShareList({
        AddDays: this.addDay,
        lb: this.setTagData,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then (rps => {
        if (rps.data.success) {
          refreshing=false
          if(this.pageIndex===1) this.listData=rps.data.content
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(!this.initFlag) this.initFlag=true
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['my_scroller']) {
            this.$refs.my_scroller.finishInfinite(true)
          }
        } else {
          this.$toast(rps.data.message)
          this.$refs.my_scroller.finishInfinite(true)
        }
      })
    },
    _TakeShare (item) {
      TakeShare ({
        id: item.id
      }).then (rps => {
        if (rps.data.success) {
          this.closealert = true
          this.$toast('领餐成功')
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    GMBC_backtrack () {
      this.$router.go(-1)
    },
    infinite (done) {
      this._GetShareList(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this._GetShareList(done)
      this.$refs.my_scroller.finishInfinite(false)
    },
    close () {
      this.closealert = false
      this.$router.back()
      // this.$router.push({
      //   path: '/home',
      //   query: {
      //     isblock: true
      //   }
      // })
    },
    SetTag (item) {
      this.setTagData = item
      this.$refs.my_scroller.finishInfinite(false)
      this.listData = []
      this.pageIndex = 1
    }
  },
  created() {
    let lb = Number(this.$route.query.lb) || 1
    this.setTagData = lb
    this.showData=this.$route.query.show || '111'
    this._GetShareListSummary()
  }
};
</script>
<style lang="scss" scoped>
@import "@/Style/Unclaimed_v1.scss"
</style>
