const _ = require('./Promise.race')
const { genTimeoutPromise } = require('./util')

const promises = [1, 2, 3].map(item => genTimeoutPromise(item * 100))
Promise.myRace(promises)
  .then(value => console.log(value))
  .catch(error => console.log('error is', error))