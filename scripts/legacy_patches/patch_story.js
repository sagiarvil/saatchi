const fs = require('fs');

let content = fs.readFileSync('src/app/elit-saat/[slug]/page.tsx', 'utf8');

// Import LuxuryWatchStory
content = content.replace(
  "import { Shield, Clock, Award, ShieldCheck, Gem, CheckCircle, PackageOpen, Info, ArrowRight } from 'lucide-react';",
  "import { Shield, Clock, Award, ShieldCheck, Gem, CheckCircle, PackageOpen, Info, ArrowRight } from 'lucide-react';\nimport { LuxuryWatchStory } from '@/components/ui/LuxuryWatchStory';"
);

// Inject the component after the Specs section and Price area
// Let's find a safe spot, maybe right before the closing div of the text column (lg:w-1/2).
// Actually, it might look better spanning the whole width below everything, or just inside the text column.
// Since it's long, spanning the whole width below the grid/flex is better.
content = content.replace(
  '          {/* Similar Models Placeholder */}',
  '          {/* Story Generator */}\n          <LuxuryWatchStory watch={watch} />\n\n          {/* Similar Models Placeholder */}'
);

fs.writeFileSync('src/app/elit-saat/[slug]/page.tsx', content);
