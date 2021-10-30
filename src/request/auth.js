import { http } from './http'

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

