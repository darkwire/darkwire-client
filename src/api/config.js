let domain
let protocol
let port

switch(process.env.NODE_ENV) {
  case 'staging':
    domain = 'api-staging.darkwire.io'
    protocol = 'https'
    port = 443
    break;
  case 'production':
    domain = 'api.darkwire.io'
    protocol = 'https'
    port = 443
    break;
  default:
    domain = 'localhost'
    protocol = 'http'
    port = 3000
}

export default {
  domain,
  port,
  protocol
}