import request from '@/utils/request'

export function getServerVersion() {
  return request({
    url: '/getServerVersion',
    method: 'get'
  })
}
