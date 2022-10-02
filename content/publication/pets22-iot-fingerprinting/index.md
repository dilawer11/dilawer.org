---
title: 'Analyzing the Feasibility and Generalizability of Fingerprinting Internet of Things Devices'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - dilawer
  - Anupam Das
  - Fareed Zaffar

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2022-07-15T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2022-07-15T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *Proceedings on Privacy Enhancing Technologies*
publication_short: In *PETS'22*

abstract: "In recent years, we have seen rapid growth in
the use and adoption of Internet of Things (IoT) devices.
However, some IoT devices are sensitive in nature, and
simply knowing what devices a user owns can have secu-
rity and privacy implications. Researchers have, there-
fore, looked at fingerprinting IoT devices and their ac-
tivities from encrypted network traffic. In this paper, we
analyze the feasibility of fingerprinting IoT devices and
evaluate the robustness of such fingerprinting approach
across multiple independent datasets — collected under
different settings. We show that not only is it possible
to effectively fingerprint 188 IoT devices (with over 97%
accuracy), but also to do so even with multiple instances
of the same make-and-model device. We also analyze the
extent to which temporal, spatial and data-collection-
methodology differences impact fingerprinting accuracy.
Our analysis sheds light on features that are more ro-
bust against varying conditions. Lastly, we comprehen-
sively analyze the performance of our approach under
an open-world setting and propose ways in which an ad-
versary can enhance their odds of inferring additional
information about unseen devices (e.g., similar devices
manufactured by the same company)."

# Summary. An optional shortened abstract.
summary: "We show that not only is it possible
to effectively fingerprint 188 IoT devices (with over 97%
accuracy), but also to do so even with multiple instances
of the same make-and-model device. We also analyze the
extent to which temporal, spatial and data-collection-
methodology differences impact fingerprinting accuracy.
Our analysis sheds light on features that are more ro-
bust against varying conditions"

tags:
- IoT
- Fingerprinting
- Privacy

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://petsymposium.org/2022/files/papers/issue2/popets-2022-0057.pdf'
url_code: 'https://github.com/dilawer11/iot-device-fingerprinting'
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
  - iot fingerprinting

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: example
---

{{< figure src="logo.png" caption="" numbered="false" >}}
{{< figure src="scatterplot.png" caption="Similar devices have similar fingerprints" numbered="true" >}}

