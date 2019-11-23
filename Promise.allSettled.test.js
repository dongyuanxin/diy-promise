const _ = require('./Promise.allSettled')
const { genTimeoutPromise, genTimeoutErrorPromise } = require('./util')

Promise.allSettled([
    genTimeoutPromise(100),
    genTimeoutErrorPromise(200),
    genTimeoutPromise(50),
  ])
  .then(value => console.log(value))
  .catch(error => console.log('error is', error))