import { http, get, post, uploadFiles } from './http'
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
  const options = [{ label: 'All', value: null }, ...data.map(({ name, id }) => ({ value: id, label: name }))]
  return options
}

export const getStatesOptions = async () => {
  const res = await get('/states')
  if (!handleResult(res, false)) return
  const { data } = res
  const options = [{ label: 'All', value: null }, ...data.map(({ name, id }) => ({ value: id, label: name }))]
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

export const getCateOptions = async () => {
  const res = await get('/categories')
  if (!handleResult(res, false)) return
  const { data } = res
  const options = data.map(({ name, code }) => ({ value: code, label: name }))
  return options
}

/**
 * find product types according to category
 * @param {cate_code?: number} p 
 */
export const getTypeOptions = async (p) => {
  const res = await get('/types', p)
  if (!handleResult(res, false)) return
  const { data } = res
  const options = data.map(({ name, code }) => ({ value: code, label: name }))
  return options
}

/**
 * upload product image
 */
export const uploadProductImage = (files) => {
  return uploadFiles('/upload', files)
}

export const addProduct = (p) => {
  return post('/addProduct', p)
}