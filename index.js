import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

async function updatePackage() {
  const localData = await readFile(path.resolve(__dirname, "./package.json"));
  const localPackage = JSON.parse(localData);
  const rootData = await readFile(path.resolve(__dirname, "../../package.json"));
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
  console.log(rootPackage);
  await writeFile(path.resolve(__dirname, "../../package.json"), JSON.stringify(rootPackage));
}

module.exports = updatePackage;