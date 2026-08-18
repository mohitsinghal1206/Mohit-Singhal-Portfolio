export interface WorkflowStep {
  step: string;
  detail: string;
  icon: string;
}

export interface LabeledWorkflow {
  title: string;
  steps: WorkflowStep[];
}

export interface ParallelGroup {
  parallel: LabeledWorkflow[];
}

export type WorkflowNode = WorkflowStep | ParallelGroup;

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
  workflow: WorkflowNode[];
}

export const projects: Project[] = [
  {
    id: "whatsapp-agent",
    index: "01",
    category: "Enterprise AI",
    title: "AI WhatsApp Customer Support System",
    description: "A smart WhatsApp assistant I built using multiple AI agents working together. It automatically handles customer support, follows up with old leads, and figures out which customers are ready to buy—handing them over to human sales reps when things get serious.",
    sections: [
      {
        title: "RAG Pipeline",
        content: "I built a custom search system (RAG) that securely reads the company's product manuals and stores them in Pinecone. When a customer asks a question on WhatsApp, the AI instantly finds the exact right answer from the official docs instead of guessing."
      },
      {
        title: "Agent Architecture",
        content: "Instead of one massive bot, I designed a team of specialized agents:\n• Support Agent: Answers questions using official docs.\n• Follow-up Agent: Re-engages quiet leads naturally based on their past chats.\n• Sales Agent: Grades leads as Hot, Warm, or Cold for the sales team.\n\nThey all share the same memory, so the customer never has to repeat themselves."
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
      {
        parallel: [
          {
            title: "Follow-up Agent",
            steps: [
              { step: "Cron Job", detail: "Runs daily schedule", icon: "webhook" },
              { step: "Analyze Chats", detail: "Finds inactive leads", icon: "query" },
              { step: "WATI API", detail: "Sends follow-up message", icon: "message" }
            ]
          },
          {
            title: "Chatbot",
            steps: [
              { step: "WhatsApp WATI Webhook", detail: "Customer sends message", icon: "whatsapp" },
              { step: "LLM + Vector DB", detail: "Retrieves context", icon: "database" },
              { step: "WATI API", detail: "Sends response", icon: "message" }
            ]
          },
          {
            title: "Lead Sort Agent",
            steps: [
              { step: "Cron Job", detail: "Runs daily schedule", icon: "webhook" },
              { step: "Analyze Intent", detail: "Scores Hot/Warm/Cold", icon: "critique" },
              { step: "Google Sheets", detail: "Reports to Sales", icon: "report" }
            ]
          }
        ]
      },
      { step: "Shared Context Memory", detail: "Pinecone vector DB syncs all conversation history across all 3 agents", icon: "brain" }
    ]
  },
  {
    id: "deep-research",
    index: "02",
    category: "Research AI",
    title: "DeepResearch Agent",
    description: "An autonomous AI researcher I developed that does the heavy lifting for you. You give it a topic, and it searches the web, reads articles, critiques its own findings, and writes a fully structured report.",
    sections: [
      {
        title: "Agentic Architecture",
        content: "I designed a 4-stage pipeline using LangChain and Gemini: a Searcher finds links, a Reader scrapes the text, a Writer drafts the report, and a Critic reviews it for accuracy to prevent hallucinations."
      },
      {
        title: "Autonomous Execution",
        content: "The whole process runs completely on its own. It handles web scraping and multi-stage reasoning behind the scenes, delivering the final polished research report straight to an interactive Streamlit dashboard."
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
      { step: "User Input", detail: "Provides research topic", icon: "user" },
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
    description: "A corporate training tool I built that reads company policies (like HR manuals) and automatically generates dynamic quizzes to test employee knowledge, fully integrated with Zoho.",
    sections: [
      {
        title: "Knowledge Integrations",
        content: "I connected the AI directly to Azure DevOps Wiki and Microsoft Graph, allowing it to automatically pull the latest approved company policies and guidelines without any manual uploads."
      },
      {
        title: "Assessment Engine",
        content: "Using GPT-4.1-mini, the system creates context-aware questions on the fly based on the difficulty of the source document. Once an employee finishes the test, their grades and analytics are sent straight back to their Zoho HR profile."
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
