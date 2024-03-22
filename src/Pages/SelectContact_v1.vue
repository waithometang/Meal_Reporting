<template>
  <div class="SelectContact">
    <HreadStatusBar :GMBC_backtracktype="true" :GMBC_isShow="false"></HreadStatusBar>
    <!-- <div class="Select">
      <div class="inputs">
        <input type="text"  v-model="key" placeholder="请输入联系人"/>
      </div>
      <div class="image" @click="search">
        <img src="@//imgaes/search.png">
      </div>
    </div> -->
    <div class="serch">
      <div>
      <input placeholder="请输入搜索内容" type="text" v-model="key"/>
        <img src="@//imgaes/search.png" @click="search">
      </div>
    </div>
    <div class="personnelList">
      <div class="list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
          <div class="content" v-for="(item, index) in listData" :key="index">
            <div class="personnel_icon">
              <img src="@/imgaes/touxiang.png">
            </div>
            <div class="personnel_name">
              <span>{{item.name}}</span>
            </div>
            <div class="personnel_slect" @click="_personnel_slect(item, index)">
              <img :src="personnel_slect_index==index ? chabox_i:chabox">
            </div>
          </div>
        </scroller>
      </div>
    </div>
    <div class="affirmShara" @click="_affirmShara">
      <div class="_but">分享</div>
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
import { Getklcry, GetToOne } from '@/api/baocan'
import Vue from 'vue'
import VueScroller from "vue-scroller"
Vue.use(VueScroller)

let refreshing = false

export default {
  components: {
    HreadStatusBar
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    sharaId () {
      return this.$route.query.sharaId
    }
  },
  data () {
    return {
      chabox:require('@/imgaes/Checkbox.png'),
      chabox_i:require('@/imgaes/Checkbox_i.png'),
      personnel_slect_index: 99999,
      listData: [],
      ryid: '',
      pageIndex: 1,
      pageSize: 10,
      key: '',
      closealertv: false
    }
  },
  methods: {
    _Getklcry (done) {
      if(refreshing) return
      refreshing=true
      Getklcry ({
        id: this.sharaId,
        search: this.key,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then (rps => {
          refreshing=false
        if (rps.data.success) {
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
    _personnel_slect (item, index) {
      this.personnel_slect_index = index
      this.ryid = item.id
    },
    _affirmShara () {
      if (!this.ryid) {
        this.changtoast('请选择分享人员')
        return
      }
      GetToOne({
        bcid: this.sharaId,
        ryid: this.ryid
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('分享成功')
          this.closealertv = true
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    close () {
      this.closealertv = false
      this.$router.push({
        path: '/home',
        query: {
          isblock: true
        }
      })
      this.$store.commit('SET_BottomTagType', 1)
    },
    infinite (done) {
      this._Getklcry(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this._Getklcry(done)
      this.$refs.my_scroller.finishInfinite(false)
    },
    search () {
      this.pageIndex=1
      this.listData=[]
      this.infinite()
      this.$refs.my_scroller.finishInfinite(false)
    }
  },
}
</script>

<style lang='scss' scoped type="text/css">
@import "@/Style/SelectContact_v1.scss";
</style>
