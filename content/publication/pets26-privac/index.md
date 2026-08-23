---
title: 'PriVA-C: Defending Voice Assistants from Fingerprinting Attacks'
authors:
  - dilawer
  - Aafaq Sabir
  - Ahsan Zafar
  - Anupam Das
date: '2026-01-01'
doi: 10.56553/popets-2026-0003oa
publishDate: '2026-01-01'
publication_types:
  - '2'
publication: In *2026 Privacy Enhancing Technologies Symposium*
publication_short: In *PETS '26*
abstract: >-
  Voice assistants have become ubiquitous, yet they remain vulnerable to network
  traffic fingerprinting attacks that can expose sensitive user information.
  Existing defenses either impose high overheads or fail against advanced
  attacks. This paper addresses these issues by introducing and evaluating
  PriVA-C, a fingerprinting defense mechanism tailored specifically for voice
  assistants. Unlike prior approaches that treat voice assistant traffic as
  generic web traffic, we analyze its unique characteristics to design a more
  effective defense. Our approach prioritizes limiting information leakage
  rather than targeting specific attack vectors, achieving a significant
  reduction in attacker accuracy from 89% to 13%. We also propose a more
  practically deployable version of our defense, which protects only traffic
  directed to the primary voice assistant domain, reducing attacker accuracy to
  19%. We implement a functional prototype using the Alexa SDK, conduct user
  testing, and assess its performance using real network traffic. Our results
  demonstrate that our proposed defense effectively mitigates fingerprinting
  attacks while maintaining low overhead and preserving the user experience.
summary: >-
  Voice assistants have become ubiquitous, yet they remain vulnerable to network
  traffic fingerprinting attacks that can expose sensitive user information.
topic: Voice Assistants
tags:
  - IoT
  - Fingerprinting
  - Privacy
  - Voice Assistant
categories: []
featured: true
url_pdf: publication/pets26-privac/PriVA-C.pdf
url_code: 'https://github.com/dilawer11/priva-c'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: 'https://dblp.org/rec/journals/popets/AhmedSZD26.html'
url_video: ''
projects:
  - voice-assistant-security
slides: ''
dblp_key: journals/popets/AhmedSZD26
openalex_id: 'https://openalex.org/W7125654358'
source: dblp
---

{{< figure src="featured.png" caption="PriVA-C Overview Diagram" numbered="true" >}}
