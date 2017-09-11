import Crypto from './crypto'

const crypto = new Crypto()

export const process = (payload, state) => {
  console.log('PROCESS')
  console.log(payload)

  const myUsername = state.user.username

  let decryptedPayload
  console.log(payload)
  const encryptDecryptPrivateKey = state.user.encryptDecryptKeys.privateKey

  payload.forEach(async (p) => {
    try {
      const decryptKey = encryptDecryptPrivateKey
      console.log(decryptKey)
      const key = await crypto.importEncryptDecryptKey(decryptKey, 'jwk', ['decrypt'])
      console.log(p)
      console.log(encryptDecryptPrivateKey)
      decryptedPayload = await crypto.decryptPayload(p, key)
      console.log(decryptedPayload)
      // For perf should break here and prevent trying to decrypt others
      // payload = decryptedPayload
    } catch(e) {
      console.log('CATCH', e)
    }
  })
  console.log(decryptedPayload)

  return new Promise((resolve, reject) => {
    resolve({
      type: `HANDLE_SOCKET_MESSAGE_${payload.type}`,
      payload: payload.payload
    })
  })
}

export const prepare = (payload, state) => {
  return new Promise(async(resolve, reject) => {

    if (state.room.members < 2 && payload.type !== 'ADD_USER') {
      return reject('No members to send message to')
    }
    const myUsername = state.user.username
    const signVerifyPrivateKey = state.user.signVerifyKeys.privateKey
    const importedSignVerifyPrivateKey = await crypto.importSignVerifyKey(signVerifyPrivateKey, ['sign'])
  
    const payloads = await Promise.all(state.room.members
      // .filter(m => m.username !== myUsername)
      .map((member) => {
        return new Promise(async(resolve, reject) => {
          const payloadObj = {
            username: member.username,
            payload: payload.payload
          }
          console.log(payloadObj)
          const payloadBuffer =  crypto.convertStringToArrayBufferView(JSON.stringify(payloadObj))
          console.log('1')
          const signedPayload = await crypto.signKey(payloadBuffer, importedSignVerifyPrivateKey)
          console.log('2')

          const publicKey = member.encryptDecryptPublicKey
          const key = await crypto.importEncryptDecryptKey(publicKey)
          // console.log(signedPayload, key)

          let encryptedPayload
          try {
            console.log('TRY')
            encryptedPayload = await crypto.encryptPayload(signedPayload, key)
          } catch(e) {
            console.log(e)
          }
          console.log('4')
          
          resolve(encryptedPayload)
        })
      })
    )
    console.log(payloads)
    resolve(payloads)
  });
}