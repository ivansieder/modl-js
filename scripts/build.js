const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");
const StripWhitespace = require("strip-whitespace");
const UglifyJS = require("uglify-js");

const stripWhitespace = new StripWhitespace();

{
  const { code: transpiledCode } = babel.transformFileSync(path.resolve(__dirname, "../src/index.js"));
  const { code: strippedCode } = stripWhitespace.strip(transpiledCode);
  const { code: uglifiedCode } = UglifyJS.minify(strippedCode);

  fs.writeFileSync(path.resolve(__dirname, "../modl.min.js"), uglifiedCode);
}

// Common.js
{
  const { code: transpiledCode } = babel.transformFileSync(path.resolve(__dirname, "../src/index.common.js"));
  const { code: strippedCode } = stripWhitespace.strip(transpiledCode);
  const { code: uglifiedCode } = UglifyJS.minify(strippedCode);

  fs.writeFileSync(path.resolve(__dirname, "../modl.common.min.js"), uglifiedCode);
}