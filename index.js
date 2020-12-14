#! /usr/bin/env node
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')
const program = require('commander')

// 1. 查看版本号
program.version(require('./package.json').version)
// program.version(require('./package.json').version, '-v, --version')


// 2. 查看帮助
helpOptions()

// 3. 创建指令
createCommands()

program.parse(process.argv)


