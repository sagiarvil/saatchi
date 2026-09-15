const fs = require('fs');

let content = fs.readFileSync('src/app/layout.tsx', 'utf8');

const importStatement = `import { PremiumBackButton } from "@/components/ui/PremiumBackButton";\n`;

content = content.replace('import "./globals.css";', 'import "./globals.css";\n' + importStatement);

content = content.replace(
  '<main className="flex-grow">', 
  '<PremiumBackButton />\n        <main className="flex-grow">'
);

fs.writeFileSync('src/app/layout.tsx', content);
