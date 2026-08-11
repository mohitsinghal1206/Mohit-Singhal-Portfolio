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
  sections: { title: string; content: string }[];
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
    title: "AI WhatsApp Customer Support System",
    description: "A multi-agent AI system built to automate customer support, lead follow-ups, and lead qualification over WhatsApp while maintaining shared conversation context and human handoff for high-value conversations.",
    sections: [
      {
        title: "RAG Pipeline",
        content: "Built an end-to-end RAG pipeline with a document ingestion workflow that loads product documentation and knowledge-base content, chunks the content, generates embeddings using OpenAI text-embedding-3-large, and stores the resulting vectors in Pinecone.\n\nDuring customer conversations, the retrieval pipeline uses semantic search to retrieve relevant product context from the vector database and provides the retrieved information to GPT-4.1-mini for grounded response generation."
      },
      {
        title: "Agent Architecture",
        content: "• Customer Support Agent: Handles product-related customer questions using RAG over approved product documentation.\n• Follow-up Agent: Detects inactive leads and generates contextual follow-up messages based on previous conversation history instead of relying only on static templates.\n• Lead Qualification Agent: Analyzes conversation history, evaluates customer intent and engagement, classifies leads as Hot, Warm, or Cold, and provides qualification information to the sales team.\n\nAll agents use shared conversation context so that information from previous interactions is available across the different workflows. When a conversation requires human intervention or becomes sales-ready, the workflow transfers ownership to the sales team and disables further AI responses."
      }
    ],
    technologies: [
      "GPT-4.1-mini",
      "n8n",
      "PostgreSQL",
      "Pinecone",
      "WATI API",
      "Webhooks",
      "Google Sheets",
      "Telegram",
    ],
    results: [
      "Reduced manual lead qualification workload by approximately 25%",
      "Automated repetitive customer support interactions",
      "Automated follow-up workflows",
      "Improved lead prioritization",
      "Reduced operational workload and support costs",
      "Enabled 24/7 AI-assisted customer interactions"
    ],
    links: {
      docs: "https://app.notion.com/p/AI-WhatsApp-Customer-Support-Lead-Qualification-System-3721ed779b4d80e28cb5e1c3a0cd480e",
    },
    workflow: [
      { step: "WhatsApp via WATI", detail: "Customer interactions trigger webhooks", icon: "whatsapp" },
      { step: "n8n Orchestration", detail: "Routes messages and manages context", icon: "user" },
      { step: "Pinecone Retrieval", detail: "Semantic search via text-embedding-3-large", icon: "database" },
      { step: "GPT-4.1-mini", detail: "Generates grounded responses & classifies leads", icon: "brain" },
      { step: "Google Sheets / Telegram", detail: "Logs leads and alerts sales team", icon: "message" },
    ],
  },
  {
    id: "deep-research",
    index: "02",
    category: "Research AI",
    title: "DeepResearch Agent",
    description: "An autonomous multi-agent research pipeline that searches, retrieves, analyzes, critiques, and synthesizes information into structured research reports.",
    sections: [
      {
        title: "Agentic Architecture",
        content: "Designed a 4-stage Agentic Architecture comprising a Search Agent, Reader Agent, Writer Chain, and Critic Chain using LCEL and Gemini 2.5 Flash. This enables autonomous task orchestration and tool-based reasoning for complex research queries."
      },
      {
        title: "Autonomous Execution",
        content: "Implemented tool-using agents with web search and web scraping capabilities for autonomous information retrieval. The system conducts multi-stage reasoning, generates a draft research report, applies automated critique and validation, and delivers a final synthesis—all monitored via a real-time Streamlit dashboard."
      }
    ],
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "Gemini 2.5 Flash",
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
      { step: "Search Agent", detail: "Tavily web search retrieves sources", icon: "globe" },
      { step: "Reader Agent", detail: "BeautifulSoup scrapes source content", icon: "scraper" },
      { step: "Writer Chain", detail: "Synthesizes information into draft", icon: "brain" },
      { step: "Critic Chain", detail: "Validates and critiques draft", icon: "critique" },
      { step: "Final Research Report", detail: "Delivered via Streamlit dashboard", icon: "report" },
    ],
  },
  {
    id: "employee-assessment",
    index: "03",
    category: "Enterprise AI",
    title: "AI-Powered Employee Assessment",
    description: "An enterprise RAG-based assessment and compliance platform that transforms organizational policies and departmental knowledge into dynamic employee assessments, automates the assessment lifecycle, and centralizes assessment data within the Zoho ecosystem.",
    sections: [
      {
        title: "Knowledge Integrations",
        content: "The system retrieves approved organizational knowledge—including HR Policies, Sales Policies, Manager Guidelines, and Department SOPs—through Azure DevOps Wiki and Microsoft Graph integrations."
      },
      {
        title: "Assessment Engine",
        content: "Uses GPT-4.1-mini to generate policy-grounded assessments and contextual explanations. Features include dynamic question generation, semantic retrieval, context-aware questioning, dynamic assessment sizing based on source complexity, answer evaluation, and performance summaries.\n\nThe solution was developed in the Zoho People Sandbox environment using the Zoho ZET CLI SDK and APIs. Assessment data is stored back in Zoho People, displaying final results in Zoho People records for administrator review, deeply integrating with the operational HR workflow."
      }
    ],
    technologies: [
      "Microsoft Copilot Studio",
      "Power Automate",
      "GPT-4.1-mini",
      "Zoho People",
      "Azure DevOps Wiki",
      "Microsoft Graph APIs",
      "React",
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
      { step: "Zoho People", detail: "Initiates webhook for assessment", icon: "user" },
      { step: "Integration Layer", detail: "Power Automate orchestrates data flow", icon: "database" },
      { step: "Copilot Studio", detail: "RAG over Azure DevOps Wiki & Graph", icon: "copilot" },
      { step: "Employee Assessment", detail: "AI conducts dynamic evaluation", icon: "assessment" },
      { step: "Results to Zoho People", detail: "Records written back for HR review", icon: "report" },
    ],
  },
];
