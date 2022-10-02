---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "Understanding the Privacy Implications of Adblock Plus’s Acceptable Ads"
authors: 
 - Ahsan Zafar
 - Aafaq Sabir
 - dilawer
 - Anupam Das
date: 2021-06-07T01:59:10-04:00
doi: "10.1145/3433210.3437536"

# Schedule page publish date (NOT publication's date).
publishDate: 2021-06-07T01:59:10-04:00

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "In *Proceedings of the 2021 ACM Asia Conference on Computer and Communications Security*"
publication_short: "ASIA CCS '21"

abstract: "Targeted advertisement is prevalent on the Web. Many privacyenhancing tools have been developed to thwart targeted advertisement. Adblock Plus is one such popular tool, used by millions of
users on a daily basis, to block unwanted ads and trackers. Adblock
Plus uses EasyList and EasyPrivacy, the most prominent and widely
used open-source filters, to block unwanted web contents. However,
Adblock Plus, by default, also enables an exception list to unblock
web requests that comply with specific guidelines defined by the
Acceptable Ads Committee. Any publisher can enroll into the Acceptable Ads initiative to request the unblocking of web contents.
Adblock Plus in return charges a licensing fee from large entities,
who gain a significant amount of ad impressions per month due
to participation in the Acceptable Ads initiative. However, the privacy implications of the default inclusion of the exception list has
not been well studied, especially as it can unblock not only ads,
but also trackers (e.g., unblocking contents otherwise blocked by
EasyPrivacy).
In this paper, we take a data-driven approach, where we collect historical updates made to Adblock Plus’s exception list and
real-world web traffic by visiting the top 10k websites listed by
Tranco. Using such data we analyze not only how the exception
list has evolved over the years in terms of both contents unblocked
and partners/entities enrolled into the Acceptable Ads initiative,
but also the privacy implications of enabling the exception list by
default. We found that Google not only unblocks the most number
of unique domains, but is also unblocked by the most number of
unique partners. From our traffic analysis, we see that of the 42,210
Google bound web requests, originally blocked by EasyPrivacy,
around 80% of such requests are unblocked by the exception list.
More worryingly, many of the requests enable 1-by-1 tracking pixel
images. We, therefore, question exception rules that negate EasyPrivacy filtering rules by default and advocate for a better vetting
process."

# Summary. An optional shortened abstract.
summary: "In this paper we collect historical updates made to Adblock Plus’s exception list and
real-world web traffic by visiting the top 10k websites listed by
Tranco. Using such data we analyze not only how the exception
list has evolved over the years in terms of both contents unblocked
and partners/entities enrolled into the Acceptable Ads initiative,
but also the privacy implications of enabling the exception list by
default"

tags: 
 - Privacy
 - Web
 - Ads
categories: []
featured: false

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_pdf: https://dl.acm.org/doi/pdf/10.1145/3433210.3437536
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
# slides: ""
---
