const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const resumeSrcDir = path.join(projectRoot, 'resume');

// Check source PDF in root or resume directory
let sourcePdfPath = null;
const rootFiles = fs.readdirSync(projectRoot);
const rootPdf = rootFiles.find(f => f.toLowerCase().endsWith('.pdf'));

if (rootPdf) {
  sourcePdfPath = path.join(projectRoot, rootPdf);
} else if (fs.existsSync(resumeSrcDir)) {
  const files = fs.readdirSync(resumeSrcDir);
  const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));
  if (pdfFile) {
    sourcePdfPath = path.join(resumeSrcDir, pdfFile);
  }
}

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
