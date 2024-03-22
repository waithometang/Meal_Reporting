<!-- 评论 -->
<template>
  <div class="comment ">
    <!--头部-->
       <div class="hread">
       <div class="top"><img src="../imgaes/fanhui.png"/>菜品满意度点评</div>
    </div>
    <!-- 点评菜品 -->
    <div class="min-icon">
      <div class="icon">
        <img src="../imgaes/comment.png">
      </div>
       请对菜品点评打分
    </div>
    <div class="grade">
      <div class="content">
        <div class="subject">粥：</div>
          <rater class="rater-icon" :margin="15"></rater>
        <div class="result">
          满意
        </div>
      </div>
      <div class="content">
        <div class="subject">包子：</div>
          <rater class="rater-icon" :margin="15"></rater>
        <div class="result">
          满意
        </div>
      </div>
      <div class="content">
        <div class="subject">肉粥：</div>
          <rater class="rater-icon" :margin="15" ></rater>
        <div class="result">
          满意
        </div>
      </div>
    </div>
    <div class="text-comment"> 
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
          <rater class="rater-icon" :margin="15"></rater>
        <div class="result">
          满意
        </div>
      </div>
    </div>
    <div class="text-comment"> 
    </div>
    <!-- 提交点评 -->
    <div class="submit">
        提交
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'

export default {
  components: {
    Rater
  }
}
</script>

<style lang='scss'>
@import '@/Style/comment.scss'
</style>
