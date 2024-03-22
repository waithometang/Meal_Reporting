
// 缓存管理
export const storage = {
  save (key, value) {
    let saveTime = new Date().getTime()
    let data = JSON.stringify(value)
    let savaData = JSON.stringify({ data, saveTime })
    localStorage.setItem(key, savaData)
  },
  fetch (key, exp) {
    // code: 1正常 2 没有获取到数据 3数据过期
    let data = JSON.parse(localStorage.getItem(key))
    if (data) {
      data.data = JSON.parse(data.data)
    }

    let returnData = null
    if (data) {
      data.code = 1
      returnData = data
    } else {
      returnData = { data: '', code: 2 }
    }
    if (exp && returnData.code != 2) {
      let fetchTime = new Date().getTime()
      let saveTime = returnData.saveTime
      let countTime = fetchTime - saveTime
      let returnTime = exp - countTime
      if (countTime >= exp) {
        // 信息过期
        return { data: '', code: 3, returnTime }
      } else {
        returnData.returnTime = returnTime
        return returnData
      }
    } else {
      return returnData
    }
  },
  remove (key) {
    localStorage.removeItem(key)
  }
}

/*通过正则获取url中的参数*/
function getUrlParam(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return decodeURI(r[2]); return null;
}

