Promise.myAll = function (iterators) {
  const promises = Array.from(iterators)
  const num = promises.length
  const resolvedList = new Array(num)
  let resolvedNum = 0
  
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          resolvedList[index] = value
          if (++resolvedNum === num) {
            resolve(resolvedList)
          }
        })
        .catch(reject)
    })
  })
}
