from PIL import Image, ImageOps

# Open the original icon (assuming it's black on transparent or similar)
img = Image.open('src/app/icon.png').convert('RGBA')

# Separate alpha channel
r, g, b, a = img.split()

# Create a fully white image and a fully black image for the rgb channels
white_img = Image.new('RGB', img.size, (255, 255, 255))
black_img = Image.new('RGB', img.size, (0, 0, 0))

# For Dark Mode (White Icon)
dark_mode_icon = Image.merge('RGBA', (*white_img.split(), a))
dark_mode_icon.save('public/favicon-dark.png')

# For Light Mode (Black Icon)
light_mode_icon = Image.merge('RGBA', (*black_img.split(), a))
light_mode_icon.save('public/favicon-light.png')

print("Created favicon-dark.png and favicon-light.png")
