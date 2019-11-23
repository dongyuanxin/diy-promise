Promise.myRace = function (iterators) {
  const promises = Array.from(iterators)
  
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject)
    })
  })
}
