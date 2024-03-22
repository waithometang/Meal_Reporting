import Axios from '@/api/axios'

//我的报餐
export function GetMyReport (SettingData) {
  let url = 'api/BaoCan/GetMyReport'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的单项报餐
export function GetMyOneReport (SettingData) {
  let url = 'api/BaoCan/GetMyOneReport'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//保存单项报餐
export function SaveOneReport (SettingData) {
  let url = 'api/BaoCan/SaveOneReport'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//取消单项报餐
export function DeleteOneReport (SettingData) {
  let url = 'api/BaoCan/DeleteOneReport'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的结算项
export function MySettlement (SettingData) {
  let url = 'api/BaoCan/MySettlement'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//测试结算
export function PayTest (SettingData) {
  let url = 'api/BaoCan/PayTest'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的取餐
export function MyTakeMeal (SettingData) {
  let url = 'api/BaoCan/MyTakeMeal'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的评价列表
export function EvaluationList (SettingData) {
  let url = 'api/BaoCan/EvaluationList'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的本年订餐记录
export function ConsumeRecord (SettingData) {
  let url = 'api/BaoCan/ConsumeRecord'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的本周订餐记录
export function MyRecordOfWeek (SettingData) {
  let url = 'api/BaoCan/MyRecordOfWeek'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的满意度评分
export function MySatisfaction (SettingData) {
  let url = 'api/BaoCan/MySatisfaction'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}
//我的满意度评分
export function SetSatisfaction (SettingData) {
  let url = 'api/BaoCan/SetSatisfaction'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}

// 我的历史报餐记录
export function MyHistory (SettingData) {
  let url = 'api/BaoCan/MyHistory'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
// 登录
export function Login (SettingData) {
  let url = 'api/BaoCan/Login'
  let data = SettingData
  return Axios ({
    url,
    data
  })
}
// 我的每月订餐记录
export function MyHistoryOfMonth (SettingData) {
  let url = 'api/BaoCan/MyHistoryOfMonth'
  let data = SettingData
  return Axios ({
    url,
    data
  })
}

// 获取取餐结果
export function IsTake (SettingData) {
  let url = 'api/BaoCan/IsTake'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}

//获取支付信息
export function GetPayInfo (SettingData) {
  let url = 'api/Wechat/GetPayInfo'
  let data = SettingData
  
  return Axios ({
    url,
    data
  })
}

// 获取支付详情

export function QueryJsxx (SettingData) {
  let url = '/api/Wechat/QueryJsxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 余额支付
export function GetYezf (SettingData) {
  let url = 'api/baocan/Yezf'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取分享列表
export function Getklcry (SettingData) {
  let url = '/api/fx/klcry'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 一键分享
export function GetToAll (SettingData) {
  let url = 'api/fx/ToAll'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 分享给指定的人
export function GetToOne (SettingData) {
  let url = 'api/fx/ToOne'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取三餐分享总数
export function GetShareListSummary (SettingData) {
  let url = 'api/fx/ShareListSummary'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取分享列表
export function ShareList (SettingData) {
  let url = 'api/fx/ShareList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
// 取消分享
export function Getqxfx (SettingData) {
  let url = 'api/fx/CancelShare'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}


// 获取单餐支付用的信息
export function GetPayInfoOfOne (SettingData) {
  let url = 'api/Wechat/GetPayInfoOfOne'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 重新报餐
export function Cxbc (SettingData) {
  let url = 'api/baocan/cxbc'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 领取分享

export function TakeShare (SettingData) {
  let url = 'api/fx/TakeShare'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 我的分享

export function MyShare (SettingData) {
  let url = 'api/fx/MyShare'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 取消已支付报餐

export function Getqxbc (SettingData) {
  let url = 'api/baocan/qxbc'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取取餐二维码

export function GetCode (SettingData) {
  let url ='api/baocan/GetCode'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 查看记录
export function Getcqtj (SettingData) {
  let url = 'api/baocan/cqtj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}