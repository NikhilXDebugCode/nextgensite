import os
import glob
import re

directory = "c:/NextGen"

# 1. Minify CSS
css_path = os.path.join(directory, "style.css")
min_css_path = os.path.join(directory, "style.min.css")

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Remove comments
css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
# Remove newlines and extra spaces
css = re.sub(r'\s+', ' ', css)
# Remove spaces around tokens
for char in ['{', '}', ';', ':', ',']:
    css = css.replace(f' {char}', char).replace(f'{char} ', char)

with open(min_css_path, "w", encoding="utf-8") as f:
    f.write(css.strip())
print("Created style.min.css")

# 2. Update HTML files
preconnect_tags = """
  <!-- Performance Optimizations -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
"""

for filepath in glob.glob(os.path.join(directory, "*.html")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add preconnect if not exists
    if "<link rel=\"preconnect\"" not in content:
        content = content.replace("  <!-- JSON-LD Schema -->", preconnect_tags + "\n  <!-- JSON-LD Schema -->")

    # Update CSS link
    content = content.replace('href="style.css"', 'href="style.min.css"')

    # Add loading="lazy" to all img tags except the main logo
    img_tags = re.findall(r'<img[^>]+>', content)
    for img in img_tags:
        if 'loading="lazy"' not in img and 'logo-img' not in img:
            new_img = img.replace('<img ', '<img loading="lazy" fetchpriority="low" decoding="async" ')
            content = content.replace(img, new_img)
            
    # In index.html, preload hero video
    if "index.html" in filepath:
        if '<link rel="preload" as="video"' not in content:
            preload_video = '<link rel="preload" as="video" href="hero-bg.mp4" type="video/mp4">\n'
            content = content.replace('<!-- Performance Optimizations -->', '<!-- Performance Optimizations -->\n  ' + preload_video)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        print(f"Optimized HTML: {filepath}")
