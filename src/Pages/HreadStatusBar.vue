<!-- 头部状态栏 -->
<template>
  <div class="GMBC_HreadStatusBar">
    <div class="GMBC_backtrackTitle" v-if="GMBC_Show_title">
      <div class="GMBC_backtrack" v-if="GMBC_backtracktype" @click="GMBC_backtrack">
         <img src="@/imgaes/fanhui.png">
      </div>
      <div class="GMBC_title">
        {{GMBC_title}}
      </div>
    </div>
    <div class="GMBC_StatusBar" v-if="GMBC_isShow">
      <div class="GMBC_week" @click="GMBC_changeType(-1)" :class="{'GMBC_action': GMBC_type == -1}"> 
        <div class="GMBC_left">
          <img class="GMBC_left_image" :src="GMBC_type == -1 ? left_d : left_c">
        </div> 
        {{GMBC_listData.left}}
      </div>
      <div class="GMBC_week GMBC_middle" @click="GMBC_changeType(0)" :class="{'GMBC_action': GMBC_type == 0}"> {{GMBC_listData.middle}} </div>
      <div class="GMBC_week" @click="GMBC_changeType(1)" :class="{'GMBC_action': GMBC_type == 1}">
        <div class="GMBC_text">
          {{GMBC_listData.right}}
        </div>
        <div class="GMBC_right">
          <img class="GMBC_right_image" :src="GMBC_type == 1 ? right_d : right_c" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/common/js/until'
export default {
  computed: {
    logoIsmboa () {
      return storage.fetch('logoIsmboa').data
    }
  },
  props: {
    GMBC_listData: {
      type: Object,
      default: function () {
        return {middle:'本周' , left: '上一周', right: '下一周'}
      } 
    },
    GMBC_backtracktype: {
      type: Boolean,
      default: false
    },
    GMBC_isShow: {
      type: Boolean,
      default: true
    },
    GMBC_type: {
      type: Number,
      default: 0
    },
    GMBC_Show_title : {
      type: Boolean,
      default: true
    },
    GMBC_title: {
      type: String,
      default: '高明区政府智慧饭堂'
    }
  },
  data () {
    return {
      left_c: require('@/imgaes/left-c.png'),
      left_d: require('@/imgaes/left-d.png'),
      right_c: require('@/imgaes/right-c.png'),
      right_d: require('@/imgaes/right-d.png'),
    }
  },
  methods: {
    GMBC_changeType(item) {
      switch (item) {
        case -1: // 往后一天
          this.$emit('GMBC_advance', item)
          break;
        case 0: // 当天
          this.$emit('GMBC_current', item)
          break;
        case 1:  // 往前一天
          this.$emit('GMBC_retreat', item)
          break;
        default:
          break;
      }
    },
    GMBC_backtrack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped type='text/csss'>
  .GMBC_HreadStatusBar{
    position: fixed;
    height: auto;
    width: 750px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    .GMBC_backtrackTitle {
      height: 88px;
      background: #2B85E4;
      display: flex;
      display: -webkit-box;
      display: -ms-flexbox;
      align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      .GMBC_backtrack {
        padding-left: 20px;
        width:20px;
        height:35px;
        flex: 0 0 20px;
        img{
          width:20px;
          height:35px;
        }
      }
      .GMBC_title {
        flex: 1;
        height: 88px;
        text-align: center;
        display: flex;
        display: -webkit-box;
        display: -ms-flexbox;
        align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        justify-content: center;
        font-size: 36px;
        color:rgba(255,255,255,1);
      }
    }
    .GMBC_StatusBar {
      height: 88px;
      padding: 0 24px;
      background: #ffffff;
      display: flex;
      display: -webkit-box;
      display: -ms-flexbox;
      align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      .GMBC_week {
        flex: 1;
        height: 88px;
        display: flex;
        font-size: 30px;
        color:rgba(102,102,102,1);
        display: -webkit-box;
        display: -ms-flexbox;
        align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        .GMBC_left {
          width:30px;
          height:17px;
          flex:  0 0 30px;
          margin-right: 15px;
          display: flex;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .GMBC_right {
          width:30px;
          height:17px;
          flex:  0 0 30px;
          margin-left: 15px;
          display: flex;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .GMBC_text {
          flex: 1;
          height: 88px;
          display: flex;
          display: -webkit-box;
          display: -ms-flexbox;
          align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          justify-content: flex-end;
        }
      }
      .GMBC_week:active {
        background: #cccccc;
      }
      .GMBC_action {
        color:rgba(51,204,51,1);
      }
      .GMBC_middle {
        flex: 1;
        justify-content: center;
      }
    }
  }
</style>
