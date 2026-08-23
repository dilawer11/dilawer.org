---
title: 'Spying through your voice assistants: Realistic voice command fingerprinting'
authors:
  - dilawer
  - Aafaq Sabir
  - Anupam Das
date: '2023-01-01'
doi: ''
publishDate: '2023-01-01'
publication_types:
  - '1'
publication: In *Usenix Security Symposium 2023*
publication_short: In *Usenix Security '23*
abstract: >-
  Voice assistants are becoming increasingly pervasive due to the convenience
  and automation they provide through the voice interface. However, such
  convenience often comes with unforeseen security and privacy risks. For
  example, encrypted traffic from voice assistants can leak sensitive
  information about their users’ habits and lifestyles. In this paper, we
  present a taxonomy of fingerprinting voice commands on the most popular voice
  assistant platforms (Google, Alexa, and Siri). We also provide a deeper
  understanding of the feasibility of fingerprinting third-party applications
  and streaming services over the voice interface. Our analysis not only
  improves the state-of-the-art technique but also studies a more real-world
  setup for fingerprinting voice activities over encrypted traffic. Our proposed
  technique considers a passive network eavesdropper observing encrypted traffic
  from various devices within a home and, therefore, first detects the
  invocation/activation of voice assistants followed by what specific voice
  command is issued. Using an end-to-end system design, we show that it is
  possible to detect when a voice assistant is activated with 99% accuracy and
  then utilize the subsequent traffic pattern to infer more fine-grained user
  activities with around 79% accuracy
summary: >-
  We show that multiple voice assistant platforms can be fingerprinting equally
  effectively. We also show that the fingerprinting process can be performed
  remotely mixed with traffic from other devices. Adding additional features
  such as flow and burst based features can also increase fingerprinting
  performance
topic: Voice Assistants
tags:
  - IoT
  - Fingerprinting
  - Privacy
  - Voice Assistant
categories: []
featured: true
url_pdf: ''
url_code: 'https://github.com/dilawer11/va-fingerprinting'
url_dataset: 'https://privacy-datahub.csc.ncsu.edu/vafingerprinting'
url_poster: ''
url_project: ''
url_slides: ''
url_source: 'https://dblp.org/rec/conf/uss/AhmedS023.html'
url_video: ''
projects:
  - voice-assistant-security
slides: ''
dblp_key: conf/uss/AhmedS023
openalex_id: ''
source: dblp
---

{{< figure src="logo.png" caption="" numbered="false" >}}
{{< figure src="process_diagram.png" caption="The Voice Assistant fingerprint diagram" numbered="true" >}}
