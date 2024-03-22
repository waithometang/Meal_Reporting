import OriginAxios from 'axios'
import {CommonParams, CommonOption} from '@/api/config'
import { storage } from '@/common/js/until.js'
import Vm from '@/main.js'
//拦截器`

OriginAxios.interceptors.response.use(
  response => {
    if(!response.data.success){
    }
    return response; 
  },
  error => {
    // console.log(error)
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Vm.changtoast('网络无响应，请重试')
      Vm.$store.commit('SET_LoadingShow', false)
      Vm.$indicator.close()
    }
    if(error.response.status==401){
      // 身份验证不通过
      Vm.changtoast('登录过期请重新登录')
      Vm.$router.push({
        path: '/Login'
      })
    }
  })

export default function axios (SettingOptions) {
  let Token=storage.fetch('token').data
  if (Token) {
    CommonOption.headers.Authorization = 'Bearer '+ Token
  }
  function isEmpty (obj) {
    return obj != undefined ? obj : {}
  }
  let option = {
    url: SettingOptions.url,
    data: Object.assign({}, CommonParams, isEmpty(SettingOptions.data)),
    ...Object.assign({}, CommonOption, isEmpty(SettingOptions.config))
  }
  return OriginAxios(option)
}