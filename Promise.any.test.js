const _ = require('./Promise.any')
const { genTimeoutPromise, genTimeoutErrorPromise } = require('./util')

Promise.any([
  genTimeoutPromise(100),
  genTimeoutErrorPromise(200),
  genTimeoutPromise(50),
])
.then(value => console.log(value))
.catch(error => console.log('error results are:\n', error))

Promise.any([
  genTimeoutErrorPromise(100),
  genTimeoutErrorPromise(50)
])
.then(value => console.log(value))
.catch(error => console.log('error results are:\n', error))