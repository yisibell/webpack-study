const { SyncHook } = require('tapable')

/**
 * 按绑定顺序同步执行所有回调函数。
 */
const hook = new SyncHook(['speed'])

hook.tap('SyncHook', (speed) => {
  console.log(speed);
})

console.log('1. SyncHook')
hook.call(100)
