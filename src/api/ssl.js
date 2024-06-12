import request from '@/utils/request'

export function sslList(params) {
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

export function editSslStatus(data) {
  return request({
    url: '/ssl/edit_status',
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

export function refreshSsl() {
  return request({
    url: `/ssl/refresh`,
    method: 'post',
  })
}

export function singleRefreshSsl(ssl_id) {
  return request({
    url: `/ssl/refresh/${ssl_id}`,
    method: 'post',
  })
}
