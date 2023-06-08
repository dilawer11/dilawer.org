---
title: 'Spying through your voice assistants: Realistic voice command fingerprinting'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - dilawer
  - Aafaq Sabir
  - Anupam Das

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2023-08-09T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-08-09T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *Usenix Security Symposium 2023*
publication_short: In *Usenix Security '23*

abstract: "Voice assistants are becoming increasingly pervasive due to
the convenience and automation they provide through the
voice interface. However, such convenience often comes with
unforeseen security and privacy risks. For example, encrypted
traffic from voice assistants can leak sensitive information
about their users’ habits and lifestyles. In this paper, we
present a taxonomy of fingerprinting voice commands on
the most popular voice assistant platforms (Google, Alexa,
and Siri). We also provide a deeper understanding of the feasi-
bility of fingerprinting third-party applications and streaming
services over the voice interface. Our analysis not only im-
proves the state-of-the-art technique but also studies a more
real-world setup for fingerprinting voice activities over en-
crypted traffic. Our proposed technique considers a passive
network eavesdropper observing encrypted traffic from var-
ious devices within a home and, therefore, first detects the
invocation/activation of voice assistants followed by what spe-
cific voice command is issued. Using an end-to-end system
design, we show that it is possible to detect when a voice
assistant is activated with 99% accuracy and then utilize the
subsequent traffic pattern to infer more fine-grained user ac-
tivities with around 79% accuracy"

# Summary. An optional shortened abstract.
summary: "We show that multiple voice assistant platforms can be fingerprinting equally effectively. We also show that the fingerprinting process can be performed remotely mixed with traffic from other devices. Adding additional features such as flow and burst based features can also increase fingerprinting performance"

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

url_pdf: ''
url_code: 'https://github.com/dilawer11/va-fingerprinting'
url_dataset: 'https://privacy-datahub.csc.ncsu.edu/vafingerprinting'
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

{{< figure src="logo.png" caption="" numbered="false" >}}
{{< figure src="process_diagram.png" caption="The Voice Assistant fingerprint diagram" numbered="true" >}}

