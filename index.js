const {readFile, writeFile} = require("node:fs/promises");
const path = require("node:path");

async function updatePackage() {
  const localData = await readFile(path.resolve(__dirname, "./package.json"));
  const localPackage = JSON.parse(localData);
  const rootData = await readFile(path.resolve(__dirname, "../../package.json"));
  const rootPackage = JSON.parse(rootData);
console.log("local\n", localPackage)
  if(localPackage.watch) {
    rootPackage.watch = localPackage.watch;
  }
  if(localPackage.jest) {
    rootPackage.jest = localPackage.jest;
  }
  for(let script in localPackage.scripts) {
    if(script.match(/start/)) { continue; }

    rootPackage.scripts[script] = localPackage.scripts[script];
  }
  console.log("final\n", rootPackage);
  await writeFile(path.resolve(__dirname, "../../package.json"), JSON.stringify(rootPackage));
}

module.exports = updatePackage;
