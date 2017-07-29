var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const SELECTED_BLOG_DATA = 'SELECTED_BLOG_DATA'

function setBlogDetails (data) {
  return {
    type: SELECTED_BLOG_DATA,
    selectedBlog: data,
    pageTitle: `${data.userName} | Blogs | iOverlander`
  }
}

export function blogDetailsAction (route) {
  return asyncApiAction(`${config.get('apiEndpoint')}/blogs/${route.params.id.split('-')[0]}`, setBlogDetails, setBlogDetails, { err: 'An error occured' }, route)
}

export function blogDetailsFromEditAction (route, user) {
  return asyncApiAction(`${config.get('apiEndpoint')}/blogs/${user.blog_id}`, setBlogDetails, setBlogDetails, { err: 'An error occured' }, route)
}
