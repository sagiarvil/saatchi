with open('src/components/cartier/CartierFilterClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_div = '<div className="w-full aspect-square relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center p-6">'
new_div = '<div className="w-full aspect-[4/5] relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center">'

old_img = '<Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply" />'
new_img = '<Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-8 md:p-12 group-hover:scale-[1.04] transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-sm" />'

content = content.replace(old_div, new_div)
content = content.replace(old_img, new_img)

with open('src/components/cartier/CartierFilterClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
