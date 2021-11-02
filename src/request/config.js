import { http, get, post } from './http'
import { handleResult } from '../utils'
import { jobToString } from '../config/common'

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
 * @param {Boolean} format if the result data needs formation
 * @returns 
 */
export const getStaff = async (p, format = false) => {
  const res = await get('/staff', p)
  if (!handleResult(res, false)) return
  const { data } = res
  let { rows } = data
  if (format && rows) rows = rows.map(r => ({ ...r, job2String: jobToString[r.job_title] }))
  res.data.rows = rows
  return res
}

export const getCities = () => {

}

export const getRegions = () => {
  return get('/regions')
}

// get region options
export const getRegionsOptions = async () => {
  const res = await get('/regions')
  if (!handleResult(res, false)) return
  const { data } = res
  const options = data.map( ({ name, id }) => ({ value: id, label: name }) )
  return options
}

/**
 * get stores by dynamic criteria
 * {
 *  id, region_assigned, store_assigned, salary, job_title
 * }
 * @param {*} p 
 * @param {Boolean} format if the result data needs formation
 * @returns 
 */
 export const getStores = async (p, format = false) => {
  const res = await get('/stores', p)
  if (!handleResult(res, false)) return
  // const { data } = res
  // let { rows } = data
  // if (format && rows) rows = rows.map(r => ({ ...r, job2String: jobToString[r.job_title] }))
  // res.data.rows = rows
  return res
}

export const setManager = async (p) => {
  return post('/setStoreManager', p)
}