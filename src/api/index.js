import { generateUrl } from './generator'
import isoFetch from 'isomorphic-fetch';
import { unauthorized } from '../actions'
import {
  fetchStart,
  fetchSuccess,
  fetchFailure
} from '../actions'
import { push } from 'react-router-redux'
import _ from 'lodash'
import queryString from 'querystring'

export const fetch = (opts, dispatch, name, meta = {}) => {
  const method = opts.method || 'GET'
  const resourceId = opts.resourceId
  let url = generateUrl(opts.resourceName, resourceId)

  const config = {
    method,
    headers: {},
    type: 'cors'
  }

  if (opts.body) {
    config.body = JSON.stringify(opts.body)
    config.headers['Content-Type'] = 'application/json'
  }

  if (opts.query) {
    url = `${url}?${queryString.stringify(opts.query)}`
  }

  return new Promise((resolve, reject) => {
    console.log(config)
    meta = { ...meta, timestamp: Date.now() }
    dispatch(fetchStart(name, method, resourceId, meta))
    return isoFetch(url, config)
      .then(async (response) => {

        let json = {}

        try {
          json = await response.json()
        } catch(e) {
        }

        const dispatchOps = {
          response,
          json,
          resourceId,
          meta
        }

        if (response.ok) {
          dispatch(fetchSuccess(name, method, dispatchOps))
          return resolve(dispatchOps)
        }

        dispatch(fetchFailure(name, method, dispatchOps))

        reject(dispatchOps)

      })
  })
}