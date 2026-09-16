import re

path = '/Users/macair1/projects/saatchi/src/app/elit-saat/[slug]/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replacements for the PRODUCT DETAIL VIEW to make it light theme
content = content.replace(
    'bg-[#070A09] min-h-screen border-t border-[#1a1a1a]', 
    'bg-[#F8F9FA] min-h-screen border-t border-gray-200'
)

content = content.replace(
    "style={{ background: '#0d1613', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '18px', color: '#fff', padding: '24px' }}",
    "style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '18px', color: '#1F2937', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}"
)

content = content.replace(
    "style={{ fontSize: '13px', color: '#a3b8b0', marginBottom: '20px' }}",
    "style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}"
)

content = content.replace(
    "style={{ color: '#fff' }}>{watch.modelName}",
    "style={{ color: '#111827', fontWeight: 600 }}>{watch.modelName}"
)

# Hero AEO Block
content = content.replace(
    "background: 'rgba(194,167,104,0.05)', border: '1px solid rgba(194,167,104,0.2)'",
    "background: '#F0FDF4', border: '1px solid #BBF7D0'"
)
content = content.replace(
    "color: '#C2A768'",
    "color: '#065F46'"
)
content = content.replace(
    "color: '#d5e2dc'",
    "color: '#374151'"
)

# Gallery bg
content = content.replace(
    "background: '#070d0b'",
    "background: '#F9FAFB'"
)

# Info section
content = content.replace(
    "color: '#fff' }}>{watch.modelName}",
    "color: '#111827' }}>{watch.modelName}"
)
content = content.replace(
    "color: '#8fa099'",
    "color: '#6B7280'"
)
content = content.replace(
    "color: '#34D399'",
    "color: '#059669'"
)

# Special order info
content = content.replace(
    "background: 'rgba(194,167,104,0.1)', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: '1.5', color: '#f0e6d2'",
    "background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: '1.5', color: '#92400E'"
)
content = content.replace(
    "color: '#d5e2dc'",
    "color: '#92400E'"
)
content = content.replace(
    "color: '#C2A768'",
    "color: '#B45309'"
)

# Buttons
content = content.replace(
    "background: 'linear-gradient(135deg,#C2A768,#9E8548)', color: '#070A09'",
    "background: '#0F766E', color: '#FFFFFF'"
)
content = content.replace(
    "background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 24px', border: '1px solid rgba(255,255,255,0.2)'",
    "background: '#FFFFFF', color: '#0F766E', padding: '14px 24px', border: '1px solid #0F766E'"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Rewrite complete.")
