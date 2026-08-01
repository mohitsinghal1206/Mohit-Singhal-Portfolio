export const siteConfig = {
  name: "Mohit Singhal",
  role: "AI Engineer",
  company: "CodeStore Technologies Pvt. Ltd.",
  location: "Noida, India",
  email: "mohitsinghal2003.ms@gmail.com",
  github: "https://github.com/mohitsinghal1206",
  linkedin: "https://linkedin.com/in/mohit-singhal-600326226",
  resumeUrl: "#", // placeholder until resume is uploaded
  profileImage: "/images/profile.jpg",

  nav: [
    { label: "Experience", href: "#experience" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Automation", href: "#automation" },
    { label: "Lab", href: "#lab" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
