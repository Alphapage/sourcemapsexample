let babel_core = require('babel-core');
const fs = require('fs');
const path = require('path');

let code1 = fs.readFileSync('file1.js', 'utf-8');
let babelResult1 = babel_core.transform(code1, {
    presets: ['es2015'],
    sourceMap: true,
    filename: 'http://localhost:3000/file1.js',
    sourceFileName: 'http://localhost:3000/file1.js',
    code: true,
    ast: false
});

let inlineSourcemap = false;
let virtualStr;
let sourcemap = babelResult1.map;

if (inlineSourcemap) {
    virtualStr = `new Function(\`${babelResult1.code}//# sourceURL=http://localhost:3000/virtual.js\n${require('convert-source-map')
        .fromObject(sourcemap)
        .toComment()}\n\`)()`;
} else {
    virtualStr = `new Function(\`${babelResult1.code}//# sourceURL=http://localhost:3000/virtual.js\n//# sourceMappingURL=http://localhost:3000/virtual.js.map\n\`)()`;

    fs.writeFileSync('./public/virtual.js.map', JSON.stringify(sourcemap), 'utf-8');
}

fs.writeFileSync('./public/file1.js', code1, 'utf-8');
fs.writeFileSync('./public/index.js', virtualStr, 'utf-8');

var express = require('express');

var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
