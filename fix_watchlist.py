import re

with open('src/app/saatler/WatchListClient.tsx', 'r') as f:
    content = f.read()

# We want to change the layout from sidebar to top bar
new_layout = """    <div className="flex flex-col gap-8">
      {/* Filters Horizontal Top Bar */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface/50 p-6 rounded-xl border border-surface-border mb-4">
        {/* Cinsiyet */}
        <div className="flex flex-col">
          <h3 className="font-serif text-sm uppercase tracking-wider text-foreground mb-3 text-[#846b32]">Cinsiyet</h3>
          <select 
            className="w-full p-3 bg-surface border border-surface-border rounded text-sm text-foreground focus:outline-none focus:border-primary transition-colors hover:border-primary/50"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">Tüm Saatler</option>
            <option value="Erkek">Erkek Saatleri</option>
            <option value="Kadın">Kadın Saatleri</option>
          </select>
        </div>

        {/* Marka */}
        <div className="flex flex-col">
          <h3 className="font-serif text-sm uppercase tracking-wider text-foreground mb-3 text-[#846b32]">Marka</h3>
          <select 
            className="w-full p-3 bg-surface border border-surface-border rounded text-sm text-foreground focus:outline-none focus:border-primary transition-colors hover:border-primary/50"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Tüm Markalar</option>
            {brands.map(b => (
              <option key={b as string} value={b as string}>{b as string}</option>
            ))}
          </select>
        </div>

        {/* Fiyat Aralığı */}
        <div className="flex flex-col">
          <h3 className="font-serif text-sm uppercase tracking-wider text-foreground mb-3 text-[#846b32]">Fiyat Aralığı</h3>
          <select 
            className="w-full p-3 bg-surface border border-surface-border rounded text-sm text-foreground focus:outline-none focus:border-primary transition-colors hover:border-primary/50"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Tüm Fiyatlar</option>
            <option value="low">500.000 ₺ ve altı</option>
            <option value="mid">500.000 ₺ - 1.500.000 ₺</option>
            <option value="high">1.500.000 ₺ ve üzeri</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full">
        <div className="mb-6 flex justify-between items-center border-b border-surface-border pb-2">
           <div className="text-sm text-foreground/60 font-serif"><strong className="text-primary">{filtered.length}</strong> eşsiz model listeleniyor.</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">"""

# regex to replace the container
old_layout_pattern = r'<div className="flex flex-col md:flex-row gap-8">.*?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">'

content_replaced = re.sub(old_layout_pattern, new_layout, content, flags=re.DOTALL)

with open('src/app/saatler/WatchListClient.tsx', 'w') as f:
    f.write(content_replaced)

print("Updated WatchListClient layout!")
