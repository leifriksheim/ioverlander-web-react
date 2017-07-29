var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const STATIC_CONTENT = 'STATIC_CONTENT'

function setStaticContent (data) {
  return {
    type: STATIC_CONTENT,
    staticContent: data.html,
    pageTitle: `${data.title} - iOverlander`
  }
}

export function getStaticContentAction (route) {
  return asyncApiAction(`${config.get('apiEndpoint')}/staticContent/${route.params.pageName}`, setStaticContent, setStaticContent, { err: 'An error occured' }, route)
}
