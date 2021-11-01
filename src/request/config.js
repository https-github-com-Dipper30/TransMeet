import { http, get, post } from './http'

export const getStates = () => {
  return http.get('/states')
}

export const getBusinessTypes = () => {
  return http.get('/businessTypes')
}

/**
 * get staff by dynamic criteria
 * {
 *  id, region_assigned, store_assigned, salary, job_title
 * }
 * @param {*} p 
 * @returns 
 */
export const getStaff = (p) => {
  return get('/staff', p)
}

export const getCities = () => {

}