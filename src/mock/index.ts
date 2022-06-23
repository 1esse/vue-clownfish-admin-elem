import Mock from 'mockjs'
import { mockNamespace } from '@/appConfig'

function collectApis(): MockApi.obj[] {
  const mockApis = []
  const apiModules = import.meta.globEager('./api/*.ts')
  if (mockNamespace) {
    for (const [filePath, apiModule] of Object.entries(apiModules)) {
      const apis: MockApi.obj[] = apiModule.default
      apis.forEach(api => api.url = filePath.replace(/^.+([\/\\].*)\.ts$/, '$1') + api.url)
      mockApis.push(...apiModule.default)
    }
  } else {
    for (const [, apiModule] of Object.entries(apiModules)) {
      mockApis.push(...apiModule.default)
    }
  }
  return mockApis
}

/**
 * @param timeout 接口响应时间范围:毫秒(ms)，默认'100-1000'
 * https://github.com/nuysoft/Mock/wiki/Mock.setup()#timeout
 */
function enableMock(timeout: string | number = '100-1000') {
  Mock.setup({
    timeout: timeout
  })

  const mockApis = collectApis()
  for (const api of mockApis) {
    Mock.mock(new RegExp(api.url), api.type || 'get', (options: MockApi.request) => {
      if (options.body) {
        options.body = JSON.parse(options.body)
      }
      return api.response instanceof Function ? api.response(options) : api.response
    })
  }
}

export default enableMock