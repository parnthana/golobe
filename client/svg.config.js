const path = require("path");

module.exports = {
  index: true,
  typescript: true,
  removeViewBox: false,
  icon: true,
  dimensions: true,
  titleProp: false,
  descProp: false,
  ignoreExisting: true,
  filenameCase: "pascal",
  prettierConfig: {
    trailingComma: "none",
    singleQuote: true,
    tabWidth: 2
  },
  indexTemplate: (files) => {
    const exportEntries = files.map(
      ({ path: filePath}) => {
        const basename = path.basename(filePath, path.extname(filePath));
        return `export { default as ${basename}Icon } from './${basename}'`;
      }
    );
    return exportEntries.join("\n");
  }
};
