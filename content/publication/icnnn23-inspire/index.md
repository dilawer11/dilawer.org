---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "INSPIRE: Instance-level Privacy-preserving Transformation for Vehicular Camera Videos"
authors: 
  - Zhouyu Li
  - Ruozhou Yu
  - Anupam Das
  - Shaohu Zhang
  - Huayue Gu
  - Xiaojian Wang
  - Fangtong Zhou
  - Aafaq Sabir
  - dilawer
  - Ahsan Zafar
date: 2023-04-05T16:53:43+03:00
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: 2023-04-05T16:53:43+03:00

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "Proceedings of the 32nd International Conference on Computer Communications and Networks"
publication_short: "ICCCN"

abstract: "The wide spread of vehicular cameras has raised broad privacy concerns. Ubiquitous vehicular cameras capture bystanders like people or cars nearby without their awareness. To address privacy concerns, most existing works either blur out direct identifiers such as vehicle license plates and human faces, or obfuscate whole video frames. However, the former solution is vulnerable to re-identification attacks based on general features, and the latter severely impacts utility of the transformed videos. In this paper, we propose an INStance-level PrIvacy-pREserving (INSPIRE) video transformation framework for vehicular camera videos. INSPIRE leverages deep neural network models to detect and replace sensitive object instances in vehicular videos with their non-existent counterparts. We design INSPIRE as a modular framework to enable flexible customization of protected instance categories and their protection modules. An implementation of INSPIRE focused on protecting people and cars is described, which we tested on six re-identification datasets and three realworld vehicular video datasets to evaluate its privacy protection and utility preservation capability. Results show that INSPIRE can thwart 97% of re-identification attacks for people and cars while maintaining a 0.75 object detection mean average precision on transformed instances. We also demonstrate experimentally that INSPIRE is robust against model inversion attacks. Compared to solutions that provide comparable privacy protection, INSPIRE achieves relatively 1.76 times higher counting accuracy and 31.61% higher object detection mean average precision."

# Summary. An optional shortened abstract.
summary: ""

tags: []
categories: []
featured: false

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_pdf: "https://anupamdas.org/paper/ICCCN2023.pdf"
url_code:
url_dataset:
url_poster:
url_project:
url_slides:
url_source:
url_video:

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
