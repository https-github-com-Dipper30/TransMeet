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
export const getTypeOptions = async (p, format = true) => {
  const res = await get('/types', p)
  if (!handleResult(res, false)) return false
  const { data } = res
  if (!format) return data
  const options = data.map(({ name, code }) => ({ value: code, label: name }))
  return options
}

/**
 * upload product image
 */
export const uploadProductImage = (files, param) => {
  return uploadFiles('/productImage', files, param)
}

export const addProduct = (p) => {
  return post('/addProduct', p)
}

export const getProducts = async (p, format = true) => {
  const res = await get('/products', p)
  if (!handleResult(res, false)) return
  const { data } = res
  let { rows } = data
  if (format && rows) rows = rows.map(r => ({ ...r, unitPrice: `${r.price} $ / ${r.unit}`, listed: Boolean(r.listTS != null) }))
  res.data.rows = rows
  return res
}

export const getProductImg = async (p) => {
  return get('/productImage', p)
}

/**
 * list product to certain shops
 * @param { { pid: number, sid: number[] } } p 
 * @returns 
 */
export const listProduct = async (p) => {
  return post('/list', p)
}

/**
 * unlist product by id
 * @param { { pid: number } } p 
 * @returns 
 */
export const unlistProduct = async (p) => {
  return post('/unlist', p)
}

export const deleteProduct = async (p) => {
  return post('deleteProduct', p)
}

