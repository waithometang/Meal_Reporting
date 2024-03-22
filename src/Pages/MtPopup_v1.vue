<template>
  <div class="MtPopup" v-cloak>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="content" v-if="IsRendere">
        <div class="title">
          <div class="title-icon">
            <img src="@/imgaes/breakfast.png" alt="" />
          </div>
          <div class="title-name">{{ name }} (最多选{{ this.max }}样)</div>
          <div class="price">
            ￥<span>{{ price }}</span>
          </div>
        </div>
        <div class="remind">
          <div><img src="@/imgaes/remind.png" alt="" /></div>
          <p>{{ remind }}</p>
        </div>
        <div
          class="content-list"
          :class="{ 'content-list-action': ShowData.qczt == 3 }"
        >
          <div class="list" v-for="(item, index) in detailList" :key="index">
            <div class="icon-type">
              <div class="list-icon"></div>
              <div class="type">{{ item.category }}: ({{ item.xzlb }})</div>
            </div>
            <div class="name-list">
              <div
                class="foode"
                :class="{ 'foode-action': dishe.isSelect }"
                v-for="(dishe, ii) in item.dishes"
                :key="ii"
                @click="selectDish(item, dishe)"
              >
                <span class="redMark" v-if="dishe.special">*</span
                >{{ dishe.name }}
              </div>
            </div>
          </div>
          <div class="tishi" v-if="remark">备注: {{ remark }}</div>
          <div class="fromName" v-if="qcry">
            <div class="from">分享人: {{ bcry }}</div>
            <div class="from">领取人: {{ qcry }}</div>
          </div>
        </div>
        <div class="but" v-if="ShowData.qczt == 0 || ShowData.qczt == 1">
          <div class="but-tab" @click="cancelClick">
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 取消报餐 </span>
          </div>
          <div class="but-tab but-tab-action" @click="okClick">
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 确 认 </span>
          </div>
        </div>
        <div class="but" v-else-if="ShowData.qczt == 2 && canShare">
          <div class="but-tab" @click="_Getqxbc" v-if="!ShowData.isOver">
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 取消报餐 </span>
          </div>
          <div
            class="but-tab but-tab-action"
            :class="{ 'but-tab-li': ShowData.isOver }"
            @click="GetShare"
          >
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 分 享 </span>
          </div>
        </div>
        <div class="but" v-else-if="ShowData.qczt == 4">
          <div class="but-tab but-tab-li" @click="qxfx">
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 取消分享 </span>
          </div>
        </div>
        <div class="but" v-else-if="ShowData.qczt == 5 && !ShowData.isOver">
          <div class="but-tab but-tab-li" @click="CxbcClick">
            <mt-spinner
              type="triple-bounce"
              color="yellow"
              :size="40"
              v-if="committing"
            ></mt-spinner>
            <span v-else> 重新报餐 </span>
          </div>
        </div>
      </div>
    </mt-popup>
    <div :class="{ hide: index == 2 }" class="my_popup">
      <div class="share_Buttom" @click="appointShara()">分享给指定的人</div>
      <div class="share_Buttom" @click="entireShara()">一键分享</div>
      <div class="share_Buttom" @click="quexiao()">取消</div>
    </div>
    <transition name="fade">
      <div class="alert" v-if="closealertv">
        <div>
          <div class="img-mian">
            <img src="@/imgaes/img_01.png" />
            <p>分享成功</p>
          </div>
          <div class="close" @click="close">
            <img src="@/imgaes/close.png" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  GetMyOneReport,
  SaveOneReport,
  DeleteOneReport,
  Getqxbc,
  GetToAll,
  Getqxfx,
  Cxbc
} from '@/api/baocan'
import { log } from 'util'

export default {
  props: ['isShow', 'ShowData'],
  data () {
    return {
      detailList: [],
      price: 0,
      name: '',
      max: 0,
      index: 2,
      remark: '',
      qcry: '',
      bcry: '',
      canShare: true,
      canEdit: false,
      popupVisible: false,
      IsRendere: false,
      closealertv: false,
      committing: false, //是否正在提交数据，防止多次提交
      remind: ''
    }
  },
  watch: {
    isShow () {
      if (this.isShow) {
        this.getReport()
        this.popupVisible = this.isShow
      } else {
        this.committing = false
        this.detailList = []
        this.popupVisible = this.isShow
        this.IsRendere = false
      }
    },
    popupVisible () {
      if (!this.popupVisible) {
        this.$emit('ChangeIsshow', false)
      }
    }
  },
  methods: {
    // 选择菜单
    selectDish (rowData, dishe) {
      if (this.ShowData.isOver) return
      if (rowData.xzlb === '单选') {
        rowData.dishes.forEach(el => {
          el.isSelect = false
        })
        dishe.isSelect = true
      } else {
        if (!dishe.isSelect) {
          if (dishe.special) {
            //取消非特选项
            rowData.dishes.forEach(el => {
              el.isSelect = false
            })
          } else {
            //取消特选项
            rowData.dishes.some(val => {
              if (val.special) {
                val.isSelect = false
                return true
              }
              return false
            })
          }
        }
        dishe.isSelect = !dishe.isSelect
      }
    },
    // 取消报餐 未支付下
    cancelClick () {
      if (this.committing) return
      this.committing = true
      if (this.ShowData.report_id) {
        let that = this
        DeleteOneReport({ id: this.ShowData.report_id }).then(res => {
          if (res.data.success) {
            this.changtoast('取消成功')
            this.$emit('ChangeIsshow', false)
            this.$emit('RefreshData')
          } else {
            this.changtoast(res.data.message)
          }
          that.committing = false
        })
      } else {
        this.$emit('ChangeIsshow', false)
        this.committing = false
      }
    },
    // 确认报餐
    okClick () {
      if (this.committing) return
      this.committing = true
      let cbIds = this.getSelectCp()
      if (!cbIds) {
        this.committing = false
        return
      }
      let cbCount = cbIds.length
      if (cbCount === 0) {
        this.changtoast('请选择菜品')
        this.committing = false
      } else if (this.max && cbCount > this.max) {
        this.changtoast('请选择不多于' + this.max + '样菜品')
        this.committing = false
      } else {
        let that = this
        let parms = {
          report_id: this.ShowData.report_id,
          schedule_id: this.ShowData.schedule_id,
          cbIds
        }
        SaveOneReport(parms).then(res => {
          if (res.data.success) {
            //成功报餐
            this.changtoast('报餐成功')
            this.$emit('ChangeIsshow', false)
            this.$emit('RefreshData')
          } else {
            this.changtoast(res.data.message)
          }
          that.committing = false
        })
      }
    },
    getReport () {
      let that = this
      let parms = {
        report_id: this.ShowData.report_id,
        schedule_id: this.ShowData.schedule_id,
        qczt: this.ShowData.qczt
      }
      this.$emit('changeshowLi', true)
      GetMyOneReport(parms).then(res => {
        if (res.data.success) {
          this.$emit('changeshowLi', false)
          this.canShare = res.data.content.canShare
          that.detailList = res.data.content.details
          that.price = res.data.content.price
          that.name = res.data.content.name
          that.remark = res.data.content.remark
          that.canEdit = res.data.content.canEdit
          that.max = res.data.content.max
          that.qcry = res.data.content.qcry
          that.bcry = res.data.content.bcry
          this.$nextTick(() => {
            this.IsRendere = true
          })
        } else {
          this.changtoast(res.data.message)
        }
      })
    },
    CxbcClick () {
      let that = this
      Cxbc({ id: this.ShowData.report_id }).then(res => {
        if (res.data.success) {
          that.changtoast('现在可以重新报餐')
          that.$emit('ChangeIsshow', false)
          that.$emit('RefreshData')
        } else {
          this.changtoast(res.data.message)
        }
      })
    },
    getSelectCp () {
      console.log('result', this.detailList)
      let rtnArr = []
      let rowSelCount = 0 //单行选择的菜品数
      let hasTxx = false //是否选择了特选项
      let _dishe, txxName
      for (let i = 0, len = this.detailList.length; i < len; i++) {
        rowSelCount = 0
        hasTxx = false
        txxName = ''
        for (
          let j = 0, len2 = this.detailList[i].dishes.length;
          j < len2;
          j++
        ) {
          _dishe = this.detailList[i].dishes[j]
          if (_dishe.isSelect) {
            rtnArr.push(_dishe.id)
            rowSelCount++
            if (_dishe.special) {
              hasTxx = true
              txxName = _dishe.name
            }
          }
        }
        //选择了特选项，只能选一样
        if (hasTxx && rowSelCount > 1) {
          this.changtoast(
            txxName + '是特选项,选择它的同时不能选择同类的其它菜品'
          )
          return null
        }
      }
      return rtnArr
    },
    // 取消报餐 支付后
    _Getqxbc () {
      let that = this
      this.showConfirm({
        title: '提示',
        content: '是否取消报餐?',
        succeed: function () {
          Getqxbc({
            id: that.ShowData.report_id
          }).then(rps => {
            if (rps.data.success) {
              that.changtoast('取消成功')
              that.$emit('ChangeIsshow', false)
              that.$emit('RefreshData')
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {}
      })
    },
    // 取消分享
    qxfx () {
      let that = this
      this.showConfirm({
        title: '提示',
        content: '是否取消分享?',
        succeed: function () {
          Getqxfx({
            id: that.ShowData.report_id
          }).then(rps => {
            if (rps.data.success) {
              that.changtoast('取消成功')
              that.$emit('ChangeIsshow', false)
              that.$emit('RefreshData')
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {}
      })
    },
    // 分享
    GetShare () {
      if (this.index == 1) {
        this.index = 2
      } else {
        this.index = 1
      }
    },
    // 分享给指定的
    appointShara () {
      this.index = 2
      let that = this
      this.showConfirm({
        title: '提示',
        content: '是否分享?',
        succeed: function () {
          that.$router.push({
            path: '/SelectContact',
            query: {
              id: that.ShowData.schedule_id,
              sharaId: that.ShowData.report_id
            }
          })
        },
        fail: function () {}
      })
    },
    // 一键
    entireShara () {
      this.index = 2
      let that = this
      this.showConfirm({
        title: '提示',
        content: '是否分享?',
        succeed: function () {
          GetToAll({
            id: that.ShowData.report_id
          }).then(rps => {
            if (rps.data.success) {
              that.changtoast('分享成功')
              that.closealertv = true
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {}
      })
    },
    quexiao () {
      this.index = 2
    },
    close () {
      this.closealertv = false
      this.$emit('RefreshData')
      this.$emit('ChangeIsshow', false)
    }
  },
  created () {
    this.$post('api/fx/Hint').then(res => {
      this.remind = res.data.message
      // console.log(this.remind)
    })
  }
}
</script>

<style lang="scss" scoped type="test/css">
[v-cloak] {
  display: none !important;
}
@import '@/Style/MtPopup_v1.scss';
</style>
