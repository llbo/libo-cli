const path = require('path')
const fs = require('fs')

const ejs = require('ejs')


// 获取模板内容
const compile = (templateName, data) => {
    const templatePosition = `../templates/${templateName}`
    const templatePath = path.resolve(__dirname, templatePosition)
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve(result)
        })
    })
}
// 判断路径是否存在
const createDirSync = (pathName) => {
    if (fs.existsSync(pathName)) {
        return true
    } else {
        if (createDirSync(path.dirname(pathName))) {
            fs.mkdirSync(pathName)
            return true
        }
    }
}
// 将模板内容写入文件
const writeToFile = (path, content) => {
    // 判断path是否存在， 如果不存在，创建对应的文件夹
    return fs.promises.writeFile(path, content)
}


module.exports = {
    compile,
    writeToFile,
    createDirSync
}