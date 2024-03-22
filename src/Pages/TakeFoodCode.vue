<!-- 取餐二维码 -->
<template>
  <div class="TakeFoodCode">
    <div class="topNavigation">
      <div class="images" @click="backingout">
        <img src="@/imgaes/fanhui.png">
      </div>
      <div class="title">扫码取餐</div>
    </div>
    <div class="content">
      <div class="name">
        请将二维码对准扫码终端
      </div>
      <div class="QRCode">
        <canvas class='canvas' ref="qrcodeImage" id='qrcodeImage'></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { IsTake, GetCode } from '@/api/baocan'

export default {
  data () {
    return {
      Isstop: 1,
      iscontent: '',
      activeTime: 0,
    }
  },
  watch: {
    Isstop () {
      if (this.Isstop == 0) {
        this.$router.replace({
          path:'/TakeFoodDetails',
          query: {
            iscontent: this.iscontent
          }
        })
      }
    }
  },
  computed: {
    code () {
      return this.$route.query.code
    },
    id () {
      return this.$route.query.id
    }
  },
  mounted () {
    this.initQRCode()
    this._IsTake()
  },
  methods: {
    initQRCode () {
      if (!this.code) {
        return
      }
      GetCode ({
        id: this.id
      }).then (rps => {
        if (rps.data.success) {
          this.activeTime = rps.data.content.activeTime
          let qrcodeImage = document.getElementById('qrcodeImage')
          QRCode.toCanvas(qrcodeImage, rps.data.content.code, function (error) {
            if (error) console.error(error)
          })
          setTimeout(() => {
            this.initQRCode()
          }, this.activeTime*60000);
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    _IsTake () {
      if(!this.id) return  //防止页面后退后继续请求
      IsTake ({
        id: this.id
      }).then(rps => {
        if (rps.data.content == true) {
          this.Isstop = 0
          this.iscontent = rps.data.content
        } else {
          this.Isstop++
          setTimeout(() => {
            this._IsTake()
          }, 6500);
        }
      })
    },
    backingout () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss'>
@import '@/Style/TakeFoodCode.scss';
</style>
