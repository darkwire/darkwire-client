import config from './config'

export default (resourceName) => {
  const { port, protocol, host } = config

  const resourcePath = resourceName

  return `${protocol}://${host}:${port}/${resourcePath}`
}
