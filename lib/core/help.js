
const program = require('commander')
const helpOptions = () => {
    // 1.增加自己的options
    program.option('-d --dest <dest>', 'a destination folder, 例如：-d /src/components')
    program.option('-f --framework <framework>', 'your framework')

    // 2. 监听--help
    program.on('--help', function () {
        console.log('')
        console.log('Other:')
        console.log(' other options')
    })
}

module.exports = helpOptions

