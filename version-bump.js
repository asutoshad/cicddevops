// scripts/version-bump.js
const fs = require('fs');
const path = require('path');

const semver = require('semver');

const packageJsonPath = path.join(__dirname, '../package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('package.json not found!');
  process.exit(1);
}

const bumpType = process.argv[2]; // 'patch', 'minor', or 'major'

if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error('Invalid bump type. Use patch, minor, or major.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = pkg.version;

if (!semver.valid(currentVersion)) {
  console.error('Invalid version in package.json:', currentVersion);
  process.exit(1);
}

const newVersion = semver.inc(currentVersion, bumpType);
pkg.version = newVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');

console.log(`Bumped ${currentVersion} → ${newVersion}`);
