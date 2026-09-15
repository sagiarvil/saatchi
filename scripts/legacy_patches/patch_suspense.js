const fs = require('fs');
let code = fs.readFileSync('src/app/vip-checkout/page.tsx', 'utf8');

// Rename the main component to VIPCheckoutContent
code = code.replace('export default function VIPCheckout() {', 'function VIPCheckoutContent() {');

// Add the wrapper at the bottom
code += `

export default function VIPCheckout() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0A1412] flex items-center justify-center text-[#D4AF37]">Yükleniyor...</div>}>
      <VIPCheckoutContent />
    </React.Suspense>
  );
}
`;

fs.writeFileSync('src/app/vip-checkout/page.tsx', code);
