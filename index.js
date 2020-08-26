const Compiler = require('./lib/compiler.js')
const options = require('./webppack.config.js')

new Compiler(options).run()