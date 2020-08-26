(function(graph){
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
      require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./hello.js":"./src\\hello.js","./a.js":"./src\\a.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\nrequire(\"./a.js\");\n\ndocument.write((0, _hello.say)('webpack')); // 入口文件的内容、依赖"},"./src\\hello.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nfunction say(name) {\n  return 'hello' + name;\n}"},"./src\\a.js":{"dependencies":{"./ab.js":"./src\\ab.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = a;\n\nvar _ab = require(\"./ab.js\");\n\nfunction a(name) {\n  return 'a' + name;\n}"},"./src\\ab.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = b;\n\nfunction b(name) {\n  return 'ab' + name;\n}"}})   