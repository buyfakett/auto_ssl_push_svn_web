import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function changeUser(data) {
  return request({
    url: '/user/change',
    method: 'post',
    data
  })
}
