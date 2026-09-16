import re

path = '/Users/macair1/projects/saatchi/src/app/saatler/[slug]/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure overall bg is matching the light theme
content = content.replace(
    'style={{ background: \'#f5f5f5\' }}', 
    'className="bg-[#F8F9FA]"'
)

# Replace <article> styles
content = content.replace(
    "style={{ maxWidth: '1200px', margin: '30px auto', padding: '24px', background: '#0d1613', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '18px', color: '#fff' }}",
    "style={{ maxWidth: '1200px', margin: '30px auto', padding: '24px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '18px', color: '#1F2937', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}"
)

content = content.replace(
    "style={{ fontSize: '13px', color: '#a3b8b0', marginBottom: '20px' }}",
    "style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}"
)

content = content.replace(
    "style={{ color: '#C2A768', textDecoration: 'none' }}",
    "style={{ color: '#065F46', textDecoration: 'none' }}"
)

content = content.replace(
    "style={{ color: '#fff' }}>{watch.modelName}",
    "style={{ color: '#111827', fontWeight: 600 }}>{watch.modelName}"
)

# Hero Answer Engine
content = content.replace(
    "background: '#0a100e', border: '1px solid #1a2723'",
    "background: '#F0FDF4', border: '1px solid #BBF7D0'"
)
content = content.replace(
    "color: '#a3b8b0'",
    "color: '#374151'"
)
content = content.replace(
    "color: '#fff'",
    "color: '#111827'"
)
content = content.replace(
    "color: '#8fa099'",
    "color: '#065F46'"
)
content = content.replace(
    "color: '#34D399'",
    "color: '#065F46'"
)

# Gallery
content = content.replace(
    "background: '#070d0b'",
    "background: '#F9FAFB'"
)

# Info
content = content.replace(
    "color: '#C2A768'",
    "color: '#065F46'"
)
content = content.replace(
    "color: '#fff' }}>{watch.modelName}",
    "color: '#111827' }}>{watch.modelName}"
)
content = content.replace(
    "color: '#8fa099', margin: 0 }}>Kategori",
    "color: '#6B7280', margin: 0 }}>Kategori"
)
content = content.replace(
    "color: '#34D399', margin: '8px 0'",
    "color: '#059669', margin: '8px 0'"
)

# Special Order Box
content = content.replace(
    "background: 'rgba(194,167,104,0.1)', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: 1.5, color: '#f0e6d2'",
    "background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: 1.5, color: '#92400E'"
)
content = content.replace(
    "color: '#C2A768'",
    "color: '#B45309'"
)
content = content.replace(
    "color: '#d5e2dc'",
    "color: '#374151'"
)

# Button
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

print("Rewrite 2 complete.")
