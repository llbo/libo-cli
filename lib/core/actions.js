
const open = require('open')
const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require('../utils/terminal')
// callback -> promisify(函数) -> Promist -> async await
const createProjectAction = async (project) => {
    console.log('libo helps you create project...')
    // 1. clone项目
    await download(vueRepo, project, {clone: true})
    // 2. 执行npm install
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await commandSpawn(npm, ['install'], {cwd: `./${project}`})
    // 3. 运行npm run serve 开启服务会阻塞下面的进程，所以需要放行
    commandSpawn(npm, ['run', 'serve'], {cwd: `./${project}`})
    // 4. 打开浏览器
    open('http://localhost:8080/')
}


// 添加组件的action
const addCpnAction = (name, dest) => {
    // 1.有对应的ejs模块
    // 2.编译ejs模板 result
    // 3.将result写入到.vue文件中
    // 4. 放到对应的文件夹中
}

module.exports = {
    createProjectAction
}