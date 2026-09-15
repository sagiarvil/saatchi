import os
import re

files_to_update = [
    "src/app/markalar/page.tsx",
    "src/app/markalar/[slug]/page.tsx",
    "src/app/elit-saat/[slug]/page.tsx",
    "src/app/saatler/[slug]/page.tsx"
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Remove fs and path imports
    content = re.sub(r"import\s+fs\s+from\s+['\"]fs['\"];\n?", "", content)
    content = re.sub(r"import\s+path\s+from\s+['\"]path['\"];\n?", "", content)
    
    # Add json imports if not exists
    if "import saatlerData" not in content:
        # Find the last import and insert after it
        imports_end = 0
        for match in re.finditer(r"import\s+.*?\n", content):
            imports_end = match.end()
        
        insert_str = "import saatlerData from '@/data/saatler.json';\nimport elitSaatlerData from '@/data/elit-saatler.json';\n"
        content = content[:imports_end] + insert_str + content[imports_end:]

    # Replace the dynamic read logic
    # Usually it looks like:
    # const saatlerPath = path.join(process.cwd(), 'src/data/saatler.json');
    # ...
    # if (fs.existsSync(saatlerPath)) { ... }
    
    # We will just replace it with:
    # let allWatches: any[] = [...saatlerData, ...elitSaatlerData];
    
    # Match the block where watches are populated
    pattern = r"const saatlerPath.*?(?=// Extract unique brands|// Find watches|// Find category|const categoryName|return \()"
    
    def repl(m):
        return "let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];\n  "
        
    content = re.sub(pattern, repl, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
