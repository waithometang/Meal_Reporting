<template>
  <div class="Login">
    <div class="password-content">
      <div class="password-tab">
        <div class="tab-icon">
          <img src="@/imgaes/zhanghao.png" />
        </div>
        <div class="tab-input">
          <input
            placeholder="请输入账号"
            type="text"
            v-model="account"
            @focus="clickAccount"
          />
        </div>
        <div class="tab-icon" @click="empty">
          <img src="@/imgaes/shanchu.png" />
        </div>
      </div>
      <div class="password-tab">
        <div class="tab-icon">
          <img src="@/imgaes/mima.png" />
        </div>
        <div class="tab-input">
          <input
            placeholder="请输入密码"
            type="password"
            v-model="pwd"
            @focus="focus"
          />
        </div>
      </div>
      <div class="vertify-code" v-if="!isShowCode">
        <input type="number" v-model="code" placeholder="请输入验证码" />
        <div class="img-code" @click="changeUrl">
          <img :src="imgUrl" alt="" />
        </div>
      </div>
      <div class="password-tab password-tab-but" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import { Login } from '@/api/baocan'
import { setTimeout } from 'timers'
import { Indicator } from 'mint-ui'
import { storage } from '@/common/js/until'
import { rejects } from 'assert'
import { log } from 'util'
import md5 from 'js-md5'
export default {
  data() {
    return {
      account: '',
      pwd: '',
      switchoverWeekData: false,
      // imgUrl: '/gmbcapi/api/baocan/MixVerifyCode', // 测试
      imgUrl: '/gmbc/api/baocan/MixVerifyCode', // 正式
      code: '',
      isShowCode: false
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {
    if (storage.fetch('password').data) {
      this.pwd = storage.fetch('password').data
    }
    if (storage.fetch('account').data) {
      this.account = storage.fetch('account').data
    }
    if (storage.fetch('name').data) {
      this.isShowCode = true
    }
  },
  methods: {
    changeUrl() {
      // let oldUrl = '/gmbcapi/api/baocan/MixVerifyCode' // 测试
      let oldUrl = '/gmbc/api/baocan/MixVerifyCode' // 正式
      let time = new Date().getTime()
      this.imgUrl = oldUrl + '?time' + time
    },
    // 当点击密码输入框时 清空缓存的密码，输入框的mode
    focus: function () {
      this.pwd = ''
      storage.remove('password')
    },
    clickAccount: function () {
      this.account = ''
      storage.remove('account')
    },
    cors1() {
      this.switchoverWeekData = false
    },
    cors() {
      this.switchoverWeekData = true
    },
    // 清除输入的账号
    empty() {
      this.account = ''
    },
    // 登录
    login() {
      if (!this.isShowCode) {
        if (!this.code) {
          this.changtoast('请输入验证码')
          return
        }
      }
      let encryptedPassword = md5(this.pwd)
      storage.save('password', this.pwd)
      storage.save('account', this.account)
      storage.remove('token')
      Indicator.open('正在登陆')
      Login({
        Account: this.account,
        Password: encryptedPassword,
        code: this.code || ''
      }).then(
        res => {
          Indicator.close()
          if (res.data.success) {
            storage.save('name', this.account)
            // that.$toast('登录成功')
            storage.save('token', res.data.content.token)
            this.$store.commit('SET_LOGINNAME', res.data.content.name)
            this.$store.commit('SET_LOGINTIME', res.data.content.time)
            this.$router.push({
              path: '/home',
              query: {
                isblock: true
              }
            })
          } else {
            storage.remove('name')
            this.isShowCode = false
            this.changeUrl()
            this.changtoast(res.data.message)
          }
        },
        rejects => {
          // 请求超时重新登录
          this.login()
        }
      )
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/Style/Login_v1.scss';
</style>