import axios from "axios";

export function api_call(method, url, data=null, headers=null){
  const runtimeConfig = useRuntimeConfig()
  return axios({
    method: method,
    url: `${runtimeConfig.public.apiBase}${url}`,
    data: data,
    headers: headers
  }).then(res => JSON.stringify(res.data))
    .catch(error => {
      console.log('Error trying to call api',error)
      throw new Error('Something went wrong with API call.')
    })
}
