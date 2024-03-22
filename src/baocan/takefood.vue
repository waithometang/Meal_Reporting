<template>
  <div class="main">
    <div class="hread">
       <div class="top"><img src="../imgaes/fanhui.png"/>高明区政府智慧饭堂</div>
        <div class="main-tab">
          <span class="main-font-left" @click="preDay"><img src="../imgaes/left-c.png"/>上一天  </span>
          <span class="main-font-title">今天</span>
          <span class="main-font-right" @click="nextDay">下一天<img src="../imgaes/right-c.png"/></span>
        </div>
    </div>
  <div class="pages">
    <div class="main-title">
      <img src="../imgaes/baocanlogo.png"/> {{day}} {{date}}
    </div>
    <div class="item">
      <ul class="main-ul" v-for="(item, index) in listData" :key="index" @click="showQrCode(item.takeCode)">
        <li class="mian-li-left">
          <span class="title-font"><img src="../imgaes/zaocan.png"/>{{item.mealName}} &nbsp;&nbsp;¥ {{item.price}}</span>
          <p class="detailed-font"><img src="../imgaes/can.png"/>{{item.content}}</p>
          <p class="time-font"><img src="../imgaes/time.png"/>取餐时间：{{item.kcsj}}-{{item.jcsj}}</p>
        </li>
        <li class="main-li-right" v-if="item.takeStatus===1">
          <div class="font">
            <span class="wucan">仅限今天</span> 
            <div class="btu">
              立即取餐
            </div> 
          </div>
        </li>
        <li class="main-li-right" v-else-if="item.takeStatus===2">
          <div class="font">
             <span class="wancan">敬请期待</span> 
             <div class="btu-no">
               马上开餐
             </div>
          </div>
        </li>
        <li class="main-li-right" v-else-if="item.takeStatus===0">
          <img src="../imgaes/yiqucan.png"/>
        </li>
        <li class="main-li-right" v-else>
          <img src="../imgaes/nottake.png"/>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
  import { MyTakeMeal } from '@/api/baocan'
  let iconArr=['yiqucan.png','']
  export default {
    data(){
      return {
        day:'',
        date:'',
        addDay:0,
        listData:[]
      }
    },
    methods:{
      preDay(){
        this.addDay--
        this.init()
      },
      nextDay(){
        this.addDay++
        this.init()
      },
      showQrCode(code){
        this.$toast(code)
      },
      init(){
        let that=this
        MyTakeMeal({addDay:this.addDay})
          .then(res=>{
            if(res.data.success && res.data.content){
              that.day=res.data.content.day
              that.date=res.data.content.date
              that.listData=res.data.content.items
            }else{
              this.$toast(res.data.message)
            }
          })
      }
    },
    created(){
      this.init()
    }
  }
</script>
<style lang='scss' scoped>
@import "../Style/takefood.scss";
</style>