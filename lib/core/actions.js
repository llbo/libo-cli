
const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/index')
// callback -> promisify(函数) -> Promist -> async await
const createProjectAction = async (project) => {
    console.log('libo helps you create project...')
    // 1. clone项目
    await download(vueRepo, project, { clone: true })
    // 2. 执行npm install
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await commandSpawn(npm, ['install'], { cwd: `./${project}` })
    // 3. 运行npm run serve 开启服务会阻塞下面的进程，所以需要放行
    commandSpawn(npm, ['run', 'serve'], { cwd: `./${project}` })
    // 4. 打开浏览器
    open('http://localhost:8080/')
}


// 添加组件的action
const addComponentAction = async (name, dest) => {
    // 1.有对应的ejs模块
    // 2.编译ejs模板 result
    const result = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() })
    // 3.将result写入到.vue文件中
    const targetPath = path.resolve(dest, `${name}.vue`)
    console.log(targetPath)
    writeToFile(targetPath, result)
}

// 增加页面和路由的action
const addPageAndroute = async (name, dest) => {
    // 1. 编译ejs模板
    const data = { name, lowerName: name.toLowerCase() }
    const pageResult = await compile('vue-component.ejs', data)
    const routeResult = await compile('vue-router.ejs', data)

    // 2. 写入文件
    // const targetDest = path.resolve(dest, name.toLowerCase())
    if (createDirSync(dest)) {
        const pagePath = path.resolve(dest, `${name}.vue`)
        const routePath = path.resolve(dest, 'router.js')
        writeToFile(pagePath, pageResult)
        writeToFile(routePath, routeResult)
    }
}

// 增加store
const addStoreAction = async (name, dest) => {
    const storeResult = await compile('vue-store.ejs', {})
    const typesResult = await compile('vue-types.ejs', {})

    // 2. 写入文件
    const targetDest = path.resolve(dest, name.toLowerCase())
    if (createDirSync(targetDest)) {
        const storePath = path.resolve(targetDest, `index.js`)
        const typesPath = path.resolve(targetDest, 'types.js')
        writeToFile(storePath, storeResult)
        writeToFile(typesPath, typesResult)
    }
}

module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndroute,
    addStoreAction
}