export default {
  loginname: '',
  BottomTagType: 1, // 底部导航栏状态标识
  MtPopupData: '', // 弹出框传递参数
  DisplayTimeData: '', // 选中的时间
  StartTime: '', // 开始时间
  EndTime: '', // 结束时间
  RefreshData: false, // 是否刷新数据重新渲染
  HomeInitData: '', // 首页请求获取的新数据
  TopTagData: 2, // 记录顶部导航栏支付前的状态
  AddWeekData: 0, // 记录支付前订餐周的状态
  PaymentIp: '', // 记录支付是需要的ip
  LoadingShow: false, // 支付中loading
  ShowConfirm: false, // 显示弹框
  ConfirmTitle: '', // 弹框标题
  ConfirmText: '', // 弹框内容
  ConfirmSucceed: function () { }, // 成功函数
  ConfirmFail: function () { }, // 失败函数
  ConfirmFailText: '取消', // 取消按钮文本
  ConfirmSucceedText: '确认', // 失败按钮文本
  ConfirmHideCancel: false, //
  TakeFood_AddDays: 0,//取餐页面前进的天数
  OrderFood_AddWeeks: 0,//取餐页面前进的天数
}