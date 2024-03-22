<template>
  <div class="BottomTab">
    <div class="tab-list">
      <div class="tab" @click="SwitchoverBottomTag(1)">
        <div class="tab-iocn">
          <img :src="BottomTagType != 1 ?  baocan_c : baocan_d " alt="">
        </div>
        <div class="tab-name" :class="{'tab-name-action': BottomTagType == 1}">报餐</div>
      </div>
      <div class="tab" @click="SwitchoverBottomTag(2)">
        <div class="tab-iocn">
          <img :src="BottomTagType != 2 ?  qucan_c : qucan_d " alt="">
        </div>
        <div class="tab-name" :class="{'tab-name-action': BottomTagType == 2}">取餐</div>
      </div>
      <div class="tab" @click="SwitchoverBottomTag(3)">
        <div class="tab-iocn">
          <img :src="BottomTagType != 3 ?  dianping_c : dianping_d " alt="">
        </div>
        <div class="tab-name" :class="{'tab-name-action': BottomTagType == 3}">点评</div>
      </div>
      <div class="tab" @click="SwitchoverBottomTag(4)">
        <div class="tab-iocn">
          <img :src="BottomTagType != 4 ?  chaxun_c : chaxun_d " alt="">
        </div>
        <div class="tab-name" :class="{'tab-name-action': BottomTagType == 4}">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baocan_c: require('@/imgaes/baocan-c.png'),
      baocan_d: require('@/imgaes/baocan-d.png'),
      dianping_c: require('@/imgaes/dianping-c.png'),
      dianping_d: require('@/imgaes/dianping-d.png'),
      chaxun_c: require('@/imgaes/chaxun-c.png'),
      chaxun_d: require('@/imgaes/chaxun-d.png'),
      qucan_c: require('@/imgaes/qucan-c.png'),
      qucan_d: require('@/imgaes/qucan-d.png'),
    }
  },
  computed: {
    BottomTagType () {
      return this.$store.state.BottomTagType
    }
  },
  methods: {
    SwitchoverBottomTag (item) {
      this.$store.commit('SET_BottomTagType', item)
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
.BottomTab {
  position: fixed;
  height: 98px;
  bottom: 0px;
  left: 0;
  right: 0;
  background: #ffffff;
  .tab-list {
    height: 100%;
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    align-items: center;
    -webkit-box-align: centerl;
    -ms-flex-align: center;
    box-shadow: 0px 1px 7px 0px rgba(204, 204, 204, 1);
    .tab{
      flex: 1;
      height: 100%;
      display: flex;
      display: -webkit-box;
      display: -ms-flexbox;
      align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      .tab-iocn{
        height: 100%;
        width: 34px;
        margin-left: 40px;
        margin-right: 20px;
        // flex: 0 0 74px;
        display: flex;
        display: -webkit-box;
        display: -ms-flexbox;
        align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        img{
          height: 30px;
          width: 34px;
        }
      }
      .tab-name{
        flex: 1;
        font-size: 30px;
        color:rgba(102,102,102,1);
        text-align: left;
      }
      .tab-name-action{
        color:rgba(43,133,228,1);
      }
    }
    .tab:active{
      background: #cccccc;
    }
  }
}
</style>
