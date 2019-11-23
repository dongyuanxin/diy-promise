Promise.prototype.finally = function (cb) {
  return this.then(
    (value) => Promise.resolve(cb()).then(() => value),
    (error) => Promise.resolve(cb()).then(() => {
      throw error
    })
  )
}