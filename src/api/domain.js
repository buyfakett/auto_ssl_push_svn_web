import request from '@/utils/request'

export function domainList(params) {
  return request({
    url: '/domain/list',
    method: 'get',
    params
  })
}

export function addDomain(data) {
  return request({
    url: '/domain/add',
    method: 'put',
    data
  })
}

export function editDomain(data) {
  return request({
    url: '/domain/edit',
    method: 'post',
    data
  })
}


export function deleteDomain(domain_id) {
  return request({
    url: `/domain/delete/${domain_id}`,
    method: 'delete',
  })
}
