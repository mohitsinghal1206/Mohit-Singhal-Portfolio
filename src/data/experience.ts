export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
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
    current: true,
    description:
      "Designed and delivered AI-driven tools to solve real business problems. My work focused on understanding client needs, automating manual processes, and bringing AI concepts into production.",
    highlights: [
      "Worked closely with business stakeholders to analyze their demands and built custom, department-specific workflows to solve their exact bottlenecks",
      "Developed custom search systems (RAG) so that our chatbots could securely read and answer questions directly from private company documents",
      "Automated hours of repetitive manual work by designing intelligent workflows using n8n and Microsoft Power Automate",
      "Integrated Microsoft Copilot directly with Azure DevOps and Graph APIs to create seamless internal assistants for our teams",
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
