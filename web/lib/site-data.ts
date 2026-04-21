type HeroData = {
  title: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  ctaAltLabel: string;
  ctaAltUrl: string;
  ctaNote: string;
};

type SectionIntro = {
  title: string;
  subtitle: string;
};

type FocusItem = {
  eyebrow: string;
  title: string;
  bodyHtml: string;
};

type ContactData = SectionIntro & {
  email: string;
  phone: string;
  address: {
    city: string;
    region: string;
    country: string;
  };
};

type ExperienceItem = {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  dateStart: string;
  dateEnd?: string;
  dateLabel: string;
  descriptionHtml: string;
};

type SiteData = {
  home: {
    hero: HeroData;
    focus: SectionIntro & {
      items: FocusItem[];
    };
    projects: SectionIntro;
    publications: SectionIntro & {
      count: number;
    };
    contact: ContactData;
    experience: SectionIntro & {
      items: ExperienceItem[];
    };
  };
};

export const siteData: SiteData = {
  home: {
    hero: {
      title: "Security and privacy research, built for real systems.",
      bodyHtml:
        "<p>I’m <strong>Dilawer Ahmed</strong>, a software engineer at <strong>Microsoft AI</strong> and a researcher focused on <strong>security</strong>, <strong>privacy</strong>, and <strong>production systems</strong>. My work spans voice assistants, IoT measurement, web privacy, and the infrastructure required to turn research ideas into deployable systems.</p>",
      ctaLabel: "Explore Publications",
      ctaUrl: "/publications/",
      ctaAltLabel: "View Resume",
      ctaAltUrl: "/uploads/resume.pdf",
      ctaNote: "PhD in Computer Science · Security, Privacy, IoT, and Systems",
    },
    focus: {
      title: "What I work on",
      subtitle:
        "A quick view of the engineering, research, and academic threads that shape my work.",
      items: [
        {
          eyebrow: "Current work",
          title: "Applied AI web systems",
          bodyHtml:
            "<p>At <strong>Microsoft AI</strong>, I build <strong>enhanced page features</strong>, <strong>web document features</strong> for grounding models, and <strong>URL normalization</strong> systems that improve <strong>resource efficiency</strong>, <strong>deduplication</strong>, and product quality.</p>",
        },
        {
          eyebrow: "Research",
          title: "Security, privacy, and the web",
          bodyHtml:
            "<p>My research focuses on <strong>security</strong>, <strong>privacy</strong>, <strong>voice assistants</strong>, <strong>IoT</strong>, and <strong>web platforms</strong>, with an emphasis on making measurement and attack insights meaningful for real systems.</p>",
        },
        {
          eyebrow: "Background",
          title: "Engineering with a research lens",
          bodyHtml:
            "<p>I completed a <strong>PhD in Computer Science</strong> at <strong>NC State</strong> and earned a <strong>BS in Computer Science</strong> from <strong>LUMS</strong>, which shapes how I balance rigor, usability, and production constraints.</p>",
        },
      ],
    },
    projects: {
      title: "Selected Projects",
      subtitle:
        "A mix of research programs and production systems work across voice assistants, IoT, web privacy, ads, infrastructure, and applied ML.",
    },
    publications: {
      title: "Latest Publications",
      subtitle: "Recent conference papers, posters, and research outputs.",
      count: 4,
    },
    contact: {
      title: "Contact",
      subtitle:
        "Based in Mountain View and open to conversations about security, privacy, applied research, and engineering leadership.",
      email: "dilawer11@gmail.com",
      phone: "+1 (nine 84) three 89 376 seven",
      address: {
        city: "Mountain View",
        region: "CA",
        country: "United States",
      },
    },
    experience: {
      title: "Experience",
      subtitle:
        "Research, product, and engineering work across industry and academia.",
      items: [
        {
          title: "Software Engineer II",
          company: "Microsoft AI",
          companyUrl: "https://microsoft.com",
          location: "Mountain View, CA",
          dateStart: "2025-08-18",
          dateLabel: "Aug 2025 – Present",
          descriptionHtml:
            "<p>At <strong>Microsoft AI</strong>, I build <strong>enhanced page features</strong> and <strong>web document features</strong> that improve how models ground on the open web. I also work on <strong>URL normalization</strong> and related platform capabilities that reduce duplication, improve resource efficiency, and strengthen product quality.</p>",
        },
        {
          title: "Software Engineer Intern",
          company: "Microsoft",
          companyUrl: "https://microsoft.com",
          location: "Redmond, WA",
          dateStart: "2024-05-14",
          dateEnd: "2024-08-19",
          dateLabel: "May 2024 – Aug 2024",
          descriptionHtml:
            "<p>At <strong>Microsoft</strong>, I worked on <strong>location intelligence systems</strong> for advertising, redesigning an offline pipeline in <strong>Azure Data Lake</strong> to improve recall by up to <strong>50%</strong> and increase downstream impact. I also shipped a <strong>C++ online serving path</strong> and partnered with the Bing Maps team on <strong>reverse geocoding</strong>, reducing compute cost by <strong>87%</strong> while increasing coverage by <strong>25%</strong>.</p>",
        },
        {
          title: "Software Engineer Intern",
          company: "Google",
          companyUrl: "https://google.com",
          location: "Sunnyvale, CA",
          dateStart: "2022-05-14",
          dateEnd: "2022-08-19",
          dateLabel: "May 2022 – Aug 2022",
          descriptionHtml:
            "<p>At <strong>Google Cloud</strong>, I explored <strong>GPU virtualization</strong> strategies for machine learning acceleration and built a <strong>C++ performance projection tool</strong> to estimate remote GPU latency and bandwidth with lower simulator overhead. I also helped drive a <strong>protocol buffer dependency migration</strong> that reduced maintenance friction and improved internal developer workflows.</p>",
        },
        {
          title: "CTO",
          company: "KalPay Technologies",
          companyUrl: "https://kalpayfinancials.com",
          location: "Lahore, Pakistan",
          dateStart: "2020-05-01",
          dateEnd: "2020-12-31",
          dateLabel: "May 2020 – Dec 2020",
          descriptionHtml:
            "<p>At <strong>KalPay</strong>, I led engineering for a <strong>BNPL platform</strong>, defining the product architecture and guiding execution across the <strong>merchant</strong>, <strong>consumer</strong>, and <strong>admin</strong> applications. The role combined early-stage product thinking with hands-on delivery across the company’s core fintech stack.</p>",
        },
        {
          title: "Software Engineer",
          company: "Technologies of People Initiative Lab",
          companyUrl: "https://tpi.lums.edu.pk",
          location: "Lahore, Pakistan",
          dateStart: "2020-06-01",
          dateEnd: "2020-12-31",
          dateLabel: "Jun 2020 – Dec 2020",
          descriptionHtml:
            "<p>At <strong>Technologies of People Initiative Lab</strong>, I built <strong>research prototypes</strong> and <strong>data systems</strong> for applied computing projects, translating exploratory ideas into usable systems. My work spanned <strong>full-stack implementation</strong>, experimentation, and technical support for the lab’s broader research agenda.</p>",
        },
      ],
    },
  },
};
