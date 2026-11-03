const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// On Vercel CI/CD, skip local dist packaging (Vercel natively deploys Next.js)
if (process.env.VERCEL) {
  console.log('✓ Building on Vercel: native deployment active, skipping local dist packaging.');
  process.exit(0);
}

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
const outDir = path.join(rootDir, 'out');
const distDir = path.join(rootDir, 'dist');
const zipFile = path.join(rootDir, 'dist.zip');

if (!fs.existsSync(outDir)) {
  console.error('Error: "out" directory does not exist. Run "next build" first.');
  process.exit(1);
}

console.log('Preparing "dist" folder for Hostinger deployment...');

// Remove existing dist if present
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Copy out -> dist
copyDirSync(outDir, distDir);
console.log('✓ Successfully populated "dist" directory from export.');

// Zip the dist directory for easy one-click upload
try {
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }
  console.log('Creating "dist.zip" archive...');
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipFile}' -Force"`);
  console.log('✓ "dist.zip" created successfully.');
} catch (err) {
  console.warn('Zip creation notice:', err.message);
}

console.log('\n=============================================');
console.log('✓ Production React build is ready in:');
console.log(`  ${distDir}`);
console.log('✓ One-click upload zip is ready at:');
console.log(`  ${zipFile}`);
console.log('=============================================\n');

