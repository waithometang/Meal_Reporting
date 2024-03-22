<template>
<transition name="fade">
  <div class="Pub_alert" v-if="ShowConfirm">
      <div class="Pub_alert_main">
        <div class="Pub_alert_title">{{confirmTitle}}</div>
        <div class="Pub_alert_Pages">{{confirmText}}</div>
        <div class="Pub_alert_select">
          <div @click="_confirm(true)">确定</div>
          <div @click="_confirm(false)">取消</div>
        </div>
      </div>
  </div>
  </transition>
</template>
<script>
export default {
  computed: {
    ShowConfirm () {
      return this.$store.state.ShowConfirm
    },
    confirmTitle () {
      return this.$store.state.ConfirmTitle
    },
    confirmText () {
      return this.$store.state.ConfirmText
    },
    hideCancel () {
      return this.$store.state.ConfirmHideCancel
    },
    succeedText () {
      return this.$store.state.ConfirmSucceedText
    },
    failText () {
      return this.$store.state.ConfirmFailText
    }
  },
  methods: {
    _confirm (item) {
      if (item) {
        this.$store.state.ConfirmSucceed()
      } else {
        this.$store.state.ConfirmFail()
      }
      this.$store.commit('changeShowConfirm', false)
    }
  }
}
</script>

<style lang="scss" scoped> 
.Pub_alert {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 2s;
  -moz-transition: opacity 2s; /* Firefox 4 */
  -webkit-transition: opacity 2s; /* Safari 和 Chrome */
  -o-transition: opacity 2s; /* Opera */
  .Pub_alert_main {
    width: 650px;
    background: #ffffff;
    border-radius: 10px;
    .Pub_alert_title {
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      margin-top: 30px;
    }
    .Pub_alert_Pages {
      text-align: center;
      font-size: 30px;
      margin-top: 32px;
      padding: 0px 20px 0px 20px;
    }
    .Pub_alert_select {
      display: flex;
      font-size: 30px;
      justify-content: space-around;
      margin-top: 42px;
      border-top:1px solid #cccccc;
      div {
        border-right: 0.013333rem solid #dddddd;
        border-top: 0.013333rem solid #dddddd;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        padding: 12px 0px 12px 0px;
        width: 650px;
        &:last-child {
          border-right: none;
        }
        &:active {
          background: #999999;
        }
      }

    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
