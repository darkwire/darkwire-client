import config from './config'

export default (resourceName) => {
  const { port, protocol, domain } = config

  const resourcePath = resourceName

  return `${protocol}://${domain}:${port}/${resourcePath}`
}
