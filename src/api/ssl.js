import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ssl/list',
    method: 'get',
    params
  })
}

export function addSsl(data) {
  return request({
    url: '/ssl/add',
    method: 'put',
    data
  })
}

export function editSsl(data) {
  return request({
    url: '/ssl/edit',
    method: 'post',
    data
  })
}


export function deleteSsl(ssl_id) {
  return request({
    url: `/ssl/delete/${ssl_id}`,
    method: 'delete',
  })
}
