import os
from bs4 import BeautifulSoup

BASE_URL = "https://www.nextgenforge.tech"
SITE_NAME = "NextGen Forge Technologies"
DEFAULT_IMAGE = "IMG_20260312_210306%20(1).png"

page_metadata = {
    "index.html": {
        "title": f"{SITE_NAME} | AI, Software Engineering & Cybersecurity Solutions — Pune, India",
        "description": f"{SITE_NAME} is a Pune-based startup delivering AI, software engineering, cybersecurity, cloud, and web development solutions to enterprises worldwide. Founded 2024.",
    },
    "about.html": {
        "title": f"About Us | AI & Digital Transformation Experts | {SITE_NAME}",
        "description": f"Learn about {SITE_NAME} — our mission to accelerate digital growth through AI, secure software engineering, and cloud-native platforms in Pune, India.",
    },
    "services.html": {
        "title": f"IT & AI Services in Pune | Software, Cloud, Cybersecurity | {SITE_NAME}",
        "description": f"Explore our core IT services: Artificial Intelligence, Custom Software Engineering, Web & App Development, Cybersecurity, and Cloud & DevOps.",
    },
    "industries.html": {
        "title": f"Industries We Serve | Retail, BFSI, Healthcare & More | {SITE_NAME}",
        "description": f"{SITE_NAME} serves clients across retail, finance, healthcare, manufacturing, and logistics with tailored AI and software solutions.",
    },
    "insights.html": {
        "title": f"Tech Insights & Thought Leadership | AI, Cloud, Security | {SITE_NAME}",
        "description": "Read the latest articles, research, and thought leadership from our experts on Generative AI, Zero Trust Architecture, and Multi-Cloud strategies.",
    },
    "contact.html": {
        "title": f"Contact Us | Start Your Project with {SITE_NAME}",
        "description": "Get in touch with our team in Pune. We are ready to help you with digital transformation, AI integration, and enterprise software engineering.",
    },
    "careers.html": {
        "title": f"Careers | Jobs in AI, Software Engineering & Dev | {SITE_NAME}",
        "description": "Join our team in Pune. Explore open roles in AI engineering, frontend/backend development, cybersecurity, and internships at a fast-growing tech startup.",
    },
    "application.html": {
        "title": f"Job Application | Apply Now | {SITE_NAME}",
        "description": "Submit your resume to apply for a position. We're hiring top tech talent for full-time roles and internships in our Pune office.",
    },
    "privacy-policy.html": {
        "title": f"Privacy Policy | {SITE_NAME}",
        "description": f"Read the Privacy Policy of {SITE_NAME} to understand how we collect, use, and protect your personal data in compliance with standard regulations.",
    },
    "terms.html": {
        "title": f"Terms of Use | {SITE_NAME}",
        "description": f"Terms of Use for {SITE_NAME}'s website and services. Review the rules and regulations for accessing and using our platforms.",
    },
    "thankyou.html": {
        "title": f"Thank You | {SITE_NAME}",
        "description": "Thank you for reaching out or applying. Our team at NextGen Forge Technologies will review your submission and get back to you shortly.",
    },
    "404.html": {
        "title": f"Page Not Found | 404 Error | {SITE_NAME}",
        "description": "The page you're looking for doesn't exist. Return to the homepage to explore our AI and software engineering services.",
    }
}

schema_about = """
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NextGen Forge Technologies",
  "url": "https://www.nextgenforge.tech",
  "logo": "https://www.nextgenforge.tech/IMG_20260312_210306%20(1).png",
  "description": "NextGen Forge Technologies is a startup based in Pune, India, delivering AI, software engineering, cybersecurity and digital transformation solutions.",
  "foundingDate": "2024",
  "email": "hr@nextgenforgetechnologies.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5th Floor, ABIL Imperial Commercial Spaces, Rohan Sehar Ln, Near Murkute Garden, Baner",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411045",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hr@nextgenforgetechnologies.com",
    "availableLanguage": "English"
  }
}
"""

schema_services = """
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "IT and AI Services",
  "provider": {
    "@type": "Organization",
    "name": "NextGen Forge Technologies"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Core Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI & Machine Learning"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Software Engineering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cybersecurity"
        }
      }
    ]
  }
}
"""

def update_meta_tag(soup, head, tag_name, attrs, content_attr='content'):
    tag = soup.find(tag_name, attrs)
    if not tag:
        tag = soup.new_tag(tag_name)
        head.append(tag)
        head.append('\n')
    tag[content_attr] = attrs.get(content_attr, '')
    for k, v in attrs.items():
        tag[k] = v

def optimize_file(filename):
    filepath = os.path.join(".", filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}, not found.")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    head = soup.head
    if not head:
        print(f"No <head> found in {filename}")
        return

    meta = page_metadata.get(filename, {})
    title_text = meta.get('title', f"{SITE_NAME}")
    desc_text = meta.get('description', f"Welcome to {SITE_NAME}.")
    canonical_url = f"{BASE_URL}/{filename}" if filename != "index.html" else f"{BASE_URL}/"

    # Update Title
    title_tag = head.find('title')
    if title_tag:
        title_tag.string = title_text
    else:
        title_tag = soup.new_tag('title')
        title_tag.string = title_text
        head.insert(0, title_tag)
        head.insert(1, '\n')

    # Update Description
    update_meta_tag(soup, head, 'meta', {'name': 'description', 'content': desc_text})
    
    # Update Keywords (optional, adding to all for consistency)
    keywords = "IT company Pune, software development Maharashtra, AI solutions India, cybersecurity company, web development Pune, NextGen Forge Technologies, Python developer, MERN stack"
    update_meta_tag(soup, head, 'meta', {'name': 'keywords', 'content': keywords})

    # Update Canonical
    update_meta_tag(soup, head, 'link', {'rel': 'canonical', 'href': canonical_url}, content_attr='href')

    # Open Graph Tags
    update_meta_tag(soup, head, 'meta', {'property': 'og:type', 'content': 'website'})
    update_meta_tag(soup, head, 'meta', {'property': 'og:url', 'content': canonical_url})
    update_meta_tag(soup, head, 'meta', {'property': 'og:title', 'content': title_text})
    update_meta_tag(soup, head, 'meta', {'property': 'og:description', 'content': desc_text})
    update_meta_tag(soup, head, 'meta', {'property': 'og:image', 'content': f"{BASE_URL}/{DEFAULT_IMAGE}"})
    update_meta_tag(soup, head, 'meta', {'property': 'og:site_name', 'content': SITE_NAME})

    # Twitter Card Tags
    update_meta_tag(soup, head, 'meta', {'name': 'twitter:card', 'content': 'summary_large_image'})
    update_meta_tag(soup, head, 'meta', {'name': 'twitter:title', 'content': title_text})
    update_meta_tag(soup, head, 'meta', {'name': 'twitter:description', 'content': desc_text})
    update_meta_tag(soup, head, 'meta', {'name': 'twitter:image', 'content': f"{BASE_URL}/{DEFAULT_IMAGE}"})

    # Schema Markup
    if filename == "about.html":
        # Check if already exists
        scripts = head.find_all('script', type='application/ld+json')
        if not any('Organization' in s.string for s in scripts if s.string):
            script_tag = soup.new_tag('script', type='application/ld+json')
            script_tag.string = schema_about
            head.append(script_tag)
            head.append('\n')
            
    if filename == "services.html":
        scripts = head.find_all('script', type='application/ld+json')
        if not any('Service' in s.string for s in scripts if s.string):
            script_tag = soup.new_tag('script', type='application/ld+json')
            script_tag.string = schema_services
            head.append(script_tag)
            head.append('\n')

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        # html.parser can sometimes mess up formatting slightly, but it's okay for SEO tags
        # We use str(soup) to write back
        f.write(str(soup))
    
    print(f"Optimized {filename}")

if __name__ == "__main__":
    for filename in page_metadata.keys():
        optimize_file(filename)
    print("Done optimizing all pages.")
