import re

with open('src/app/saatler/[slug]/page.tsx', 'r') as f:
    content = f.read()

# Make sure it imports WatchListClient properly
if "import WatchListClient from" not in content:
    content = content.replace("import { LuxuryWatchStory }", 'import WatchListClient from "../WatchListClient";\nimport { LuxuryWatchStory }')

pattern = re.compile(r'return \(\s*<div className="bg-background min-h-screen py-20 border-t border-surface-border">.*?</Link>\s*\);\s*}\)\}\s*</div>\s*</div>\s*</div>\s*\);', re.DOTALL)

replacement = """return (
      <div className="bg-background min-h-screen py-20 border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">{categoryTitle}</h1>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">Zamanın ruhunu yansıtan eşsiz tasarımlar. Saatchi güvencesiyle lüksün doruklarına ulaşın.</p>
          
          <WatchListClient 
            initialWatches={allWatches} 
            initialGender={slug === 'erkek' ? 'Erkek' : slug === 'kadin' ? 'Kadın' : ''} 
          />
        </div>
      </div>
    );"""

content = pattern.sub(replacement, content)

with open('src/app/saatler/[slug]/page.tsx', 'w') as f:
    f.write(content)
