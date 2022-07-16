const { SyncLoopHook } = require('tapable')

/**
 * 当循环钩子中的插件返回 非 undefined 的值时，钩子将从第一个插件重新启动。它将循环直到所有插件返回 undefined。
 */
const hook = new SyncLoopHook(['source', 'options'])

let count = 0

hook.tap('plugin-1', (source, options) => {
  console.log(source, options, 1)
})

hook.tap('plugin-2', (source) => {
  console.log(source, 2)
  count++

  if (count < 6) return source + count
})

hook.tap('plugin-3', (source) => {
  console.log(source, 3)
})

hook.call('code', {})
