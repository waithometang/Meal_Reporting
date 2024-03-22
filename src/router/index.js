import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const home = resolve => require(['@/Pages/home'], resolve)
const Login = resolve => require(['@/Pages/Login.vue'], resolve)
const History = resolve => require(['@/Pages/History_v1'], resolve)
const SelectContact = resolve => require(['@/Pages/SelectContact_v1'], resolve)
const Satisfaction = resolve => require(['@/Pages/Satisfaction_v1'], resolve)
const SettleAccounts = resolve => require(['@/Pages/SettleAccounts'], resolve)
const TakeFoodCode = resolve => require(['@/Pages/TakeFoodCode'], resolve)
const ceshiHome = resolve => require(['@/baocan/ceshiHome'], resolve)
const TakeFoodDetails = resolve => require(['@/Pages/TakeFoodDetails'], resolve)
const payment = resolve => require(['@/baocan/payment'], resolve)
const Unclaimed = resolve => require(['@/Pages/Unclaimed_v1'], resolve)
const test = resolve => require(['@/Pages/test'], resolve)
const PaySuccess = resolve => require(['@/Pages/PaySuccess'], resolve)

let router = new Router({
  base: '/gmbc/',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title: '测试页面'
      }
    },
    { // 报餐
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '首页',
        index: 0
      }
    },
    { // 报餐
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '首页',
        index: 1,
        keepAlive: true
      }
    },
    { // 登录
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '智慧饭堂',
        index: 2
      }
    },
    { // 历史记录
      path: '/History',
      name: 'History',
      component: History,
      meta: {
        title: '历史记录',
        index: 3
      }
    },
    { // 点评打分
      path: '/Satisfaction',
      name: 'Satisfaction',
      component: Satisfaction,
      meta: {
        title: '点评打分',
        index: 4
      }
    },
    { // 结算
      path: '/SettleAccounts',
      name: 'SettleAccounts',
      component: SettleAccounts,
      meta: {
        title: '结算',
        index: 5,
      }
    },
    { // 取餐二维码
      path: '/TakeFoodCode',
      name: 'TakeFoodCode',
      component: TakeFoodCode,
      meta: {
        title: '取餐二维码',
        index: 6
      }
    },
    {
      path: '/TakeFoodDetails',
      name: 'TakeFoodDetails',
      component: TakeFoodDetails,
      meta: {
        title: '取餐详情',
        index: 7
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: {
        title: '支付详情',
        index: 8
      }
    },
    {//选择联系人
      path: '/SelectContact',
      name: 'SelectContact',
      component: SelectContact,
      meta: {
        title: '选择联系人',
        index: 9
      }
    },
    {//领餐
      path: '/Unclaimed',
      name: 'Unclaimed',
      component: Unclaimed,
      meta: {
        title: '领取订餐',
        index: 9
      }
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        title: '支付成功'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
  document.title = to.meta.title
  }
  next()
 })

export default router
