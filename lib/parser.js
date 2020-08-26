const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const {transformFromAst} = require('@babel/core');
const path = require('path');

module.exports = {
  getAst: (path) => {
    const content = fs.readFileSync(path, 'utf-8');
    return babelParser.parse(content, {
      sourceType: 'module'
    });
  },
  getDependencies: (ast, filename) => {
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({node}) {
        const dirname = path.dirname(filename);
        const newFile = "./" + path.join(dirname, node.source.value)
        dependencies[node.source.value] = newFile;
      }
    });
    return dependencies;
  },
  getCode: (ast) => {
    const {code} = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code;
  }
}