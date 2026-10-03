const fs = require('fs');
const path = require('path');

function getStaticExportFlag() {
  // 1. Check process.env first
  if (process.env.STATIC_EXPORT !== undefined) {
    return process.env.STATIC_EXPORT === 'true';
  }
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT !== undefined) {
    return process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  }

  // 2. Fall back to parsing .env files (.env, .env.local, .env.production)
  const envFiles = ['.env', '.env.local', '.env.production'];
  for (const file of envFiles) {
    const envPath = path.join(__dirname, '..', file);
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/^(?:NEXT_PUBLIC_)?STATIC_EXPORT\s*=\s*["']?(true|false)["']?/m);
        if (match) {
          return match[1] === 'true';
        }
      } catch (err) {
        console.error(`[Prebuild] Failed to read or parse ${file}:`, err);
      }
    }
  }

  // 3. Default to false (Node server backend mode)
  return false;
}

const isStatic = getStaticExportFlag();

const routesToSwap = [
  path.join(__dirname, '..', 'src', 'app', 'api', 'auth', '[...nextauth]'),
  path.join(__dirname, '..', 'src', 'app', 'api', 'auth', 'reset-password'),
  path.join(__dirname, '..', 'src', 'app', 'api', 'account'),
];

console.log(`[Prebuild] Detected NEXT_PUBLIC_STATIC_EXPORT = ${isStatic}`);

for (const targetDir of routesToSwap) {
  const targetFile = path.join(targetDir, 'route.ts');
  const sourceFile = path.join(targetDir, isStatic ? 'route.static.ts' : 'route.dynamic.ts');
  console.log(`[Prebuild] Copying ${path.basename(sourceFile)} to ${path.basename(targetFile)} in ${path.basename(targetDir)}`);

  try {
    if (!fs.existsSync(sourceFile)) {
      console.error(`[Prebuild] Error: Source file ${sourceFile} does not exist!`);
      process.exit(1);
    }
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`[Prebuild] Successfully updated ${path.basename(targetDir)} Route Handler configuration.`);
  } catch (err) {
    console.error(`[Prebuild] Failed to copy configuration file for ${path.basename(targetDir)}:`, err);
    process.exit(1);
  }
}
