import { ElMessage } from 'element-plus'

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
  let lastTimeStamp = 0
  return function () {
    const currentTime = new Date().getTime()
    if (currentTime - lastTimeStamp > interval) {
      const that = context
      const args = arguments
      fn.apply(that, args)
    }
    lastTimeStamp = currentTime
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