const { AsyncParallelHook } = require('tapable')

const hook = new AsyncParallelHook(['message'])

hook.tapAsync('plugin-1', (message, cb) => {
  setTimeout(() => {
    console.log(message, 1)
    cb()
  }, 1000)
})

hook.tapAsync('plugin-2', (message, cb) => {
  console.log(message, 2)
  cb()
})

hook.tapAsync('plugin-3', (message, cb) => {
  console.log(message, 3)
  cb()
})

hook.callAsync('hello async parallel hook', (err) => {
  console.log(err)
})
