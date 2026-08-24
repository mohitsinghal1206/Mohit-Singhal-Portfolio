export interface ExperienceBreakdown {
  role: string;
  period: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  breakdown?: ExperienceBreakdown[];
  description: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "codestore",
    company: "CodeStore Technologies Pvt. Ltd.",
    role: "Software Engineer",
    location: "Noida, India",
    period: "Jun 2025 – Jun 2026",
    current: false,
    breakdown: [
      { role: "Software Engineer Trainee", period: "Jun 2025 – Dec 2025" },
      { role: "Software Engineer", period: "Dec 2025 – Jun 2026" }
      
    ],
    description:
      "Designed and delivered AI-driven tools to solve real business problems. My work focused on understanding client needs, automating manual processes, and bringing AI concepts into production.",
    highlights: [
      "Founding member of the AI division; pioneered the first intelligent automation workflows and mentored incoming teammates on RAG and LLM integration best practices",
      "Worked closely with business stakeholders to analyze their demands and built custom, department-specific workflows to solve their exact bottlenecks",
      "Developed custom search systems (RAG) so that our chatbots could securely read and answer questions directly from private company documents",
      "Automated repetitive operational tasks by designing scalable intelligent workflows for cross-departmental efficiency",
      "Integrated generative AI solutions with enterprise knowledge bases and internal platforms to create seamless internal assistants",
      "Set up the core backend architecture and databases required to keep our AI tools running smoothly and securely",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "Azure",
      "n8n",
      "Copilot Studio",
      "Microsoft Graph",
      "PostgreSQL",
    ],
  },
];
