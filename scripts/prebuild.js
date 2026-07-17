const fs = require('fs');
const path = require('path');

function getStaticExportFlag() {
  // 1. Check process.env first
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT) {
    return process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  }

  // 2. Fall back to parsing .env.local file
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    try {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const match = content.match(/^NEXT_PUBLIC_STATIC_EXPORT\s*=\s*["']?(true|false)["']?/m);
      if (match) {
        return match[1] === 'true';
      }
    } catch (err) {
      console.error('[Prebuild] Failed to read or parse .env.local:', err);
    }
  }

  return false;
}

const isStatic = getStaticExportFlag();
const targetDir = path.join(__dirname, '..', 'src', 'app', 'api', 'auth', '[...nextauth]');
const targetFile = path.join(targetDir, 'route.ts');
const sourceFile = path.join(targetDir, isStatic ? 'route.static.ts' : 'route.dynamic.ts');

console.log(`[Prebuild] Detected NEXT_PUBLIC_STATIC_EXPORT = ${isStatic}`);
console.log(`[Prebuild] Copying ${path.basename(sourceFile)} to ${path.basename(targetFile)}`);

try {
  if (!fs.existsSync(sourceFile)) {
    console.error(`[Prebuild] Error: Source file ${sourceFile} does not exist!`);
    process.exit(1);
  }
  fs.copyFileSync(sourceFile, targetFile);
  console.log('[Prebuild] Successfully updated Route Handler configuration.');
} catch (err) {
  console.error('[Prebuild] Failed to copy configuration file:', err);
  process.exit(1);
}
