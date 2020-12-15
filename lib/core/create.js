const program = require('commander')
const { createProjectAction } = require('./actions')
const createCommands = () => {
    // 1. 创建项目
    program
        .command('create <project> [others...]')
        .description('clone a repository info a folder')
        .action(createProjectAction)
    // 增加页面
    program
        .command('addcpn <name>')
        .description('add vue component, 例如：libo addcpn HelloWorld -d src/components')
        .action(createProjectAction)

}

module.exports = createCommands