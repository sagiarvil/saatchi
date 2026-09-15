const fs = require('fs');

let content = fs.readFileSync('src/app/saatler/[slug]/page.tsx', 'utf8');

// Replace the data reading logic to read both files
const searchStr = `  const filePath = path.join(process.cwd(), 'src/data/saatler.json');
  let allWatches: any[] = [];
  
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    allWatches = JSON.parse(fileContents);
  }`;

const replaceStr = `  const saatlerPath = path.join(process.cwd(), 'src/data/saatler.json');
  const elitPath = path.join(process.cwd(), 'src/data/elit-saatler.json');
  let allWatches: any[] = [];
  
  if (fs.existsSync(saatlerPath)) {
    allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(saatlerPath, 'utf8'))];
  }
  if (fs.existsSync(elitPath)) {
    allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(elitPath, 'utf8'))];
  }`;

content = content.replace(searchStr, replaceStr);

// Also need to fix generateStaticParams
const staticSearch = `  const filePath = path.join(process.cwd(), 'src/data/saatler.json');
  let slugs = ['erkek', 'kadin', 'unisex']; // Category slugs
  
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const watches = JSON.parse(fileContents);
    const watchSlugs = watches.map((w: any) => {
      const parts = w.seoUrl.split('/');
      return parts[parts.length - 1];
    });
    slugs = [...slugs, ...watchSlugs];
  }`;

const staticReplace = `  let slugs = ['erkek', 'kadin', 'unisex']; // Category slugs
  const saatlerPath = path.join(process.cwd(), 'src/data/saatler.json');
  const elitPath = path.join(process.cwd(), 'src/data/elit-saatler.json');
  
  let allWatches: any[] = [];
  if (fs.existsSync(saatlerPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(saatlerPath, 'utf8'))];
  if (fs.existsSync(elitPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(elitPath, 'utf8'))];

  const watchSlugs = allWatches.map((w: any) => {
    const parts = w.seoUrl.split('/');
    return parts[parts.length - 1];
  });
  slugs = [...slugs, ...watchSlugs];
`;

content = content.replace(staticSearch, staticReplace);

// The filter logic checks for 'kadin', 'kadın', 'lady'. Let's also check category.
const filterSearch = `if (slug === 'kadin') {
      filteredWatches = allWatches.filter(w => w.seoUrl.toLowerCase().includes('kadin') || w.modelName.toLowerCase().includes('kadın') || w.modelName.toLowerCase().includes('lady'));
    } else if (slug === 'erkek') {
      filteredWatches = allWatches.filter(w => w.seoUrl.toLowerCase().includes('erkek') || (!w.seoUrl.toLowerCase().includes('kadin') && !w.modelName.toLowerCase().includes('kadın') && !w.modelName.toLowerCase().includes('lady')));
    }`;

const filterReplace = `if (slug === 'kadin') {
      filteredWatches = allWatches.filter(w => 
        w.seoUrl.toLowerCase().includes('kadin') || 
        w.modelName.toLowerCase().includes('kadın') || 
        w.modelName.toLowerCase().includes('lady') || 
        (w.category && w.category.toLowerCase().includes('kadın'))
      );
    } else if (slug === 'erkek') {
      filteredWatches = allWatches.filter(w => 
        (w.category && w.category.toLowerCase().includes('erkek')) ||
        (!w.seoUrl.toLowerCase().includes('kadin') && !w.modelName.toLowerCase().includes('kadın') && !w.modelName.toLowerCase().includes('lady') && (!w.category || !w.category.toLowerCase().includes('kadın')))
      );
    }`;

content = content.replace(filterSearch, filterReplace);

fs.writeFileSync('src/app/saatler/[slug]/page.tsx', content);
