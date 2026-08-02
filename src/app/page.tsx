import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Projects } from "@/components/sections/projects";
import { Automation } from "@/components/sections/automation";
import { Lab } from "@/components/sections/lab";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <ScrollProgress />
      <Navbar />
      
      <Hero />
      <Experience />
      <Expertise />
      <Projects />
      <Automation />
      <Lab />
      <Education />
      <Certifications />
      <Contact />
      
      <Footer />
    </main>
  );
}
