const { SyncWaterfallHook } = require('tapable')

/**
 * 瀑布式的同步执行绑定的回调函数。
 * 当某个回调函数有返回值时，会将该返回值作为下一个回调函数的第一个参数进行传递，否则使用上一个的返回值或者首次调用时的参数。
 */
const hook = new SyncWaterfallHook(['count'])

hook.tap('SyncWaterfallHook1', (count) => {
  console.log('SyncWaterfallHook', 1);
  return count + 1
})

hook.tap('SyncWaterfallHook2', (count) => {
  console.log('SyncWaterfallHook', 2);
  return count + 1
})

hook.tap('SyncWaterfallHook3', (count) => {
  console.log('SyncWaterfallHook', 3);
  return count + 1
})

hook.tap('SyncWaterfallHook end', (count) => {
  console.log('SyncWaterfallHook', 'end');
  console.log('count results:', count);
  console.log(arg2);
})

hook.call(0)