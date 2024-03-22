<template>
<div>
    <hread @onUpdateAddWeek="updateAddWeek"></hread>
  <fot @onFotClick="fotClick" :initData="initFotFlag" :addWeek="addWeek"></fot>
    <mt-popup :data="bcData" :isShow.sync="isPopup" @onSaveDone="saveDone"></mt-popup>
    </div>
</template>
<script>
import hread from "@/baocan/hread"
import fot from "@/baocan/fot-ul"
import MtPopup from '@/Pages/MtPopup'
export default {
  components: {
  hread,
  fot,
  MtPopup
  },
  data(){
    return {
      isPopup:false,
      bcData:{},
      addWeek:0,
      initFotFlag:0//计划表监听此变量以获取新数据
    }
  },
  methods:{
    fotClick(data){
      this.isPopup=true
      this.bcData=data
    },
    saveDone(){
      this.initFotFlag++
    },
    updateAddWeek(isAdd){
      if(isAdd) this.addWeek++
      else this.addWeek--
    }
  }
}
</script>