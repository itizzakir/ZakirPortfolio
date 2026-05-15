import { useEffect } from "react";
import { personal, projects } from "../../constants/portfolio";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export function Seo() {
  useEffect(() => {
    document.title = `${personal.name} | ${personal.role}`;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content:
        "Md Zakir Hussain is a Full Stack Java Developer in Hyderabad building scalable Spring Boot, React, MySQL, and secure REST API applications.",
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personal.name,
      jobTitle: personal.role,
      email: personal.email,
      telephone: personal.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "India",
      },
      url: personal.portfolio,
      sameAs: [personal.github, personal.linkedin],
      knowsAbout: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs", "JWT", "RBAC"],
      worksFor: {
        "@type": "Organization",
        name: "Aivariant",
      },
      hasPart: projects.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: `${project.name} - ${project.title}`,
        codeRepository: project.github,
        url: project.live,
        programmingLanguage: project.tech,
      })),
    };

    let script = document.head.querySelector('script[data-portfolio-schema="true"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.portfolioSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
