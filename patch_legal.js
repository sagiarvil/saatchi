const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Case-sensitive replacements to handle Turkish characters
      content = content.replace(/BELGİN KUYUMCULUK/g, 'SAATCHI SAAT');
      content = content.replace(/Belgin Kuyumculuk/g, 'Saatchi Saat');
      content = content.replace(/belgin kuyumculuk/g, 'saatchi saat');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('src/data/legal');
console.log('Legal files updated.');
