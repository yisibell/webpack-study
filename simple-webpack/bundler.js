const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

let ID = 0

const createAsset = (filename) => {
  const source = fs.readFileSync(filename, 'utf-8')

  // 生成抽象语法树
  const ast = parser.parse(source, {
    sourceType: 'module',
  })

  const dependencies = []
  // 获取依赖
  traverse(ast, {
    ImportDeclaration: (path) => {
      if (path.node.source) {
        dependencies.push(path.node.source.value)
      }
    },
  })
  
  // 转换为 es5 可执行源码
  const { code } = babel.transformFromAstSync(ast, undefined, {
    presets: ['@babel/preset-env'],
  })

  const id = ID++;

  return {
    id,
    filename,
    dependencies,
    code,
  }
}

const createGraph = (entry) => {
  const mainAsset = createAsset(entry)
  
  const queue = [mainAsset]

  for (let asset of queue) {
    const dirname = path.dirname(asset.filename)
    
    // 依赖模块路径和id的映射
    asset.mapping = {}

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      const child = createAsset(absolutePath)

      asset.mapping[relativePath] = child.id

      queue.push(child)

    })
  }

  return queue
}


// 存在模块循环引用问题
const bundle = (entry) => {
  const graph = createGraph(entry)

  let modules = ''

  graph.forEach(mod => {
    modules += `${mod.id}: [
      function(require, module, exports) { 
        ${mod.code} 
      },
      ${JSON.stringify(mod.mapping)}
    ],`
  })

  

  return `(function(modules) {

    // module cache
    var installedModules = {}

    function require(moduleId) {
      
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports
      }

      var fn = modules[moduleId][0]
      var mapping = modules[moduleId][1]

      function localRequire(relativePath) {
        return require(mapping[relativePath])
      }

      var module = installedModules[moduleId] = { 
        i: moduleId,
        l: false,
        exports: {} 
      };

      fn(localRequire, module, module.exports)

      module.l = true

      return module.exports

    }

    require(0)

  })({${modules}})`
  
}

const res = bundle('./src/index.js')

fs.writeFileSync('./dist/main.js', res, 'utf-8')


