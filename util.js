module.exports.genTimeoutPromise = function (timeout) {
  return new Promise(resolve => setTimeout(() => resolve(timeout), timeout))
}

module.exports.genTimeoutErrorPromise = function (timeout) {
  return new Promise((resolve, reject) => setTimeout(
      () => reject(new Error('Error timeout:', timeout)), 
      timeout
    )
  )
}