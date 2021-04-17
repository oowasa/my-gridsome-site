import request from '@/utils/request';

export default {
  list: function (query) {
    let username = 'GitHub-Laziji';
    return request({
      url: `/users/${username}/gists?page=${query.page}&per_page=${query.pageSize}`
    })
  },
  delete : function (id) {
    return request({
      url: '/gists/' + id,
      method: 'DELETE'
    })
  }
}