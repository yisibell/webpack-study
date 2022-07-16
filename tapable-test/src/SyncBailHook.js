const { SyncBailHook } = require('tapable')

/**
 * 同步的保险钩子
 * 只要注册的事件回调不返回 undefined, 那么，所注册的钩子就会一直执行。
 */
const hook = new SyncBailHook(['msg'])

hook.tap('SyncBailHook1', (msg) => {
  console.log(msg, 1);
})

hook.tap('SyncBailHook2', (msg) => {
  console.log(msg, 2);

  // return {}
  // return ''
  // return false
  // return undefined
})

hook.tap('SyncBailHook3', (msg) => {
  console.log(msg, 3);
})

hook.call('this is a SyncBailHook.')