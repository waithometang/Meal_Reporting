<template>
  <div class="Satisfaction">
    <HreadStatusBar :GMBC_isShow="false" :GMBC_title="GMBC_title" :GMBC_backtracktype="true"></HreadStatusBar>
    <div class="content-list">
      <div class="list" v-for="(item, index) in contentData" :key="index">
        <div class="list-icon">
          <img src="@/imgaes/img_02.png" alt="">
        </div>
        <div class="list-content">
          <div class="category">{{item}}</div>
          <div class="menu-list">
            <!-- 菜品打分 -->
            <div class="evaluate-li" v-if="index == 0" v-for="(item_1, index_1) in listData" :key="index_1">
              <div class="li-name">
                {{item_1.name}}:
              </div>
              <div class="li-grade" v-for="(item_2, index_2) in 5" :key="index_2" @click="SetGradeIcon(index_1, item_1, index_2)">
                <div class="grade-icon">
                  <img v-if="index_2+1 <= item_1.score" src="@/imgaes/xingimg_02.png">
                  <img v-else src="@/imgaes/xingimg_03.png">
                </div>
              </div>
              <div class="li-result">满意</div>
            </div>
            <!-- 服务打分 -->
            <div class="evaluate-li" :class="{'evaluate-li-action': index == 1}" v-if="index == 1">
              <div class="li-name">
                服务质量:
              </div>
              <div class="li-grade" v-for="(item_3, index_3) in 5" :key="index_3" @click="SetserverScore(index_3)">
                <div class="grade-icon">
                  <img v-if="index_3 + 1 <= serverScore" src="@/imgaes/xingimg_02.png">
                  <img v-else src="@/imgaes/xingimg_03.png">
                </div>
              </div>
              <div class="li-result">满意</div>
            </div>
          </div>
          <div class="evaluate">
            <textarea placeholder="您如果对菜品有其他意见或建议，请放心填写" v-if="index == 0" v-model="mealSuggest"></textarea>
            <textarea placeholder="您如果对服务质量有其他意见或建议，请放心填写" v-else v-model="serverSuggest"></textarea>
          </div>
        </div>
      </div>
      <div class="but" @click="Submit" v-if="isSatisfaction">提交</div>
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'
import HreadStatusBar from './HreadStatusBar'
import { MySatisfaction,SetSatisfaction } from '@/api/baocan'

export default {
  components: {
    HreadStatusBar,
    Rater
  },
  data () {
    return {
      GMBC_title: '菜品满意度点评',
      serverScore:'',
      serverSuggest:'', // 服务
      mealSuggest:'', // 菜品
      contentData: ['请对菜品点评打分', '请对服务打分'],
      listData: [],
      isSatisfaction: true
    }
  },
  methods: {
    SetGradeIcon (index_1, item, index_2) {
      if (this.isSatisfaction) {
        this.listData[index_1].score = index_2+1
      }
    },
    SetserverScore (item) {
      if (this.isSatisfaction) {
        this.serverScore = item+1
      }
    },
    GetMySatisfaction () {
      MySatisfaction ({
        id: this.$route.query.id
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content.items
          this.serverScore=rps.data.content.serverScore
          this.serverSuggest=rps.data.content.serverSuggest
          this.mealSuggest=rps.data.content.mealSuggest
          if (this.serverScore > 0) {
            console.log(1234)
            this.isSatisfaction = false
          }
        }else{
          this.changtoast(rps.data.message)
        }
      })
    },
    Submit () {
      if (this.serverScore <= '0') {
        this.changtoast('请对服务打分')
        return
      }
      for (let index = 0; index < this.listData.length; index++) {
        if (this.listData[index].score <= '0') {
          this.changtoast('请对当天菜品打分')
          return
        }
      }
      SetSatisfaction({
        id: this.$route.query.id,
        serverScore:this.serverScore,
        serverSuggest:this.serverSuggest,
        mealSuggest:this.mealSuggest,
        items:this.listData
      }).then (res=>{
        if(res.data.success && res.data.content){
          this.changtoast('提交成功')
        }else{
          this.changtoast(res.data.message)
        }
      })
    }
  },
  created () {
    this.GetMySatisfaction()
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/Style/Satisfaction_v1.scss';
</style>
