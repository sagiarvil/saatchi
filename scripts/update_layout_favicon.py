import re

filepath = "/Users/macair1/projects/saatchi/src/app/layout.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the icon array
old_icons = """    icon: [
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
    ]"""
new_icons = """    icon: '/favicon.svg'"""

if old_icons in content:
    content = content.replace(old_icons, new_icons)
else:
    # try regex
    content = re.sub(r'icon:\s*\[[^\]]+\]', "icon: '/favicon.svg'", content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated layout.tsx")
