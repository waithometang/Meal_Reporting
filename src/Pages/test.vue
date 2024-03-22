<template>
  <div class="MtPopup">
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="content">
        <div class="content-list">
          <div class="title">
            <div class="title-icon">
              <img src="@/imgaes/breakfast.png" alt="">
            </div>
            <div class="title-name">早餐 (最多选5样)</div>
            <div class="price">
              ￥<span>2</span>
            </div>
          </div>
          <div class="list" v-for="(item, index) in 4" :key="index">
            <div class="icon-type">
              <div class="list-icon"></div>
              <div class="type">主食: (请二选一)</div>
            </div>
            <div class="name-list" v-for="(item, index) in 2" :key="index">
              <div class="foode foode-action">
                蛋糕
              </div>
              <div class="foode">
                包子
              </div>
            </div>
          </div>
          <div class="tishi">
            备注: 备注信息
          </div>
        </div>
        <div class="but">
          <div class="but-tab">取消</div>
          <div class="but-tab but-tab-action">确认</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { GetMyOneReport,SaveOneReport,DeleteOneReport, Getqxbc, GetToAll,Getqxfx,Cxbc } from '@/api/baocan'
import { log } from 'util'

export default {
  props:['isShow','ShowData'],
  data () {
    return {
      detailList:[],
      price:0,
      name:'',
      max:0,
      index: 2,
      remark:'',
      qcry: '',
      bcry: '',
      canShare: true,
      canEdit:false,
      popupVisible: false,
      IsRendere: false,
      closealertv:false,
      committing:false //是否正在提交数据，防止多次提交
    }
  },
  watch: {
    isShow () {
      if (this.isShow) {
        this.getReport()
        this.popupVisible = this.isShow
      } else {
        this.committing=false
        this.detailList= []
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
  methods:{
    // 选择菜单
    selectDish(rowData,dishe){
      if(this.ShowData.isOver) return
      if(rowData.xzlb==='单选'){
        rowData.dishes.forEach(el => {
          el.isSelect=false
        })
        dishe.isSelect=true
      }else{
        dishe.isSelect=!dishe.isSelect
      }
    },
    // 取消报餐 未支付下
    cancelClick(){
      if(this.committing) return
      this.committing=true
      if(this.ShowData.report_id){
        let that=this
        DeleteOneReport({id:this.ShowData.report_id})
          .then(res=>{
            if(res.data.success){
              this.changtoast('取消成功')
              this.$emit('ChangeIsshow', false)
              this.$emit('RefreshData')
            }else{
              this.changtoast(res.data.message)
            }
            that.committing=false
          })
      }else{
        this.$emit('ChangeIsshow', false)
        this.committing=false
      }
    },
    // 确认报餐
    okClick(){
      if(this.committing) return
      this.committing=true
      let cbIds=this.getSelectCp()
      let cbCount=cbIds.length
      if(cbCount===0){
        this.changtoast('请选择菜品')
        this.committing=false
      }
      else if(this.max && cbCount>this.max){
        this.changtoast('请选择不多于'+this.max+'样菜品')
        this.committing=false
      }else{
        let that=this
        let parms={report_id:this.ShowData.report_id,schedule_id:this.ShowData.schedule_id,cbIds}
        SaveOneReport(parms)
          .then(res=>{
            if(res.data.success){
              //成功报餐
              this.changtoast('报餐成功')
              this.$emit('ChangeIsshow', false)
              this.$emit('RefreshData')
            }else{
              this.changtoast(res.data.message)
            }
            that.committing=false
          })
      }
    },
    getReport(){
      let that=this
      let parms={report_id:this.ShowData.report_id,schedule_id:this.ShowData.schedule_id, qczt: this.ShowData.qczt}
      this.$emit('changeshowLi', true)
      GetMyOneReport(parms)
        .then(res=>{
          if(res.data.success){
            this.$emit('changeshowLi', false)
            this.canShare = res.data.content.canShare
            that.detailList=res.data.content.details
            that.price=res.data.content.price
            that.name=res.data.content.name
            that.remark=res.data.content.remark
            that.canEdit=res.data.content.canEdit
            that.max=res.data.content.max
            that.qcry = res.data.content.qcry
            that.bcry = res.data.content.bcry
            this.$nextTick (() => {
              this.IsRendere = true
            })
          }else{
            this.changtoast(res.data.message)
          }
        })
    },
    CxbcClick(){
      let that=this
      Cxbc({id:this.ShowData.report_id}).then(res=>{
        if(res.data.success){
          that.changtoast('现在可以重新报餐')
          that.$emit('ChangeIsshow', false)
          that.$emit('RefreshData')   
        }else{
          this.changtoast(res.data.message)
        }
      })
    },
    getSelectCp(){
      let rtnArr=[]
      for (let i = 0,len=this.detailList.length; i < len; i++) {
        for (let j = 0,len2=this.detailList[i].dishes.length; j < len2; j++) {
          if(this.detailList[i].dishes[j].isSelect) rtnArr.push(this.detailList[i].dishes[j].id)
        }
      }
      return rtnArr
    },
    // 取消报餐 支付后
    _Getqxbc () {
      let that = this
      this.showConfirm ({
        title: '提示',
        content: '是否取消报餐?',
        succeed: function () {
          Getqxbc({
            id: that.ShowData.report_id
          }).then (rps => {
            if (rps.data.success) {
              that.changtoast('取消成功')
              that.$emit('ChangeIsshow', false)
              that.$emit('RefreshData')              
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {

        }
      })
    },
    // 取消分享
    qxfx () {
      let that = this
      this.showConfirm ({
        title: '提示',
        content: '是否取消分享?',
        succeed: function () {
          Getqxfx({
            id: that.ShowData.report_id
          }).then (rps => {
            if (rps.data.success) {
              that.changtoast('取消成功')
              that.$emit('ChangeIsshow', false)
              that.$emit('RefreshData')              
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {

        }
      })
    },
    // 分享
    GetShare () {
      if (this.index == 1) {
        this.index =2
      } else {
        this.index = 1
      }
    },
    // 分享给指定的
    appointShara () {
      this.index = 2
      let that = this
      this.showConfirm ({
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
        fail: function () {

        }
      })
    },
    // 一键
    entireShara () {
      this.index = 2
      let that = this
      this.showConfirm ({
        title: '提示',
        content: '是否分享?',
        succeed: function () {
          GetToAll ({
            id: that.ShowData.report_id
          }).then (rps => {
            if (rps.data.success) {
              that.changtoast('分享成功')
              that.closealertv = true
            } else {
              that.changtoast(rps.data.message)
            }
          })
        },
        fail: function () {

        }
      })
    },
    quexiao () {
      this.index = 2
    },
    close () {
      this.closealertv = false
      this.$emit('RefreshData')
      this.$emit('ChangeIsshow', false)
    },
  },
}
</script>

<style lang='scss' scoped type="test/css">
@import '@/Style/MtPopup_v1.scss'
</style>
