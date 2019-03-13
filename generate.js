const recursive = require("recursive-readdir");
const { join } = require("path");
const { writeFile, statSync } = require("fs");

const srcRootName = "doc";

const flatFiles = files => {
  const flat = [];
  files.forEach(file => {
    file = file.replace(/\\/g, "/");
    let fileArr = file.split("/");
    // filter private file
    if (fileArr.every(fileLeaf => fileLeaf !== "private")) {
      fileArr = fileArr.slice(fileArr.indexOf(srcRootName));
      // flat dir
      fileArr.reduce((prev, cur, index) => {
        const total = prev + `${index !== 0 ? "/" : ""}${cur}`;
        if (!flat.some(leaf => leaf.id === total)) {
          flat.push({
            id: total,
            pid: prev,
            name: cur
          });
        }
        return total;
      }, "");
    }
  });
  return flat;
};

const flat2Tree = flat => {
  const result = [];
  const hash = {};
  flat.forEach(item => {
    hash[item.id] = item;
  });

  flat.forEach(item => {
    const hashVP = hash[item.pid];
    if (hashVP) {
      if (!hashVP.children) {
        hashVP.children = [];
      }
      hashVP.children.push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

const render = tree => {
  let text = "# Summary\n\n";
  text += "- [Introduction](README.md)\n";
  const renderText = (item, level = 0) => {
    const prefix = new Array(level).fill("  ").join("");
    const isFile = statSync(join(__dirname, item.id)).isFile();
    text +=
      `${prefix}- ` +
      (isFile ? `[${item.name}](${item.id})` : item.name) +
      "\n";
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        renderText(child, level + 1);
      });
    }
  };
  tree[0].children.forEach(item => {
    renderText(item);
  });
  return text;
};

recursive(join(__dirname, srcRootName), function(err, files) {
  const flat = flatFiles(files);
  const tree = flat2Tree(flat);
  const text = render(tree);

  writeFile(join(__dirname, "./SUMMARY.md"), text, err => {
    if (err) throw err;
    console.log("generate success");
  });
});
