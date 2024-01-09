import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/server/list',
    method: 'get',
    params
  })
}

export function addServer(data) {
  return request({
    url: '/server/add',
    method: 'put',
    data
  })
}

export function editServer(data) {
  return request({
    url: '/server/edit',
    method: 'post',
    data
  })
}


export function deleteServer(server_id) {
  return request({
    url: `/server/delete/${server_id}`,
    method: 'delete',
  })
}
