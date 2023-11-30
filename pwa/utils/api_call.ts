import axios from "axios";

export interface InterfaceAPI{
  method: string,
  url: string,
  data: string | object | null,
  headers: string | null
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
      console.log('Error trying to call api',error)
      throw new Error('Something went wrong with API call.')
    })
}
