import { http } from './http'

export const getStates = () => {
  return http.get('/states')
}

export const getBusinessTypes = () => {
  return http.get('/businessTypes')
}

export const getCities = () => {

}