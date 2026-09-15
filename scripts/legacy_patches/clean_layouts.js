const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/*.tsx');

files.forEach(file => {
  if (file === 'src/app/layout.tsx') return;
  
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove <Navbar />
  if (content.includes('<Navbar />')) {
    content = content.replace(/<Navbar \/>/g, '');
    changed = true;
  }
  
  // Remove footer blocks in page.tsx
  if (file === 'src/app/page.tsx' && content.includes('<footer')) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned:', file);
  }
});
