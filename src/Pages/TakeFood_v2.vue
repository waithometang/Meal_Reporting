<!-- 取餐 -->
<template>
  <div class="main" :class="{'ismboa_main': logoIsmboa}">
  <HreadStatusBar :GMBC_Show_title="!logoIsmboa" :GMBC_listData="GMBC_listData" :GMBC_type="GMBC_type" @GMBC_advance="advance" @GMBC_current="current" @GMBC_retreat="retreat"></HreadStatusBar>
  <div class="pages" v-if="listData.length> 0">
    <div class="main-title">
      <img src="../imgaes/baocanlogo.png"/> {{day}} {{date}}
    </div>
    <div class="item">
      <ul class="main-ul" v-for="(item, index) in listData" :key="index">
        <div class="detailed_but" v-if="item.takeStatus===4">
          <div class="detailed_but_icon" v-if="listData.length > 1">
            <div class="but_icon">
              <img src="../imgaes/zaocan.png"/>
            </div> {{item.mealName}}
          </div>
          <div class="but_content" :class="{'but_content_action': listData.length == 1}" @click="gotoSharePool(item)">
            无报餐信息，<span>我要领餐</span>(本周剩余{{klccs}}次)
          </div>
        </div>
        <template v-else>
          <div class="content">
            <div class="title">
              <div class="title_li">
                <div class="icon">
                  <img src="@/imgaes/zaocan.png">
                </div>
                <div class="tetx">
                  <span class="can">{{item.mealName}}</span>
                  <span class="qian">￥ {{item.price}} 元</span>
                </div>
              </div>
              <div class="title_li">
                <div class="min-icon">
                  <img src="@/imgaes/can.png">
                </div>
                <div class="content-text">{{item.content}}</div>
              </div>
              <div class="title_li">
                <div class="min-icon">
                  <img src="@/imgaes/time.png">
                </div>
                <div class="content-text">取餐时间: {{item.kcsj}}-{{item.jcsj}}</div>
              </div>
            </div>
            <div class="but">
              <div class="not" v-if="item.takeStatus===0 || item.takeStatus===3">
                <img src="@/imgaes/yiqucan.png" alt="" v-if="item.takeStatus===0">
                <img src="@/imgaes/nottake.png" alt="" v-if="item.takeStatus===3">
              </div>
              <div class="take-fenx" v-else-if="item.takeStatus===1 || item.takeStatus===2 || item.takeStatus===5">
                <div class="take zhifu" @click="gotopay(item)" v-if="item.takeStatus===5">
                  支付
                </div>
                <template v-else>
                  <div class="take" @click="showQrCode(item)">
                    {{item.takeStatus===1 ? '取餐' : '等待开餐'}}
                  </div>
                  <div class="take fenx" @click="gotoshow(item)">
                    分享
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </ul>
    </div>
  </div>
  <div class="notData" v-else>
    {{date}} 暂无取餐信息
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
import { MyTakeMeal, GetToAll,GetPayInfoOfOne } from '@/api/baocan'
import NavigationBar from '@/Pages/NavigationBar'
import { storage } from '@/common/js/until'
import HreadStatusBar from '@/Pages/HreadStatusBar'
import { log } from 'util';
// import { mapGetters } from 'vuex'
let iconArr=['yiqucan.png','']
let showData=['0','0','0']//判定分享列表中某餐次是否显示的标识

export default {
  data(){
    return {
      day:'',
      date:'',
      // addDay:0,
      listData: '',
      index:2,
      klccs:0, //剩余可领餐次数
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
      switchoverWeekData: 2,
      showbuttom: false,
      initData: 0,
      alers:1,
      GMBC_listData: {middle:'今天' , left: '上一天', right: '下一天'},
      GMBC_type: 0,
      longData: '',
      closealertv: false
    }
  },
  components: {
    NavigationBar,
    HreadStatusBar
  },
  computed: {
    logoIsmboa () {
      return storage.fetch('logoIsmboa').data
    },
    addDay:{
      get(){
        return this.$store.state.TakeFood_AddDays
      },
      set(val){
        this.$store.state.TakeFood_AddDays=val
      }
    }
  },
  methods:{
    // 导航栏点击事件
    advance (item) {
      this.addDay--
      this.GMBC_type = item
      this.init()
    },
    gotopay(item){
      let that = this
      sessionStorage.setItem('key', 2)
      this.$indicator.open()
      GetPayInfoOfOne ({
            ip: this.$store.state.PaymentIp,
            bcid:item.id
          }).then (rps => {
            this.$indicator.close()
            if (rps.data.success) {
              window.location.href=rps.data.content.mweb_Url
            } else {
              that.changtoast(rps.data.message)
            }
          })
    },
    gotoSharePool(item){
      if(this.klccs===0){
        this.changtoast('您本周可领餐次数已经用完','error')
        return
      }
      this.$router.push({
        path: '/Unclaimed',
        query: {
          lb:item.pclb,
          id: item.pcid,
          show:showData.join('')
        }
      })
    },
    retreat (item) {
      this.addDay++
      this.GMBC_type = item
      this.init()
    },
    current (item) {
      this.addDay = 0
      this.GMBC_type = item
      this.init()
    },
    // 显示取餐二维码
    showQrCode(item){
      if(item.takeStatus !== 1) return
      this.$router.push({
        path:'/TakeFoodCode',
        query: {
          code: 'code',
          id: item.id
        }
      })
    },
    init(){
      let that=this
      MyTakeMeal({
        addDay:this.addDay
      }).then(res=>{
        if(res.data.success && res.data.content){
          that.day=res.data.content.day
          that.date=res.data.content.date
          that.klccs=res.data.content.klccs
          that.listData=this.handleListData(res.data.content.items)
        }else{
          this.changtoast(res.data.message)
        }
      })
    },
    handleListData(data){
      if(data.length===0) return data
      showData=['0','0','0']
      let allCanShare=true
      data.forEach(el => {
        if(el.takeStatus===4) showData[el.pclb-1]='1'
        else allCanShare=false
      })
      if(allCanShare) return [data[0]]
      return data
    },
    //弹出框
    aler(item){
      this.alers=item;
    },
    // 分享
    gotoshow (item) {
      this.longData =  item
      // console.log(this.longData)
      if (this.index == 1) {
        this.index =2
      } else {
        this.index = 1
      }
    },
    // 分享给指定的人 
    appointShara () {
      this.index = 2
      let that = this
      this.showConfirm ({
        title: '提示',
        content: '是否分享?',
        succeed: function () {
          that.$router.push({
            path: '/SelectContact',
            query: {
              id: that.longData.pcid,
              sharaId: that.longData.id
            }
          })
        },
        fail: function () {

        }
      })
    },
    // 一键分享 
    entireShara () {
      this.index = 2
      let that = this
      this.showConfirm ({
        title: '提示',
        content: '是否分享?',
        succeed: function () {
          GetToAll ({
            id: that.longData.id
          }).then (rps => {
            if (rps.data.success) {
              that.changtoast('分享成功')
              that.closealertv = true
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {

        }
      })
    },
    // 取消
    quexiao () {
      this.index = 2
    },
    close () {
      this.closealertv = false
    }
  },
  created(){
    this.init()
  }
}
</script>
<style lang='scss' scoped>
@import "@/Style/takefood.scss";
</style> 