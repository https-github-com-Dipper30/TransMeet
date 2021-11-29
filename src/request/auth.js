import { http, get, post } from './http'

// Auth
/**
 * Login API
 * @param {string} username
 * @param {string} password 
 * @returns 
 */
export const login = params => {
  return http.post('/login', params)
}

/**
 * Register API
 * @param {string} username
 * @param {string} password 
 * @returns 
 */
export const register = params => {
  return http.post('/register', params)
}

/**
 * login using token stored locally
 * @returns user info
 */
export const loginByToken = () => {
  return http.post('/token')
}

export const updateUserInfo = (p) => {
  return http.post('/updateUserInfo', p)
}

/**
 * get user info by id
 * @param { uid: number } p 
 */
export const getUserInfo = (p) => {
  return get('/userInfo', p)
}

