const fs = require('fs');
const filePath = 'src/app/saatler/[slug]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('LuxuryWatchStory')) {
  content = content.replace(
    "import { Shield, Clock, Award, ShieldCheck, Gem, CheckCircle, PackageOpen, Info, ArrowRight } from 'lucide-react';",
    "import { Shield, Clock, Award, ShieldCheck, Gem, CheckCircle, PackageOpen, Info, ArrowRight } from 'lucide-react';\nimport { LuxuryWatchStory } from '@/components/ui/LuxuryWatchStory';"
  );

  content = content.replace(
    '          {/* Technical Specs Placeholder */}',
    '          {/* Story Generator */}\n          <LuxuryWatchStory watch={watch} />\n\n          {/* Technical Specs Placeholder */}'
  );
  
  // If the placeholder is missing, let's inject it before the last closing divs
  if (!content.includes('LuxuryWatchStory watch={watch}')) {
    content = content.replace(
      '        </div>\n      </div>\n    </div>',
      '        </div>\n      </div>\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">\n        <LuxuryWatchStory watch={watch} />\n      </div>\n    </div>'
    );
  }

  fs.writeFileSync(filePath, content);
}
