const _ = require('./Promise.finally')
const { genTimeoutPromise } = require('./util')

genTimeoutPromise(100)
  .then(value => console.log('value is', value))
  .catch(error => console.log('error is', error))
  .finally(() => {
    console.log('finally')
  })