import os
import glob
import re

mega_menu_html = """<li class="has-dropdown">
        <a href="services.html">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:2px;"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
        <!-- Mega Menu Dropdown -->
        <div class="mega-menu">
          <div class="mega-menu-grid">
            <a href="services.html" class="mega-item">
              <div class="mega-icon">AI</div>
              <div class="mega-text">
                <span class="mega-title">AI &amp; Machine Learning</span>
                <span class="mega-desc">Custom models &amp; predictive analytics.</span>
              </div>
            </a>
            <a href="services.html" class="mega-item">
              <div class="mega-icon">SE</div>
              <div class="mega-text">
                <span class="mega-title">Software Engineering</span>
                <span class="mega-desc">Scalable enterprise systems.</span>
              </div>
            </a>
            <a href="services.html" class="mega-item">
              <div class="mega-icon">WD</div>
              <div class="mega-text">
                <span class="mega-title">Web &amp; App Development</span>
                <span class="mega-desc">High-performance platforms.</span>
              </div>
            </a>
            <a href="services.html" class="mega-item">
              <div class="mega-icon">CS</div>
              <div class="mega-text">
                <span class="mega-title">Cybersecurity</span>
                <span class="mega-desc">Zero-trust architecture.</span>
              </div>
            </a>
            <a href="services.html" class="mega-item">
              <div class="mega-icon">CD</div>
              <div class="mega-text">
                <span class="mega-title">Cloud &amp; DevOps</span>
                <span class="mega-desc">Migration &amp; CI/CD automation.</span>
              </div>
            </a>
            <a href="services.html" class="mega-item">
              <div class="mega-icon" style="background:rgba(34,197,94,0.15);color:#22c55e;border-color:rgba(34,197,94,0.3);">DEV</div>
              <div class="mega-text">
                <span class="mega-title">Dedicated Developers</span>
                <span class="mega-desc">Hire pre-vetted engineers.</span>
              </div>
            </a>
          </div>
        </div>
      </li>"""

for filepath in glob.glob("*.html"):
    if filepath == "index.html":
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace non-active services link
    content = re.sub(r'\s*<li><a href="services\.html">Services</a></li>', '\n      ' + mega_menu_html, content)
    # Replace active services link
    content = re.sub(r'\s*<li><a href="services\.html" class="active">Services</a></li>', '\n      ' + mega_menu_html.replace('<a href="services.html">', '<a href="services.html" class="active">'), content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
