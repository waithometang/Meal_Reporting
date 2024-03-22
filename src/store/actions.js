export default {
  alertToast ({commit}, msg) {
    var type = Object.prototype.toString.call(msg)
    // 判断参数是否是字符串或数组
    if (type == '[object String]' || type == '[object Number]') {
      dos(commit, msg)
    } else {
      if (msg.startFun) { msg.startFun() }
      dos(commit, msg.message, msg.endFun)
    }
  },
  alertConfirm ({commit}, setting) {
    commit('changeShowConfirm', true)
    commit('changeConfirmTitle', setting.title || '')
    commit('changeConfirmText', setting.content || '')
    commit('changeConfirmSucceed', setting.succeed || function () {})
    commit('changeConfirmFail', setting.fail || function () {})
    commit('changeConfirmFailText', setting.failText || '取消')
    commit('changeConfirmSucceedText', setting.succeedText || '确定')
    commit('changeConfirmHideCancel', setting.hideCancel || false)
  }
}

function dos (commit, msg, endFun) {
  commit('changeShowToast', true)
  commit('changeToastMsg', msg)
  setTimeout(() => {
    commit('changeShowToast', false)
    if (endFun) { endFun() }
  }, 1500)
}
