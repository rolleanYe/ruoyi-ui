import request from '@/utils/request'

export function listPerformance(query) {
  return request({
    url: '/jobs/performance/list',
    method: 'get',
    params: query
    })
}
