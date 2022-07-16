const { AsyncParallelBailHook } = require('tapable')

const hook = new AsyncParallelBailHook(['message'])

hook.tapAsync('plugin-1', (message, cb) => {
  setTimeout(() => {
    console.log(message + '-1');
    cb(null, message + '-1')
  }, 2000)
})

hook.tapAsync('plugin-2', (message, cb) => {
  setTimeout(() => {
    console.log(message + '-2');
    cb()
  }, 1000)
})

hook.tapAsync('plugin-3', (message, cb) => {
  setTimeout(() => {
    console.log(message + '-3');
    cb(null, message + '-3')
  }, 500)
})

hook.callAsync('hello', (err, res) => {
  console.log('END:', err, res);
})

