import axios from "axios";

export interface InterfaceAPI{
  method: string,
  url: string | object,
  data?: string | object | null,
  params?: object | string | null,
  headers?: {
    Authorization?: string
  }
}
const runtimeConfig = useRuntimeConfig()

export function api_call({method, url, data, params, headers} : InterfaceAPI){
  const axiosConfig = {
    method,
    url: `${runtimeConfig.public.apiBase}${url}`,
    data,
    params,
    headers
  }

  return axios(axiosConfig)
  .then(res => JSON.stringify(res.data))
  .catch(error => {
    throw error
  })
}
