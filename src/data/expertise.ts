export interface ExpertiseCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  technologies: string[];
}

export const expertise: ExpertiseCategory[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    icon: "brain",
    description: "Building intelligent systems with large language models and agentic architectures",
    technologies: [
      "OpenAI",
      "LangChain",
      "LangGraph",
      "Gemini",
      "Pinecone",
      "Prompt Engineering",
      "AI Agents",
      "RAG",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    icon: "zap",
    description: "Designing end-to-end intelligent automation pipelines for enterprise workflows",
    technologies: [
      "n8n",
      "Copilot Studio",
      "Power Automate",
      "MCP",
      "Webhooks",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    description: "Engineering robust APIs and data systems for production AI applications",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MySQL",
      "Streamlit",
      "REST APIs",
      "OAuth",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    description: "Deploying and managing AI infrastructure on cloud platforms",
    technologies: [
      "Azure",
      "Azure DevOps",
      "Git",
      "GitHub",
      "Linux",
    ],
  },
];
