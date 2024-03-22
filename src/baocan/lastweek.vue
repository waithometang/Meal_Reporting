<template>
  <div class="main">
    <div class="pages">
      <div class="item">
        <div class="main-ul" v-for="(item, index) in listData" :key="index" @click="showDetail(item.id)">
          <div class="main-li">
            <div :class="getBorClass(item.pclb)"></div>
            <div class="font">
              <span class="title-font">{{getName(item.pclb)}}餐满意度点评</span><br/>
              <p class="time-font">{{date}}</p>
            </div>
            <div class="right-font noreview" v-if="item.hasEvaluation">已评价</div>
            <div class="right-font" v-else>未评价</div>
          </div>
        </div>
        <!-- <div class="main-ul">
          <div class="main-li">
            <div class="bor-blue"></div>
            <div class="font">
              <span class="title-font">午餐满意度点评</span><br/>
              <p class="time-font">2018-10-08</p>
            </div>
            <div class="right-font noreview">已评价</div>
          </div>
        </div>
        <div class="main-ul" v-for="(item,index) in 9" :key="index">
          <div class="main-li">
            <div class="bor-green"></div>
            <div class="font">
              <span class="title-font">早餐满意度点评</span><br/>
              <p class="time-font">2018-10-08</p>
            </div>
            <div class="right-font">未评价</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import { EvaluationList } from '@/api/baocan'
  let nameArr=['','早','午','晚']
  export default {
    data(){
      return {
        addDay:0,
        date:'',
        listData:[]
      }
    },
    methods:{
      showDetail(id){//显示评价详细

      },
      getName(i){
        return nameArr[i]
      },
      getBorClass(lb){ //侧边条颜色
        switch(lb){
          case 1:
            return 'bor-green'
          case 2:
            return 'bor-blue'
          case 3:
            return 'bor-red'
        }
      },
      init(){
        EvaluationList({addDay:this.addDay})
          .then(res=>{
            if(res.data.success){
              that.date=res.data.content.date
              that.listData=res.data.content.items
            }else{
              alert(res.data.message)
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
@import "../Style/review.scss";
</style>