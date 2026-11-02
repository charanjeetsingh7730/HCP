const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticDir = path.join(rootDir, '.next', 'static');
const destStaticDir = path.join(standaloneDir, '.next', 'static');
const publicDir = path.join(rootDir, 'public');
const destPublicDir = path.join(standaloneDir, 'public');

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone does not exist. Run next build first.');
  process.exit(1);
}

console.log('Copying static assets into .next/standalone...');
copyDirSync(staticDir, destStaticDir);
console.log('✓ Copied .next/static -> .next/standalone/.next/static');

if (fs.existsSync(publicDir)) {
  copyDirSync(publicDir, destPublicDir);
  console.log('✓ Copied public -> .next/standalone/public');
}

const envExample = path.join(rootDir, '.env.example');
const destEnvExample = path.join(standaloneDir, '.env.example');
if (fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, destEnvExample);
  console.log('✓ Copied .env.example -> .next/standalone/.env.example');
}

console.log('Standalone deployment bundle ready in .next/standalone!');

