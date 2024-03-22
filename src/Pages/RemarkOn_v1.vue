<template>
  <div class="RemarkOn">
    <HreadStatusBar :GMBC_Show_title="!logoIsmboa" :GMBC_listData="GMBC_listData" :GMBC_type="GMBC_type" @GMBC_advance="advance" @GMBC_current="current" @GMBC_retreat="retreat"></HreadStatusBar>
    <div class="remark-list" v-if="listData.length > 0">
      <div class="list-content" v-for="(item, index) in listData" :key="index" @click="showDetail(item.id)">
        <div class="content-icon" :class="{'icon-morning': item.pclb == '1' , 'icon-nooning': item.pclb == '2', 'icon-supper': item.pclb == '3' }"></div>
        <div class="content-title">
          <div class="title-name">{{nameArr[item.pclb]}}餐满意度点评</div>
          <div class="title-time">{{date}}</div>
        </div>
        <div class="content-name">待评价</div>
        <div></div>
      </div>
    </div>
    <div class="not-data" v-else>{{date}}暂无评论信息</div>
  </div>
</template>

<script>
  import { EvaluationList } from '@/api/baocan'
  import HreadStatusBar from '@/Pages/HreadStatusBar'
  import { storage } from '@/common/js/until'

  export default {
    components: {
      HreadStatusBar
    },
    data(){
      return {
        addDay:0,
        date:'',
        listData: '',
        shownotData: false,
        nameArr: ['','早','午','晚'],
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
      showDetail(id){//显示评价详细
        this.$router.push({
          path:'/Satisfaction',
          query:{
            id
          }
        })
      },
      init(){
        EvaluationList({addDay:this.addDay})
          .then(res=>{
            if(res.data.success){
              this.date=res.data.content.date
              if (res.data.content.items.length <= 0) {
                this.shownotData = true
              }
              this.listData=res.data.content.items
              console.log(res)
            }else{
              alert(res.data.message)
            }
          })
      },
      //  按钮点击事件
      advance (item) {
        this.addDay--
        this.GMBC_type = item
        this.init()
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
    },
    created(){
      this.init()
    },
  }
</script>

<style lang='scss' scoped type="text/css">
@import '@/Style/RemarkOn.scss';
</style>
