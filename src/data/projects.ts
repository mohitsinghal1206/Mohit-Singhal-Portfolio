export interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  highlight?: boolean;
}

export interface ArchConnection {
  from: string;
  to: string;
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
  architecture: {
    nodes: ArchNode[];
    connections: ArchConnection[];
  };
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
    architecture: {
      nodes: [
        { id: "user", label: "User", x: 50, y: 50 },
        { id: "whatsapp", label: "WhatsApp", x: 200, y: 50 },
        { id: "wati", label: "WATI", x: 350, y: 50 },
        { id: "n8n", label: "n8n", x: 500, y: 50 },
        { id: "gpt4", label: "GPT-4.1", x: 650, y: 50, highlight: true },
        { id: "pinecone", label: "Pinecone", x: 500, y: 170 },
        { id: "postgres", label: "PostgreSQL", x: 650, y: 170 },
        { id: "response", label: "Response", x: 800, y: 50 },
      ],
      connections: [
        { from: "user", to: "whatsapp" },
        { from: "whatsapp", to: "wati" },
        { from: "wati", to: "n8n" },
        { from: "n8n", to: "gpt4" },
        { from: "n8n", to: "pinecone" },
        { from: "gpt4", to: "postgres" },
        { from: "gpt4", to: "response" },
      ],
    },
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
    architecture: {
      nodes: [
        { id: "query", label: "Query", x: 50, y: 50 },
        { id: "gemini", label: "Gemini", x: 200, y: 50, highlight: true },
        { id: "tavily", label: "Tavily", x: 350, y: 50 },
        { id: "scraper", label: "Scraper", x: 500, y: 50 },
        { id: "critique", label: "Critique", x: 650, y: 50 },
        { id: "report", label: "Report", x: 800, y: 50 },
      ],
      connections: [
        { from: "query", to: "gemini" },
        { from: "gemini", to: "tavily" },
        { from: "tavily", to: "scraper" },
        { from: "scraper", to: "critique" },
        { from: "critique", to: "report" },
      ],
    },
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
    architecture: {
      nodes: [
        { id: "employee", label: "Employee", x: 50, y: 50 },
        { id: "copilot", label: "Copilot Studio", x: 230, y: 50 },
        { id: "gpt4", label: "GPT-4.1", x: 430, y: 50, highlight: true },
        { id: "assessment", label: "Assessment", x: 630, y: 50 },
        { id: "devops", label: "Azure DevOps", x: 330, y: 170 },
        { id: "zoho", label: "Zoho People", x: 530, y: 170 },
      ],
      connections: [
        { from: "employee", to: "copilot" },
        { from: "copilot", to: "gpt4" },
        { from: "gpt4", to: "assessment" },
        { from: "devops", to: "gpt4" },
        { from: "zoho", to: "gpt4" },
      ],
    },
  },
];
