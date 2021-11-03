import axios from 'axios'
import qs from 'qs'
import store from '../store/index'

export const apiBaseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/api/v1'
// export const apiBaseURL = `http://localhost:3000/api/v1`

// export const apiBaseURL = `//${window.location.host}/api/v1`;
// export const baseURL = `//${window.location.host}/signing-up`;

export const mHttpConfig = {
  warn: 0,
}

export const http = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
  withCredentials: true,
})

http.defaults.headers.post['Content-Type'] = 'application/json'
// let token = localStorage.getItem('token')
// if (token) http.defaults.headers.common['token'] = token
// try {
//   let token = localStorage.getItem('token')
//   if (token) http.defaults.headers.post['token'] = token
// } catch (error) {
//   // do nothing
// }

http.interceptors.request.use(
  config => {
    const token = store.getters.getToken
    config.headers.token = token
    return config
  },
)

http.interceptors.response.use(
  response => {
    const { data } = response
    const { code, msg } = data
    switch (code) {
      case 0:
        return data
      case 10002:
        // token error
        console.log('wrong token, please relogin')
        return { code, msg }
      default:
        // if (mHttpConfig.warn === 0) {
        //   ElMessage.error('网络错误：' + msg);
        // }
        // throw msg;
        return data
    }
  },
  error => error,
)

/**
 * get request
 */
export const get = (url, params) => {
  if (!params) return http.get(url)
  let count = 1
  for (let attr in params) {
    url += count == 1 ? '?' : '&' 
    url += (attr + '=' + params[attr])
    count++
  }
  return http.get(url)
}

/**
 * post request
 */
export const post = (url, params) => {
  return http.post(url, params)
}

/**
 * file uploader
 */
export const uploadFiles = (url, files, param) => {
  // const file = e.target.files[0]
  const formData = new FormData()
  for (let p of param) formData.append(p.prop, p.value)
  for (let file of files) formData.append('file', file)
  return http.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
  })
}