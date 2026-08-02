import { siteConfig } from "@/data/site-config";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold tracking-tighter mb-2">
              {siteConfig.name}<span className="text-primary">.</span>
            </h3>
            <p className="text-muted max-w-sm">
              {siteConfig.role} at {siteConfig.company}. Building production-ready AI systems and intelligent automation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-text">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-text">Connect</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-[#0A66C2] transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted hover:text-[#EA4335] transition-colors flex items-center gap-2"
                >
                  <Mail size={16} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-dark">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-dark">
            Designed & Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
