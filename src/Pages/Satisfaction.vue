<!-- 满意度打分 -->
<template>
  <div class="comment ">
    <!--头部-->
       <div class="hread">
       <div class="top"><img src="../imgaes/fanhui.png" @click="backingout"/>菜品满意度点评</div>
    </div>
    <!-- 点评菜品 -->
    <div class="min-icon">
      <div class="icon">
        <img src="../imgaes/comment.png">
      </div>
       请对菜品点评打分
    </div>
    <div class="grade">
      <div class="content" v-for="(item, index) in listData" :key="index">
        <div class="subject">{{item.name}}：</div>
          <rater class="rater-icon" :margin="8" v-model="item.score" ></rater>
        <div class="result">
          满意
        </div>
      </div>
    </div>
    <div class="text-comment">
      <textarea placeholder="您如果对菜品有其他意见或建议，请放心填写" v-model="mealSuggest"></textarea>
    </div>
    <!-- 点评服务 -->
    <div class="min-icon">
      <div class="icon">
        <img src="../imgaes/comment.png">
      </div>
       请对服务打分
    </div>
    <div class="grade">
      <div class="content">
        <div class="subject">服务质量：</div>
          <rater class="rater-icon" :margin="8" v-model="serverScore"></rater>
        <div class="result">
          满意
        </div>
      </div>
    </div>
    <div class="text-comment">
      <textarea placeholder="您如果对服务质量有其他意见或建议，请放心填写" v-model="serverSuggest"></textarea>
    </div>
    <!-- 提交点评 -->
    <div class="submit" @click="Submit">
        提交
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'
import { MySatisfaction,SetSatisfaction } from '@/api/baocan'

export default {
  data(){
    return {
      serverScore: 5,
      serverSuggest:'', // 服务
      mealSuggest:'', // 菜品
      listData:[],
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  methods:{
    init(){
      let id=this.id,that=this
      MySatisfaction({id})
        .then(res=>{
          if(res.data.success && res.data.content){
            that.serverScore=res.data.content.serverScore
            that.serverSuggest=res.data.content.serverSuggest
            that.mealSuggest=res.data.content.mealSuggest
            that.listData=res.data.content.items
          }else{
            this.changtoast(res.data.message)
          }
        })
    },
    Submit(){
      if (this.serverScore <= '0') {
        this.changtoast('请对服务打分')
        return
      }
      for (let index = 0; index < this.listData.length; index++) {
        console.log(this.listData[index])
        if (this.listData[index].score <= '0') {
          this.changtoast('请对当天菜品打分')
          return
        }
      }
      let id=this.id
      let data={
        id,serverScore:this.serverScore,
        serverSuggest:this.serverSuggest,
        mealSuggest:this.mealSuggest,
        items:this.listData
      }
      SetSatisfaction(data).then (res=>{
        if(res.data.success && res.data.content){
          this.changtoast('提交成功')
        }else{
          this.changtoast(res.data.message)
        }
      })
    },
    backingout () {
      this.$router.back(-1)
    }
  },
  created() {
    this.init()
  },
  components: {
    Rater
  }
}
</script>

<style lang='scss'>
@import '@/Style/comment.scss'
</style>
