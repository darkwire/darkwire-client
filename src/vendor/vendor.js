try {
  require('bootstrap/dist/js/bootstrap.min.js') // eslint-disable-line
} catch (e) {
  console.log(e)
}
require('webcrypto-shim/webcrypto-shim.js')
