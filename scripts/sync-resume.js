const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const resumeSrcDir = path.join(projectRoot, 'resume');

// Check source resume directory
if (!fs.existsSync(resumeSrcDir)) {
  console.warn('[sync-resume] resume directory not found at:', resumeSrcDir);
  process.exit(0);
}

// Find any PDF in resume/
const files = fs.readdirSync(resumeSrcDir);
const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));

if (!pdfFile) {
  console.warn('[sync-resume] No PDF found in resume directory.');
  process.exit(0);
}

const sourcePdfPath = path.join(resumeSrcDir, pdfFile);
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
