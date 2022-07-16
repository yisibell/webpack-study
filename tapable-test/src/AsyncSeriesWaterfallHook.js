const { AsyncSeriesWaterfallHook } = require('tapable')

const hook = new AsyncSeriesWaterfallHook(['count'])

hook.tapPromise('plugin-1', (count) => {
  console.log(count, 1);

  return Promise.resolve(count + 1)
})

hook.tapPromise('plugin-2', (count) => {
  console.log(count, 2);

  return Promise.resolve(count + 1)
  // return Promise.resolve()
})

hook.tapPromise('plugin-2', (count) => {
  console.log(count, 3);
  return Promise.resolve(count)
})

hook.promise(0).then(data => {
  console.log('res:', data);
  
})