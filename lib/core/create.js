const program = require('commander')
const { createProjectAction, addComponentAction, addPageAndroute, addStoreAction } = require('./actions')
const createCommands = () => {
    // 1. 创建项目
    program
        .command('create <project> [others...]')
        .description('clone a repository info a folder')
        .action(createProjectAction)
    // 2. 增加组件
    program
        .command('addcpn <name>')
        .description('add vue component, 例如：libo addcpn HelloWorld [-d src/components]')
        .action((name) => {
            addComponentAction(name, program.dest || 'src/components')
        })
    // 3. 增加页面和路由    
    program
        .command('addpage <page>')
        .description('add vue page and router config, 例如：libo addpage Home [-d src/pages]')
        .action((page) => {
            addPageAndroute(page, program.dest || `src/pages/${page.toLowerCase()}`)
        })    
    program
        .command('addstore <name>')
        .description('add vue store config, 例如：libo addpage Home [-d src/store]')
        .action((name) => {
            addStoreAction(name, program.dest || 'src/store/modules')
        })    


}

module.exports = createCommands