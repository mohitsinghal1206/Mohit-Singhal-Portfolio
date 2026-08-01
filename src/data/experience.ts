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
    period: "Jun 2025 – Present",
    current: true,
    description:
      "Building enterprise AI applications, AI Agents, RAG pipelines, and intelligent automation solutions for production environments.",
    highlights: [
      "Designing and deploying multi-agent AI systems for enterprise clients",
      "Building RAG pipelines with semantic search and vector databases",
      "Developing intelligent automation workflows using n8n and Power Automate",
      "Integrating Microsoft Copilot Studio with Azure DevOps and Graph APIs",
      "Creating FastAPI backends with PostgreSQL for AI-powered applications",
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
