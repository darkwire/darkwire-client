let domain
let protocol
let port

switch (process.env.NODE_ENV) {
  case 'staging':
    domain = process.env.API_SERVER || 'api-staging.darkwire.io'
    protocol = process.env.PROTOCOL || 'https'
    port = process.env.PORT || 443
    break
  case 'production':
    domain = process.env.API_SERVER ||  'api.darkwire.io'
    protocol = process.env.PROTOCOL || 'https'
    port = process.env.PORT || 443
    break
  default:
    domain = process.env.API_SERVER ||  'localhost'
    protocol = process.env.PROTOCOL || 'http'
    port = process.env.PORT || 3000
}

export default {
  domain,
  port,
  protocol,
}
