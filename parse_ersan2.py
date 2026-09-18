import re
with open('ersan.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all names
names = re.findall(r'\\"name\\":\\"Rolex (.*?)\\"', html)
for n in list(set(names))[:20]:
    print(n)
