import { generateUrl } from './generator'
import isoFetch from 'isomorphic-fetch';
import { unauthorized } from '../actions'
import {
  fetchStart,
  fetchSuccess,
  fetchFailure
} from '../actions'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form';
import _ from 'lodash'
import queryString from 'querystring'
import { addNotification } from '../actions'

export const fetch = (opts, dispatch, name, meta = {}) => {
  const method = opts.method || 'GET'
  const resourceId = opts.resourceId
  let url = generateUrl(opts.resourceName, resourceId)

  const config = {
    method,
    headers: {},
    credentials: 'include',
    type: 'cors'
  }

  if (opts.body) {
    config.body = JSON.stringify(opts.body)
    config.headers['Content-Type'] = 'application/json'
  }

  if (opts.query) {
    url = `${url}?${queryString.stringify(opts.query)}`
  }

  if (opts.form) {
    const formData = new FormData()
    _.keys(opts.form).forEach((key) => {
      formData.append(key, opts.form[key])
    })
    config.body = formData
  }

  return new Promise((resolve, reject) => {
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

        if (response.status === 422) {
          if (Array.isArray(json.errors) && json.errors.length) {
            reject(new SubmissionError({_error: json.errors.join(', ')}))
          }
          reject(new SubmissionError(json.errors))
        }

        if (response.status === 401 && name !== 'check_auth') {
          dispatch(addNotification({
            title: 'Sign Up',
            message: 'You need an account to do that',
            level: 'warning',
            action: {
              label: 'Sign Up',
              callback: () => {
                dispatch(push('/signup'))
              }
            }
          }))
        }

        if (json.errors) {
          let errorMsg = json.errors
          if (_.isPlainObject(json.errors)) {
            errorMsg = _.values(json.errors).join(', ')
          }
          dispatch(addNotification({
            title: 'Error',
            message: errorMsg,
            level: 'error'
          }))
        }

        reject(dispatchOps)

      })
  })
}