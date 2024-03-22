<template>
  <div class="SelectContact">
    <HreadStatusBar :GMBC_backtracktype="true" :GMBC_isShow="false"></HreadStatusBar>
    <div class="Select">
      <div>
        <img src="../imgaes/search.png"/>
        <input type="text" placeholder="请输入联系人"/>
      </div>
    </div>
    <div class="Contacts">
      <div @click="select(index, item)" clas="list" v-for="(item,index) in listData" :key="index">
       <div><img src="../imgaes/touxiang.png"/>{{item.name}}</div> 
       <div><img :src="isselect==index ? chabox_i:chabox"/></div>
      </div>
    </div>
    <div class="fot">
      <div class="but" @click="_GetToOne">
        分享
      </div>
    </div>
    <transition name="fade">
      <div class="alert" v-if="closealert">
        <div>
          <div class="img-mian">
            <img src="@/imgaes/share.png">
            <p>分享成功</p>
          </div>
          <div class="close" @click="closea">
            <img src="@/imgaes/close.png">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import HreadStatusBar from './HreadStatusBar'
import { Getklcry, GetToOne } from '@/api/baocan'
export default {
    data(){
    return {
      isselect:999,
      chabox:require('@/imgaes/Checkbox.png'),
      chabox_i:require('@/imgaes/Checkbox_i.png'),
      listData: [],
      ryid: '',
      closealert:false
    }
  },
  components: {
    HreadStatusBar
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods : {
    select (index, item) {
      this.isselect=index
      this.ryid = item.id
    },
    closea(){this.closealert=false},
    _GetToOne () {
      if (!this.ryid) {
        this.$toast('请选择分享人员')
        return
      }
      GetToOne({
        bcid: this.id,
        ryid: this.ryid
      }).then (rps => {
        if (rps.data.success) {
          this.closealert = true;
        } else {
          this.$toast(rps.data.message)
        }
      })
    },
    _Getklcry () {
      Getklcry ({
        id: this.id
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.$toast(rps.data.message)
        }
      })
    }
  },
  created () {
    this._Getklcry()
  }
}
</script>

<style lang="scss" scoped>
@import "@/Style/SelectContact.scss";
</style>
