const recursive = require("recursive-readdir");
const prettier = require("prettier");
const { join } = require("path");
const fs = require("fs");

const srcRootName = "doc";

recursive(join(__dirname, srcRootName), function(err, files) {
  const fileTreeFlat = {};
  files.forEach(file => {
    file = file.replace(/\\/g, "/");
    let fileArr = file.split("/");
    if (fileArr.every(fileLeaf => fileLeaf !== "private")) {
      fileArr = fileArr.slice(fileArr.indexOf(srcRootName));
      const lastIndex = fileArr.length - 1;
      const categoryName = fileArr.slice(0, lastIndex).join("/");
      if (!fileTreeFlat[categoryName]) {
        fileTreeFlat[categoryName] = [];
      }
      fileTreeFlat[categoryName].push(fileArr[lastIndex]);
    }
  });
  console.log('fileTreeFlat', fileTreeFlat);
  let fileText = "# Summary\n\n";
  fileText += "- [Introduction](README.md)\n";

  for (const key in fileTreeFlat) {
    if (fileTreeFlat.hasOwnProperty(key)) {
      fileText += `- ${key}\n`;
      fileTreeFlat[key].forEach(file => {
        fileText += `  - [${file.split(".")[0]}](${key}/${file})\n`;
      });
    }
  }

  fs.writeFile(join(__dirname, "./SUMMARY.md"), fileText, err => {
    if (err) throw err;
    console.log("generate success");
  });
});
