const fs = require('fs');
const path = 'src/app/markalar/[slug]/page.tsx';
if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');

    content = content.replace(
      /className="group bg-white p-6 hover:shadow-\[0_10px_40px_-10px_rgba\(0,0,0,0\.08\)\] transition-all duration-500 flex flex-col items-center"/g,
      'className="group bg-white rounded-2xl border border-black/5 p-4 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:border-[#C2A768]/40 transition-all duration-500 flex flex-col items-center"'
    );

    content = content.replace(
      /className="w-full h-64 mb-6 relative overflow-hidden flex items-center justify-center bg-white p-4"/g,
      'className="w-full aspect-square mb-6 relative overflow-hidden flex items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_50%,_#ffffff_20%,_#f8f6f0_100%)] border border-black/5 p-4"'
    );

    content = content.replace(
      /className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" \/>/g,
      'className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 drop-shadow-sm" />'
    );
    
    fs.writeFileSync(path, content);
    console.log("Patched markalar");
}
