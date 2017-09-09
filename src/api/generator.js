import config from './config'

export const generateUrl = (resourceName, resourceId) => {
  let { port, protocol, domain } = config

  const resourcePath = resourceName;

  return `${protocol}://${domain}:${port}/${resourcePath}`
}