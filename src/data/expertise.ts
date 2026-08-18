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
    title: "Generative AI & RAG",
    icon: "brain",
    description: "Building custom AI agents and search systems to make language models actually useful for businesses.",
    technologies: [
      "OpenAI",
      "Claude",
      "Llama",
      "LangChain",
      "Pinecone",
      "ChromaDB",
      "Prompt Optimization",
      "RAG Evals",
    ],
  },
  {
    id: "automation",
    title: "Intelligent Automation",
    icon: "zap",
    description: "Designing smart workflows that handle repetitive manual work, so teams can focus on actual problem-solving.",
    technologies: [
      "n8n",
      "Copilot Studio",
      "Power Automate",
      "Requirement Analysis",
      "Client Architecture Design",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: "server",
    description: "Writing the fast, secure code that bridges the gap between user interfaces, databases, and heavy AI models.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & LLMOps",
    icon: "cloud",
    description: "Deploying AI applications to the cloud, setting up strict safety guardrails, and ensuring high availability.",
    technologies: [
      "Azure",
      "Azure DevOps",
      "LLMOps",
      "Guardrails",
      "Docker",
      "GitHub",
    ],
  },
];
