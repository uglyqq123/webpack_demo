
const fs = require('fs');
const path = require('path');
const  {getAst,getCode, getDependencies} = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const {entry, output} = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    const info = this.build(this.entry);
    this.modules.push(info);
    for(let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const {dependencies} = item
      if(dependencies) {
        for(let j in dependencies) {
          this.modules.push(this.build(dependencies[j]));
        }
      }
    }
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.filename] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    this.file(obj);
  }
  build(filename) {
    let ast = getAst(filename);
    let dependencies = getDependencies(ast, filename);
    let code = getCode(ast);
    return {
      filename,
      dependencies,
      code
    }
  }
  file(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code)
    const bundle = `(function(graph){
      function require(module) {
        var exports = {};
        function localeRequire(relativePath) {
          return require(graph[module].dependencies[relativePath])
        }
        (function(require, exports, code) {
          eval(code)
        })(localeRequire, exports, graph[module].code)
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`;

    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}