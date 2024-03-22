// 默认参数
export let CommonParams = {}

// 默认配置
export let CommonOption = {
  // baseURL: 'http://mb.gaoming.gov.cn:8090/gmbc/', // 测试环境
  baseURL: '/gmbc/', // 生产环境
  // baseURL: '/gmbcapi/', // 生产环境
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
}