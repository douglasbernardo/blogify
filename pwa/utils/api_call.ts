import axios from "axios";

export interface InterfaceAPI{
  method: string,
  url: string | object,
  data?: string | object | null,
  params?: object | string | null,
  headers?: string| object | null
}
const runtimeConfig = useRuntimeConfig()

export function api_call({method, url, data, params, headers} : InterfaceAPI){
  return axios({
    method,
    url: `${runtimeConfig.public.apiBase}${url}`,
    data,
    params,
    headers
  })
  .then(res => JSON.stringify(res.data))
  .catch(error => {
    throw error
  })
}
