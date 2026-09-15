import os
import re

files_to_update = [
    "src/app/markalar/[slug]/page.tsx",
    "src/app/elit-saat/[slug]/page.tsx",
    "src/app/saatler/[slug]/page.tsx"
]

def replace_in_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r"import fs from 'fs';\n", "", content)
    content = re.sub(r"import path from 'path';\n", "", content)
    
    if "import saatlerData" not in content:
        content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport saatlerData from '@/data/saatler.json';\nimport elitSaatlerData from '@/data/elit-saatler.json';")

    if "markalar" in filepath:
        content = re.sub(
            r"const saatlerPath = path\.join.*?if \(fs\.existsSync\(elitPath\)\) \{[^\}]+\}",
            "let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];",
            content,
            flags=re.DOTALL
        )
    elif "elit-saat" in filepath:
        content = re.sub(
            r"const filePath = path\.join.*?if \(fs\.existsSync\(filePath\)\) \{[^\}]+\}",
            "let allWatches: any[] = (elitSaatlerData as any[]);\n  const watches = allWatches;",
            content,
            flags=re.DOTALL
        )
    elif "saatler" in filepath:
        content = re.sub(
            r"const saatlerPath = path\.join.*?(if \(fs\.existsSync\(saatlerPath\)\) [^\n]+\n\s*if \(fs\.existsSync\(elitPath\)\) [^\n]+)",
            "let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];",
            content,
            flags=re.DOTALL
        )
        content = re.sub(
            r"const saatlerPath = path\.join.*?if \(fs\.existsSync\(elitPath\)\) \{[^\}]+\}",
            "let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];",
            content,
            flags=re.DOTALL
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filepath in files_to_update:
    replace_in_file(filepath)

print("Done")
