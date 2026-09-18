const fs = require('fs');

let page = fs.readFileSync('src/app/admin/viplink/page.tsx', 'utf8');

// Remove setAuthenticated references
page = page.replace(/setAuthenticated\(false\);/g, '// setAuthenticated(false);');

fs.writeFileSync('src/app/admin/viplink/page.tsx', page);
console.log('Fixed page.tsx compilation.');
