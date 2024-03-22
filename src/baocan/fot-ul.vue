<template>
  <div class="main">
    <ul :class="'main-ul '+(bcDay.isOver?'week':'noweek')" v-for="(bcDay, index) in baoCanOfWeek" :key="index">
      <li class="main-li "><div class="font-midd"><span>{{bcDay.day}}</span><p>{{bcDay.date}}</p></div></li>
      <li class="main-li" v-for="(item, ii) in bcDay.baocan" :key="ii" @click="bcClick(item)">
        <div class="font-midd"><span class="overdue-font">{{mealName[ii]}}</span><p class="overdue-font">{{getState(item)}}</p></div>
        </li>
    </ul>
  <div class="but" @click="goPay">报餐完毕，去结算</div>
  </div>
</template>
<script>
  import { GetMyReport } from '@/api/baocan'
  import { log } from 'util';
  export default {
    watch:{
      addWeek(){
        this.init()
      },
      initData(){
        this.init()
      }
    },
    data(){
      return {
        mealName:['早餐','午餐','晚餐'],
        baoCanOfWeek:[]
      }
    },
    methods:{
      init(){
        let that=this
        GetMyReport({addWeek:this.addWeek})
          .then(res=>{
            if(res.data.success){
              that.baoCanOfWeek=res.data.content
            }else{
              this.changtoast(res.data.message)
            }
          })
      },
      goPay(){
        this.$router.push({
          path:'/SettleAccounts'
        })
      },
      bcClick(data){
        if(data.schedule_id){
          this.$emit('onFotClick',data)
        }
      },
      getState(bc){ //获取排餐报餐状态
        if(bc.report_id){
          bc.class='xxxxx'
          return '已报餐'
        }else if(bc.schedule_id){
          bc.class='xxxxx'
          return '已排餐'
        }else{
          bc.class='xxxxx'
          return '未排餐'
        }
      }
    },
    created(){
      this.init()
    },
    props:['initData','addWeek']
  }
</script>
<style lang='scss' scoped>
@import "../Style/fot-ul.scss";
</style>