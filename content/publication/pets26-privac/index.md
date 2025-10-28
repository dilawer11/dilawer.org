---
title: 'PriVA-C: Defending Voice Assistants from Fingerprinting Attacks'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - dilawer
  - Aafaq Sabir
  - Ahsan Zafar
  - Anupam Das

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2026-05-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2025-08-07T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *2026 Privacy Enhancing Technologies Symposium*
publication_short: In *PETS '26*

abstract: "Voice assistants have become ubiquitous, yet they remain vulnerable to network traffic fingerprinting attacks that can expose sensitive user information. Existing defenses either impose high overheads or fail against advanced attacks. This paper addresses these issues by introducing and evaluating PriVA-C, a fingerprinting defense mechanism tailored specifically for voice assistants. Unlike prior approaches that treat voice assistant traffic as generic web traffic, we analyze its unique characteristics to design a more effective defense. Our approach prioritizes limiting information leakage rather than targeting specific attack vectors, achieving a significant reduction in attacker accuracy from 89% to 13%. We also propose a more practically deployable version of our defense, which protects only traffic directed to the primary voice assistant domain, reducing attacker accuracy to 19%. We implement a functional prototype using the Alexa SDK, conduct user testing, and assess its performance using real network traffic. Our results demonstrate that our proposed defense effectively mitigates fingerprinting attacks while maintaining low overhead and preserving the user experience"

# Summary. An optional shortened abstract.
summary: ""

tags:
- IoT
- Fingerprinting
- Privacy
- Voice Assistant

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'publication/pets26-privac/PriVA-C.pdf'
url_code: 'https://github.com/dilawer11/priva-c'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   placement: 2
#   caption: 'Similar devices have similar fingerprints'
#   focal_point: 'smart'
#   preview_only: true

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - va fingerprinting

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: example
---

{{< figure src="featured.png" caption="PriVA-C Overview Diagram" numbered="true" >}}

