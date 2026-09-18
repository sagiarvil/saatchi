const fs = require('fs');
const file = 'src/app/admin/viplink/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// replace useEffect auth check
code = code.replace(/const response = await fetch\('\/api\/admin-session'[^]*?if \(active\) setAuthLoading\(false\);\s*\}/m, 
`        if (!active) return;
        setAuthenticated(true);
        await loadLinks();
      } catch {
        if (active) setAuthenticated(false);
      } finally {
        if (active) setAuthLoading(false);
      }`);

fs.writeFileSync(file, code);
