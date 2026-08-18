import { siteConfig } from "@/data/site-config";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center items-center">
          <p className="text-sm text-muted-dark text-center">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
