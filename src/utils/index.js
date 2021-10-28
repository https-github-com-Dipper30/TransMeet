import { ElMessage } from 'element-plus'

/**
 * check if the result from request is instance of Error
 * if true, notify error and return false
 * else notify success message and return true
 * @param {any} res 
 * @param {boolean} notifySuccess 
 * @returns 
 */
export const handleResult = (res, notifySuccess = true) => {
  if (isError(res)) {
    ElMessage({
      message: res.msg,
      type: 'error',
    })
    return false
  } else {
    if (notifySuccess) {
      ElMessage({
        message: res.msg || 'Success!',
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