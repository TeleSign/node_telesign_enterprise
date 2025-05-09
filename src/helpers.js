const fs = require('fs');
const path = require('path');

function getVersionDependency(packageName) {
  try {
    const pkg = require(`${packageName}/package.json`);
    return pkg.version;
  } catch (err) {
    console.error(`Error getting version for package "${packageName}":`, err.message);
    return 'unknown';
  }
}

function getInstalledVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
    return pkg.version;
  } catch (error) {
    console.error(`Error getting version of telesignenterprisesdk:`, error.message);
    return 'unknown';
  }
  
}

module.exports = {
  getInstalledVersion,
  getVersionDependency,
}