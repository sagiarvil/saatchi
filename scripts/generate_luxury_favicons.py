import os
from PIL import Image, ImageDraw, ImageFont

public_dir = os.path.abspath("public")
os.makedirs(public_dir, exist_ok=True)

# 512x512 Master Icon Üretimi (Ultra-Lüks Saatchi & Co. Tasarımı)
# Siyah (#0B0A09) yuvarlatılmış lüks kare, altın kenarlık (#846B32) ve ortada şık lüks amblem '&'
size = 512
img = Image.new("RGBA", (size, size), (11, 10, 9, 255))
draw = ImageDraw.Draw(img)

# Lüks çift katmanlı altın çerçeve
margin = 24
draw.rounded_rectangle(
    [margin, margin, size - margin, size - margin],
    radius=96,
    outline=(132, 107, 50, 180),
    width=6
)
inner_margin = margin + 12
draw.rounded_rectangle(
    [inner_margin, inner_margin, size - inner_margin, size - inner_margin],
    radius=84,
    outline=(194, 167, 104, 230),
    width=3
)

# Tipografik '&' glifi
font = None
font_paths = [
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    "/System/Library/Fonts/Times.ttc",
    "/System/Library/Fonts/Helvetica.ttc",
]

for fp in font_paths:
    if os.path.exists(fp):
        try:
            font = ImageFont.truetype(fp, 320)
            break
        except Exception:
            continue

if font is None:
    font = ImageFont.load_default()

text = "&"
# Metin sınırlarını hesapla ve ortala
bbox = draw.textbbox((0, 0), text, font=font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]
text_x = (size - text_w) // 2 - bbox[0]
text_y = (size - text_h) // 2 - bbox[1] - 8

# İnce altın gölge efekti
draw.text((text_x + 3, text_y + 3), text, font=font, fill=(50, 40, 20, 160))
# Ana parlak lüks altın renk
draw.text((text_x, text_y), text, font=font, fill=(212, 185, 120, 255))

# Kaydedilecek boyutlar
sizes = [
    (512, "android-chrome-512x512.png"),
    (512, "favicon-512x512.png"),
    (192, "favicon-192x192.png"),
    (180, "apple-touch-icon.png"),
    (96, "favicon-96x96.png"),
    (48, "favicon-48x48.png"),
    (32, "favicon-32x32.png"),
    (16, "favicon-16x16.png"),
]

for s, filename in sizes:
    resized = img.resize((s, s), Image.Resampling.LANCZOS)
    out_path = os.path.join(public_dir, filename)
    resized.save(out_path, "PNG", optimize=True)
    print(f"✅ Üretildi: {filename} ({s}x{s})")

# Multi-resolution favicon.ico (16, 32, 48)
ico_path = os.path.join(public_dir, "favicon.ico")
img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_48.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("✅ Üretildi: favicon.ico (16, 32, 48 px multi-res)")
