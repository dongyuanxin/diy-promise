const STATUS_PENDING = Symbol('pending')
const STATUS_RESOLVED = Symbol('resolved')
const STATUS_REJECTED = Symbol('rejected')

function MyPromise(executor) {
  const that = this
  that.data = null
  that.status = STATUS_PENDING

  that.onResolvedCallback = []
  that.onRejectedCallback = []
  
  function resolve(value) {
    if (that.status !== STATUS_PENDING) {
      return
    }

    that.data = value
    that.status = STATUS_RESOLVED
    for (let callback of that.onResolvedCallback) {
      callback(that.data)
    }
  }

  function reject(error) {
    if (that.status !== STATUS_PENDING) {
      return
    }

    that.data = error
    that.status = STATUS_REJECTED
    for (let callback of that.onRejectedCallback) {
      callback(that.data)
    }
  }

  try {
    // 默认是交给参数传入的回调函数来执行状态的变更
    executor(resolve, reject)
  } catch(error) {
    // 如果回调函数的执行发生错误，抛出异常
    // “主动”扭转状态
    reject(error)
  }
}

MyPromise.prototype.then = function (onfulfilled, onrejected) {
  const that = this

  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : function (v) { return v }
  onrejected = typeof onrejected === 'function' ? onrejected : function(reason) { throw reason }
  
  if (that.status === STATUS_RESOLVED) {
    const promise2 = new MyPromise((resolve, reject) => {
      try {
        const value = onfulfilled(that.data)
        if (value instanceof MyPromise) { 
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      } catch (error) {
        reject(error)
      }
    })
    return promise2
  }

  if (that.status === STATUS_REJECTED) {
    return new MyPromise((resolve, reject) => {
      try {
        const value = onrejected(that.data)
        if (value instanceof MyPromise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  if (that.status === STATUS_PENDING) {
    return new MyPromise((resolve, reject) => {
      that.onResolvedCallback.push(function () {
        try {
          const value = onfulfilled(that.data)
          if (value instanceof MyPromise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        } catch (error) {
          reject(error)
        }
      })

      that.onRejectedCallback.push(function () {
        try {
          if (value instanceof MyPromise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}

MyPromise.prototype.catch = function (onrejected) {
  return this.then(null, onrejected)
}

module.exports = MyPromise