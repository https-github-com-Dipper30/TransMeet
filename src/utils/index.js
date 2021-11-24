import { ElMessage } from 'element-plus'
// import { errCode } from '../config/index.ts'
import router from '../router'

/**
 * check if the result from request is instance of Error
 * if true, notify error and return false
 * else notify success message and return true
 * @param {any} res 
 * @param {boolean} notifySuccess 
 * @returns 
 */
export const handleResult = (res, notifySuccess = true, notifyMessage = 'Success!') => {
  if (isError(res)) {
    if (res?.code == 10003) {
      router.push('/no-auth')
    }
    ElMessage({
      message: res.msg,
      type: 'error',
    })
    return false
  } else {
    if (notifySuccess) {
      ElMessage({
        message: notifyMessage,
        type: 'success',
      })
    }
    return true
  }
}

/**
 * check if the parameter is an Error
 * @param {any} p  
 * @returns boolean
 */
export const isError = p => {
  return p?.code != 200 && p?.code != 201
}

export const debounce = (fn, interval, context) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      const that = context
      const args = arguments
      fn.apply(that, args)
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}

/**
 * check if string is numeric
 * @param {string} s
 * @returns boolean
 */
export const stringIsNumeric = (s) => {
  const stringIsDigit = /^\d+$/
  return stringIsDigit.test(s)
}

/**
 * check if parameter is number
 * @param {any} p
 * @returns boolean
 */
 export const isNumber = (p) => {
  return typeof p == 'number'
}

/**
 * return the unix timestamp of a date
 * @param {Date} date 
 * @returns {number} unix timestamp
 */
export const getUnixTimeStamp = (date) => {
  return Math.floor(new Date(date).getTime() / 1000)
}

export const getTimeStamp = (date) => {
  return new Date(date).getTime()
}

 // get height and width of viewport
export const getWindowHeight = () => { 
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
} 

export const getWindowWidth = () => { 
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export const getWindowPath = () => {
  const { location } = window
  const { pathname, search } = location
  return { pathname, param: getUrlParam(search) }
}

export const getUrlParam = (url) => {
  const exp = /(?<=\?|&)(?<k>\w+)=(?<v>\w+)/g
  let res = url.matchAll(exp)
  return [...res]
}