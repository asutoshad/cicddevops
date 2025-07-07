
const fs = require('fs');
const semver = require('semver');

const bumpType = process.argv[2] || 'patch'; 
const versionFile = './VERSION';

let currentVersion = fs.existsSync(versionFile)
  ? fs.readFileSync(versionFile, 'utf-8').trim()
  : '0.1.0';

const newVersion = semver.inc(currentVersion, bumpType);

if (!newVersion) {
  console.error('Invalid bump type or version.');
  process.exit(1);
}

fs.writeFileSync(versionFile, newVersion);
console.log(`Bumped ${currentVersion} → ${newVersion}`);
