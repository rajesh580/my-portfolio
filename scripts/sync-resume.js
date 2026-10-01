const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const resumeSrcDir = path.join(projectRoot, 'resume');

// Check source PDF in resume/ or project root (pick the newest by modified time)
let candidates = [];

if (fs.existsSync(resumeSrcDir)) {
  const resumeFiles = fs.readdirSync(resumeSrcDir);
  const pdf = resumeFiles.find(f => f.toLowerCase().endsWith('.pdf'));
  if (pdf) {
    const fullPath = path.join(resumeSrcDir, pdf);
    candidates.push({ path: fullPath, mtime: fs.statSync(fullPath).mtimeMs });
  }
}

const rootFiles = fs.readdirSync(projectRoot);
const rootPdf = rootFiles.find(f => f.toLowerCase().endsWith('.pdf'));
if (rootPdf) {
  const fullPath = path.join(projectRoot, rootPdf);
  candidates.push({ path: fullPath, mtime: fs.statSync(fullPath).mtimeMs });
}

candidates.sort((a, b) => b.mtime - a.mtime);
const sourcePdfPath = candidates.length > 0 ? candidates[0].path : null;

if (!sourcePdfPath) {
  console.warn('[sync-resume] No PDF found in root or resume directory.');
  process.exit(0);
}

console.log(`[sync-resume] Found resume: ${sourcePdfPath}`);

// Target directories
const targets = [
  path.join(projectRoot, 'public', 'resume', 'Raj_Resume.pdf'),
  path.join(projectRoot, 'public', 'resume', 'Raj Resume.pdf'),
  path.join(projectRoot, 'public', 'Raj_Resume.pdf'),
  path.join(projectRoot, 'public', 'Raj Resume.pdf'),
  path.join(projectRoot, 'src', 'assets', 'Raj_Resume.pdf')
];

targets.forEach(targetPath => {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(sourcePdfPath, targetPath);
  console.log(`[sync-resume] Copied to ${targetPath}`);
});

console.log('[sync-resume] Resume sync completed successfully.');
