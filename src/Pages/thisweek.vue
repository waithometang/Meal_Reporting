<template>
  <div class="mains">
    <div class="pages" v-if="listData != ''">
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
      </div>
    </div>
    <div class="notData" v-if="shownotData">
       {{date}} 暂无评论信息
    </div>
  </div>
</template>
<script>
  import { EvaluationList } from '@/api/baocan'
  let nameArr=['','早','午','晚']
  export default {
    watch:{
      addDay(){
        this.init()
      }      
    },
    data(){
      return {
        date:'',
        listData: '',
        shownotData: false
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
        this.$emit('changeshowbuttom', true)
        EvaluationList({addDay:this.addDay})
          .then(res=>{
            if(res.data.success){
              this.$emit('changeshowbuttom', false)
              this.date=res.data.content.date
              if (res.data.content.items.length <= 0) {
                this.shownotData = true
              }
              this.listData=res.data.content.items
            }else{
              alert(res.data.message)
            }
          })
      }
    },
    created(){
      this.init()
    },
    props:['addDay']
  }
</script>
<style lang='scss' scoped>
@import "../Style/review.scss";
</style>