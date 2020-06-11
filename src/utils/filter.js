import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('transBusSysCode', function (dataStr) {
  let val
  if (dataStr === '1') {
    val = '系统1'
  }
  if (dataStr === '2') {
    val = '系统2'
  }
  if (dataStr === '3') {
    val = '系统3'
  }
  if (dataStr === '4') {
    val = '系统4'
  }
  if (dataStr === '5') {
    val = '系统5'
  }
  if (dataStr === '6') {
    val = '系统6'
  }
  return val
})

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function (value, vlength = 25) {
  if (!value) {
    return ''
  }
  console.log('vlength: ' + vlength)
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})
