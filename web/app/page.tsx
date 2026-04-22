/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { EntryCard } from "@/components/entry-card";
import { ExperienceLogo } from "@/components/experience-logo";
import { PublicationList } from "@/components/publication-list";
import { SocialIcon } from "@/components/social-icon";
import { siteData } from "@/lib/site-data";
import {
  getAuthorProfile,
  getProjects,
  getPublications,
} from "@/lib/content";

export default async function Home() {
  const { hero, focus: focusSection, experience: experienceSection, projects: projectsSection, publications: publicationsSection, contact } =
    siteData.home;
  const [author, projects, publications] = await Promise.all([
    getAuthorProfile("dilawer"),
    getProjects(),
    getPublications(),
  ]);

  const selectedProjects = projects.slice(0, 6);
  const latestPublications = publications.slice(0, publicationsSection.count ?? 4);

  return (
    <div className="page-stack">
      <section className="hero-card section-card" id="hero">
        <p className="hero-note">{hero.ctaNote}</p>
        <h1>{hero.title}</h1>
        <div className="lead prose-block" dangerouslySetInnerHTML={{ __html: hero.bodyHtml }} />
        <div className="hero-actions">
          <Link className="button button-primary" href={hero.ctaUrl}>
            {hero.ctaLabel}
          </Link>
          <Link className="button button-secondary" href={hero.ctaAltUrl}>
            {hero.ctaAltLabel}
          </Link>
        </div>
      </section>

      <section className="section-card" id="focus">
        <div className="section-heading">
          <p className="eyebrow">Focus</p>
          <h2>{focusSection.title}</h2>
          <p className="section-copy">{focusSection.subtitle}</p>
        </div>
        <div className="about-grid">
          <aside className="profile-card">
            {author.avatarUrl ? (
              <img
                src={author.avatarUrl}
                alt={author.title}
                className="profile-avatar"
              />
            ) : null}
            <h3>{author.title}</h3>
            {author.role ? <p className="profile-role">{author.role}</p> : null}
            {author.education[0]?.course ? (
              <p className="profile-role">{author.education[0].course}</p>
            ) : null}
            <div className="pill-row">
              {author.social.map((social) => (
                <a key={`${social.icon}-${social.link}`} className="pill-link" href={social.link}>
                  <SocialIcon name={social.icon} />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </aside>

          <div className="focus-grid">
            {focusSection.items.map((item, index) => (
              <article
                key={item.title}
                className={`copy-card info-card focus-card${index === 0 ? " focus-card-featured" : ""}`}
              >
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <div
                  className="prose-block"
                  dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-card" id="experience">
        <div className="section-heading">
          <p className="eyebrow">Career</p>
          <h2>{experienceSection.title}</h2>
          <p className="section-copy">{experienceSection.subtitle}</p>
        </div>
        <div className="timeline">
          {experienceSection.items.map((item) => (
            <article className="timeline-card" key={`${item.company}-${item.title}-${item.dateStart}`}>
              <div className="timeline-header">
                <div className="timeline-logo" aria-hidden="true">
                  <ExperienceLogo company={item.company} />
                </div>
                <div className="timeline-heading">
                  <p className="timeline-meta">
                    {item.dateLabel}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">
                    {item.companyUrl ? (
                      <a href={item.companyUrl}>{item.company}</a>
                    ) : (
                      item.company
                    )}
                  </p>
                </div>
              </div>
              {item.descriptionHtml ? (
                <div
                  className="prose-block"
                  dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
                />
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" id="projects">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="eyebrow">Projects</p>
            <h2>{projectsSection.title}</h2>
            <p className="section-copy">{projectsSection.subtitle}</p>
          </div>
          <Link className="button button-secondary section-link" href="/projects/">
            View all projects
          </Link>
        </div>
        <div className="card-grid">
          {selectedProjects.map((project) => (
            <EntryCard
              key={project.slug}
              entry={project}
              href={`/projects/${project.slug}/`}
            />
          ))}
        </div>
      </section>

      <section className="section-card" id="publications">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="eyebrow">Research</p>
            <h2>{publicationsSection.title}</h2>
            <p className="section-copy">{publicationsSection.subtitle}</p>
          </div>
          <Link className="button button-secondary section-link" href="/publications/">
            Browse all publications
          </Link>
        </div>
        <PublicationList entries={latestPublications} showSummary={false} />
      </section>

      <section className="section-card" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Connect</p>
          <h2>{contact.title}</h2>
          <p className="section-copy">{contact.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="copy-card info-card">
            <p className="eyebrow">Email</p>
            <p>{contact.email}</p>
          </div>
          <div className="copy-card info-card">
            <p className="eyebrow">Location</p>
            <p>
              {contact.address.city}, {contact.address.region}
            </p>
            <p>{contact.address.country}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
