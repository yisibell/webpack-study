const { AsyncSeriesBailHook } = require('tapable')

const hook = new AsyncSeriesBailHook(['message'])

hook.tapPromise('plugin-1', (message) => {
  // return Promise.resolve(message + '-1')
  return Promise.resolve()
})

hook.tapPromise('plugin-2', (message) => {
  return Promise.resolve(message + '-2')
})

hook.tapPromise('plugin-3', (message) => {
  return Promise.resolve(message + '-3')
})

hook.promise('hello async series bail hook').then(data => {
  console.log('SUCCESS: ', data);
}).catch(err => {
  console.log('ERROR: ', err);
})


// hook.tapAsync('async-plugin-1', (message, cb) => {
//   console.log(message, 1);
//   return message + '-1'
// })
// hook.tapAsync('async-plugin-1', (message, cb) => {
//   console.log(message, 2);
//   cb()
// })
// hook.tapAsync('async-plugin-1', (message, cb) => {
//   console.log(message, 3);
//   cb()
// })


// hook.callAsync('hello async series bail hook with callAsync', (err) => {
//   console.log('callAsync ERROR: ', err);
// })

