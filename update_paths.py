import os
import glob
import re

directory = "c:/NextGen"

# Replace 'images/' with '' in html, css, and js files
for ext in ["*.html", "*.css", "*.js"]:
    for filepath in glob.glob(os.path.join(directory, ext)):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace occurrences of 'images/' with nothing
        new_content = re.sub(r'images\/', '', content)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
                print(f"Updated {filepath}")
