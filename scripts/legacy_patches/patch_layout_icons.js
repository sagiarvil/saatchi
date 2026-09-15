const fs = require('fs');
let code = fs.readFileSync('src/app/layout.tsx', 'utf8');

code = code.replace(
  'export const metadata: Metadata = {',
  `export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
    ]
  },`
);

fs.writeFileSync('src/app/layout.tsx', code);
