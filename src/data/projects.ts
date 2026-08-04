export interface WorkflowStep {
  step: string;
  detail: string;
  icon: string;
}

export interface Project {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  workflow: WorkflowStep[];
}

export const projects: Project[] = [
  {
    id: "whatsapp-agent",
    index: "01",
    category: "Enterprise AI",
    title: "AI WhatsApp Customer Support Agent",
    description:
      "Multi-agent AI customer support and lead qualification platform powered by LLMs and RAG.",
    problem:
      "Manual customer support doesn't scale. Businesses lose leads due to slow response times, inconsistent answers, and lack of 24/7 availability.",
    solution:
      "AI-powered multi-agent system with semantic search over knowledge bases, automated follow-ups, shared agent memory, intelligent AI-to-human handoff, real-time monitoring, and production-grade reliability workflows.",
    technologies: [
      "GPT-4.1-mini",
      "n8n",
      "PostgreSQL",
      "Pinecone",
      "WATI API",
      "Webhooks",
      "Google Sheets",
      "Gmail",
    ],
    results: [
      "Automated customer support with 24/7 availability",
      "Intelligent lead qualification and scoring",
      "Seamless AI-to-human handoff when needed",
      "Production-grade reliability with monitoring",
    ],
    links: {
      docs: "https://app.notion.com/p/AI-WhatsApp-Customer-Support-Lead-Qualification-System-3721ed779b4d80e28cb5e1c3a0cd480e",
    },
    workflow: [
      { step: "User Request", detail: "Customer sends message via WhatsApp", icon: "user" },
      { step: "WATI Trigger", detail: "Webhook received and forwarded to n8n", icon: "whatsapp" },
      { step: "Vector Search", detail: "Query Pinecone for company knowledge", icon: "database" },
      { step: "LLM Processing", detail: "GPT-4 synthesizes the final response", icon: "brain" },
      { step: "Response", detail: "Reply sent back to user on WhatsApp", icon: "message" },
    ],
  },
  {
    id: "deep-research",
    index: "02",
    category: "Research AI",
    title: "DeepResearch Agent",
    description:
      "Autonomous multi-agent research platform capable of searching, reading, critiquing, and generating comprehensive research reports.",
    problem:
      "Manual research is time-consuming and often incomplete. Researchers need to search multiple sources, cross-reference information, and synthesize findings — a process that takes hours.",
    solution:
      "4-stage Agentic AI workflow using LangGraph and LCEL with tool-calling, web search, content scraping, automated critique, and a Streamlit dashboard for interactive research sessions.",
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "Gemini",
      "Tavily API",
      "BeautifulSoup",
      "Streamlit",
    ],
    results: [
      "Automated multi-source research in minutes",
      "Self-critiquing reports with quality validation",
      "Interactive dashboard for research exploration",
      "4-stage agentic pipeline with tool-calling",
    ],
    links: {
      github: "https://github.com/mohitsinghal1206/DeepResearch-Agent",
      demo: "https://deepresearch-agent-ew4cwegqrcdoplftnz26iv.streamlit.app/",
    },
    workflow: [
      { step: "Query Input", detail: "User provides research topic", icon: "query" },
      { step: "Agent Planning", detail: "Gemini creates research plan", icon: "brain" },
      { step: "Web Search", detail: "Tavily finds relevant sources", icon: "globe" },
      { step: "Content Scraping", detail: "Scrape content from sources", icon: "scraper" },
      { step: "Validation", detail: "Self-critique findings", icon: "critique" },
      { step: "Final Report", detail: "Generate comprehensive report", icon: "report" },
    ],
  },
  {
    id: "employee-assessment",
    index: "03",
    category: "Enterprise AI",
    title: "AI Employee Assessment Agent",
    description:
      "Enterprise RAG-based employee assessment platform that generates dynamic policy-based assessments from knowledge bases.",
    problem:
      "Employee assessments are manual, inconsistent, and disconnected from company policies. HR teams spend hours creating assessments that may not align with current guidelines.",
    solution:
      "RAG-based assessment platform integrated with Azure DevOps Wiki and HR knowledge bases, using Microsoft Graph and Zoho People APIs for automated compliance reporting and analytics dashboards.",
    technologies: [
      "Copilot Studio",
      "GPT-4.1-mini",
      "Power Automate",
      "React",
      "Microsoft Graph",
      "Azure DevOps",
      "Zoho People",
    ],
    results: [
      "Dynamic policy-based assessments from knowledge bases",
      "Automated compliance reporting and analytics",
      "Integration with Azure DevOps and HR systems",
      "React dashboard for employee analytics",
    ],
    links: {
      docs: "https://app.notion.com/p/AI-Powered-Employee-Assessment-Compliance-Agent-3721ed779b4d803d96f6cb5106724150",
    },
    workflow: [
      { step: "Trigger", detail: "Employee initiates assessment", icon: "user" },
      { step: "Copilot Studio", detail: "Chatbot collects initial context", icon: "copilot" },
      { step: "Data Retrieval", detail: "Fetch DevOps & Zoho records", icon: "database" },
      { step: "LLM Evaluation", detail: "GPT-4 analyzes against policy", icon: "brain" },
      { step: "Assessment", detail: "Generate compliance report", icon: "assessment" },
    ],
  },
];
