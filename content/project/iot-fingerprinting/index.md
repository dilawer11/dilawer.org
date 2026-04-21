---
title: IoT Privacy & Device Fingerprinting
summary: Understanding how encrypted traffic reveals device identity and usage patterns, and designing measurements that better capture open-world privacy risk in IoT ecosystems.
tags:
  - IoT
  - Fingerprinting
  - Privacy
date: '2021-01-01T00:00:00Z'

# Optional external URL for project (replaces project detail page).
external_link: ''

# image:
#   caption: Photo by rawpixel on Unsplash
#   focal_point: Smart

# links:
#   - icon: twitter
#     icon_pack: fab
#     name: Follow
#     url: https://twitter.com/georgecushen
url_code: ''
url_pdf: ''
url_slides: ''
url_video: ''

# Slides (optional).
#   Associate this project with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
# slides: example
---

This project covers my work on the privacy implications of identifying IoT devices from encrypted network traffic. Rather than treating device fingerprinting as a narrow closed-world classification problem, the work examines how well these attacks generalize across datasets, manufacturers, and open-world conditions.

Key threads in this area include:

- **Large-scale device fingerprinting** across a broad and diverse IoT device set
- **Open-world analysis** that better reflects what a realistic attacker would face
- **Privacy framing** around what device ownership and behavior leaks can reveal about users

The goal has been to connect strong empirical results with the broader privacy story: even encrypted traffic can expose surprisingly rich information about people through the devices they use.
