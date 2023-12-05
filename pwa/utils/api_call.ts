import axios from "axios";

export interface InterfaceAPI{
  method: string,
  url: string,
  data: string | object | null,
  headers: string| object | null
}
const runtimeConfig = useRuntimeConfig()

export function api_call({method, url, data, headers} : InterfaceAPI){
  return axios({
    method,
    url: `${runtimeConfig.public.apiBase}${url}`,
    data,
    headers
  })
  .then(res => JSON.stringify(res.data))
  .catch(error => {
    throw error
  })
}
