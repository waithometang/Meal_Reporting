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
        <div @click="bortypeselse(1)">待领分享{{listData.length}}</div>
        <div @click="bortypeselse(2)">我的分享</div>
        <p :class="{'marginleft':ismargin==2}"></p>
      </div>
      <transition name="xright">
        <div class="item" v-show="bortype==1">
          <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
            <div class="list" v-for="(item,index) in listData" :key="index">
              <div>
                <div class="name">
                  <img src="@/imgaes/can.png">{{item.fxr}}
                </div>
                <div class="Pages">
                  <img src="@/imgaes/can.png">{{item.content}}
                </div>
              </div>
              <div class="right-main">
                <div class="but" @click="alert(item.id)">领取</div>
              </div>
            </div>
          </scroller>
        </div>
      </transition>
      <transition name="xleft">
        <div class="item" v-show="bortype==2">
          <div class="list" v-for="(item,index) in MyShareData" :key="index">
            <div>
              <div class="name">
                <img src="@/imgaes/can.png">{{item.lqr ? item.lqr : '等待领取'}}
              </div>
              <div class="Pages">
                <img src="@/imgaes/can.png">{{item.content}}
              </div>
            </div>
            <div class="right-main" v-if="false">
              <div class="but" @click="alert">领取</div>
            </div>
          </div>
          <div class="notShara" v-if="MyShareData.length<= 0">没有更多数据</div>
        </div>
      </transition>
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
import { ShareList, TakeShare, MyShare } from '@/api/baocan'
import Vue from 'vue'
import VueScroller from "vue-scroller"
Vue.use(VueScroller)

let refreshing = false

export default {
  data() {
    return {
      bortype: 1,
      closealert: false,
      ismargin: 1,
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      MyShareData: []
    };
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    //导航栏切换
    bortypeselse(item) {
      this.bortype = item;
      this.ismargin = item;
      if (item == 1) {
        this.GetShareList()
      } else {
        this.GetMyShare()
      }
    },
    //alert 弹出
    alert(item) {
      TakeShare ({
        id: item
      }).then (rps => {
        console.log(rps)
        if (rps.data.success) {
          this.closealert = true
          this.$toast('领餐成功')
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    close () {
      this.closealert = false
      // this.$store.commit('SET_BottomTagType', 1)
      this.$router.push({
        path: '/home',
        query: {
          isblock: true
        }
      })
    },
    GetMyShare () {
      MyShare({
        id: this.id
      }).then (rps => {
        console.log(rps)
        if (rps.data.success) {
          this.MyShareData = rps.data.content
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    GetShareList (done) {
      if(refreshing) return
      refreshing=true
      ShareList({
        id: this.id,
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
    GMBC_backtrack () {
      this.$router.go(-1)
    },
    infinite (done) {
      this.GetShareList(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this.GetShareList(done)
      this.$refs.my_scroller.finishInfinite(false)
    }
  },
  created () {
    this.GetShareList()
  }
};
</script>
<style lang="scss" scoped>
@import "@/Style/Unclaimed.scss"
</style>
