let host
let protocol
let port

switch (process.env.NODE_ENV) {
  case 'staging':
    host = process.env.API_HOST || 'api-staging.darkwire.io'
    protocol = process.env.API_PROTOCOL || 'https'
    port = process.env.API_PORT || 443
    break
  case 'production':
    host = process.env.API_HOST || 'api.darkwire.io'
    protocol = process.env.API_PROTOCOL || 'https'
    port = process.env.API_PORT || 443
    break
  default:
    host = process.env.API_HOST || 'localhost'
    protocol = process.env.API_PROTOCOL || 'http'
    port = process.env.API_PORT || 3000
}

export default {
  host,
  port,
  protocol,
}
