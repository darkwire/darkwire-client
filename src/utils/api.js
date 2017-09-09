import env from '../config/env'

export const getUrl = (opts) => {
  const { type, input, options, username, itemName, token } = opts
  const sequenceSlash = type === 'sequence' ? '/s' : ''
  const opt = JSON.stringify(type === 'sequence' ? options : (options[0] || {}))
  const apiUrl = env === 'production' ? 'https://api.darkwire.io' : 'http://localhost:3000'
  return `curl -X POST ${apiUrl}/${username}${sequenceSlash}/${itemName} -H "x-auth-token: ${token || 'YOUR_TOKEN'}" -H "Content-Type: application/json" -d '{"input": ${JSON.stringify(input)}, "options": ${opt}}'`
}