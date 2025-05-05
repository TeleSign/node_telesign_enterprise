const fs = require('fs');
const path = require('path');

function getVersionDependency(packageName) {
  try {
    const pkg = require(`${packageName}/package.json`);
    return pkg.version;
  } catch (err) {
    return null;
  }
}

function getInstalledVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
  return pkg.version;
}

module.exports = {
  getInstalledVersion,
  getVersionDependency,
}