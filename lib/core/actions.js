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
}

module.exports = {
    createProjectAction
}