let host
let protocol
let port

switch (process.env.NODE_ENV) {
  case 'staging':
    host = process.env.REACT_APP_API_HOST || 'api-staging.darkwire.io'
    protocol = process.env.REACT_APP_API_PROTOCOL || 'https'
    port = process.env.REACT_APP_API_PORT || 443
    break
  case 'production':
    host = process.env.REACT_APP_API_HOST || 'api.darkwire.io'
    protocol = process.env.REACT_APP_API_PROTOCOL || 'https'
    port = process.env.REACT_APP_API_PORT || 443
    break
  default:
    host = process.env.REACT_APP_API_HOST || 'localhost'
    protocol = process.env.REACT_APP_API_PROTOCOL || 'http'
    port = process.env.REACT_APP_API_PORT || 3000
}

export default {
  host,
  port,
  protocol,
}
