module.exports.genTimeoutPromise = function (timeout) {
  return new Promise(resolve => setTimeout(() => resolve(timeout), timeout))
}