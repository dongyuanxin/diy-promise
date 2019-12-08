const MyPromise = require('./Promise')

// after 500ms, console "1" and "2"
new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 500)
})
  .then(value => {
    console.log('value1 is', value)
    return value + 1
  })
  .then(value => {
    return new MyPromise(resolve => {
      resolve(value)
    })
  })
  .then(value => {
    console.log('value2 is', value)
    return value
  })

// after 1 second, console "11"
new MyPromise((resolve, reject) => {
    resolve(10)
  })
    .then(value => {
      return new MyPromise(resolve => {
        setTimeout(() => {
          resolve(value + 1)
        }, 1000)
      })
    })
    .then(value => {
      console.log('value3', value)
    })