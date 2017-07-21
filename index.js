let babel_core = require("babel-core");
const fs = require("fs");
const path = require("path");

let code1 = fs.readFileSync("file1.js", "utf-8");
let babelResult1 = babel_core.transform(code1, {
  presets: ["es2015"],
  sourceMap: true,
  filename: path.resolve("file1.js"),
  sourceFileName: path.resolve("file1.js"),
  code: true,
  ast: false
});

let virtual = new Function(
  `${babelResult1.code}//# sourceURL=file:///${path.join(
    path.dirname(path.resolve("index.js")),
    "virtual.js"
  )}\n//# sourceMappingURL=file:///${path.join(
    path.dirname(path.resolve("index.js")),
    "virtual.js.map"
  )}`
);

let sourcemap = babelResult1.map

fs.writeFileSync("virtual.js.map", JSON.stringify(sourcemap), "utf-8");

virtual();
