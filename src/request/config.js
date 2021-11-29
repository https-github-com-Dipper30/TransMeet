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

export const getStoreOptions = async (p, format = false) => {
  const res = await get('/stores', p)
  if (!handleResult(res, false)) return
  const { data } = res
  const options = [{ label: 'All', value: null }, ...data.map(({ name, id }) => ({ value: id, label: name }))]
  return options
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

export const updateProduct = (p) => {
  return post('/updateProduct', p)
}

export const getProducts = async (p, format = true) => {
  const res = await get('/products', p)
  if (!handleResult(res, false)) return
  const { data } = res
  let { rows } = data
  if (format && rows) rows = rows.map(r => ({ ...r, listed: Boolean(r.listTS != null), avgRate: r.Ratings?.length > 0 ? Math.round(r.Ratings.reduce((prev, cur) => prev + cur.value, 0) / r.Ratings.length) : 0 }))
  res.data.rows = rows
  return res
}

/**
 * get recommended products, type can be either 'sold' or 'rate'
 * @param {type: string} p 
 * @param {boolean} format if requires formatting, default by true 
 * @returns 
 */
export const getRecommendedProducts = async (p, format = true) => {
  const res = await get('/recommend', p)
  if (!handleResult(res, false)) return []
  let { data } = res
  if (format && data) data = data.map(r => ({ ...r, listed: Boolean(r.listTS != null), avgRate: r.Ratings?.length > 0 ? Math.round(r.Ratings.reduce((prev, cur) => prev + cur.value, 0) / r.Ratings.length) : 0 })) 
  return data
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

export const listAllProducts = async () => {
  return post('/listAll')
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

/**
 * add a product to shopping cart
 * @param { uid: number, pid: number, sid: number, amount: number } p 
 * @returns 
 */
export const addToCart = async (p) => {
  return post('/addToCart', p)
}

// { uid: number }
export const getCartItems = async (p) => {
  return get('/cart', p)
}

/**
 * update one cart item by id
 * @param { id: number, amount: number, selected: boolean } p
 */
export const updateCartItem = async (p) => {
  return post('/updateCart', p)
}

export const removeCartItemByID = async (p) => {
  return post('/deleteCart', p)
}

export const isInCart = async (p) => {
  return post('/isInCart', p)
}

/**
 * place one order or multiple orders
 * @param {*} p 
 */
export const placeOrder = async (p) => {
  return post('/placeOrder', p)
}

export const getOrders = async (p) => {
  return get('/orders', p)
}

/**
 * rate an order
 * @param { uid: number, oid: string, rate: number } p
 */
export const rateOrder = async (p) => {
  return post('/rateOrder', p)
}

/**
 * search products
 * @param { search: string } p 
 * @returns an array of products
 */
export const searchProduct = async (p) => {
  return get('/product', p)
}