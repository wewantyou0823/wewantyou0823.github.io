import os
from PIL import Image

# Set your target directory
input_dir = './'  # Replace with your directory path

# Supported image extensions
image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.webp')

for filename in os.listdir(input_dir):
    if filename.lower().endswith(image_extensions):
        file_path = os.path.join(input_dir, filename)
        with Image.open(file_path) as img:
            # Downsample
            new_size = (img.width // 2, img.height // 2)
            resized_img = img.resize(new_size, Image.LANCZOS)

            # Save with _resized suffix
            base, ext = os.path.splitext(filename)
            new_filename = f"{base}_resized{ext}"
            resized_img.save(os.path.join(input_dir, new_filename))

print("Downsampling complete.")
