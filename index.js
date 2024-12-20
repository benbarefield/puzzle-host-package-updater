const {readFile, writeFile} = require("node:fs/promises");
const path = require("node:path");

async function updatePackage(localPackagePath, rootPackagePath) {
  const localData = await readFile(localPackagePath);
  const localPackage = JSON.parse(localData);
  const rootData = await readFile(rootPackagePath);
  const rootPackage = JSON.parse(rootData);

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

  await writeFile(path.resolve(__dirname, "../../package.json"), JSON.stringify(rootPackage, null, 2));
}

module.exports = updatePackage;
