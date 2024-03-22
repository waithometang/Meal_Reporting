<template>
  <div class="datetime" v-if="show">
    <mt-datetime-picker
      type="date"
      v-model="dataVal"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      :style="{display: block}"
      >
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
 props:['type', 'IsShow'],
 data () {
    return {
      dateTime: '',
      dataVal: new Date(),
      popupVisible: true,
      sheetVisible: true,
      block: 'none',
      show: false
    }
  },
  watch: {
    IsShow () {
      if(this.IsShow) {
        this.block = 'block'
        this.show = true
      } else {
        this.block = 'none'
        this.show = false
      }
    }
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    // 点击确认
    handleConfirm (date) {
      this.$emit('Set_IsShow', false)
      let time = date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate()
      if (this.type == 0) { // 选择开始时间
        this.$store.commit('SET_StartTime', time)
      }
      if(this.type == 1) {
        // 选择结束时间
        this.$store.commit('SET_EndTime', time)
      }
    },
    // 点击取消
    handleCancel(dtat) {
      this.$emit('Set_IsShow', false)
    }
  },
}
</script>

<style lang='scss'>
.datetime{
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0px;
  bottom: 0px;
  background: #545454;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5)
}
</style>
