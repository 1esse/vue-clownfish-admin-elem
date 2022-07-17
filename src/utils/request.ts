import { ElMessage } from 'element-plus'
import axios from 'axios'
import { getCookie } from '.'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 60000
})

const token = getCookie('token')

request.interceptors.request.use(
  config => {
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code !== 200) {
      ElMessage({
        message: `错误码${code}：${msg || '未知错误'}`,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(msg || '未知错误'))
    } else {
      return response.data
    }
  },
  error => {
    console.error(error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request