const { AsyncSeriesHook } = require('tapable')

/**
 * 异步的串行钩子。
 * 
 */
const hook = new AsyncSeriesHook(['name'])

hook.tapAsync('plugin-1', (name, cb) => {
  console.log(name, 1);

  // cb 不传入任何参数时，会继续向下执行。
  // 如果不执行 cb(),则会停止向下执行。
  cb()
})

hook.tapAsync('plugin-2', (name, cb) => {
  console.log(name, 2);

  // cb() 传入参数时，该参数表示错误信息。并会停止向下执行。
  cb('some error msg')
})

hook.tapAsync('plugin-3', (name, cb) => {
  console.log(name, 3);
  cb()
})

// 在传入了与实例化钩子类的数组长度一致个数的传入参数时，还需要在最后添加一个回调函数，否则在事件回调中执行回调函数可能会报错。
hook.callAsync('hello tapable', (err) => {
  console.log(err);
})

