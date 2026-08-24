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
    id: "enterprise-ai-chatbot",
    index: "01",
    category: "Enterprise AI",
    title: "Enterprise AI Chatbot System",
    description: "A comprehensive virtual assistant platform built for enterprise use, featuring conversational interfaces, RAG capabilities, and automated error logging.",
    sections: [
      {
        title: "RAG Pipeline",
        content: "Implemented a standard Retrieval-Augmented Generation (RAG) pipeline to securely retrieve relevant context from internal documents for accurate query resolution."
      },
      {
        title: "System Observability",
        content: "Integrated extensive logging and monitoring tools to track system health, monitor request latency, and handle runtime errors efficiently."
      }
    ],
    technologies: [
      "LLMs",
      "Vector Databases",
      "Backend Frameworks",
      "Messaging APIs",
      "Observability Tools",
    ],
    results: [
      "Streamlined internal query resolution",
      "Automated standard support interactions",
      "Improved system traceability and error logging",
    ],
    links: {
      docs: "https://app.notion.com/p/Enterprise-Chatbot-Overview",
    },
    workflow: [
      { step: "User Interface", detail: "Receives user query", icon: "user" },
      { step: "AI Engine & Vector DB", detail: "Processes intent and context", icon: "database" },
      {
        parallel: [
          {
            title: "Response Handling",
            steps: [{ step: "Messaging API", detail: "Delivers response", icon: "message" }]
          },
          {
            title: "System Monitoring",
            steps: [{ step: "Observability Platform", detail: "Logs latency & errors", icon: "report" }]
          }
        ]
      }
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
    id: "hr-workflow-system",
    index: "03",
    category: "Enterprise AI",
    title: "HR Workflow Automation System",
    description: "An internal corporate workflow automation tool that integrates company knowledge bases to streamline standard HR processes and notifications.",
    sections: [
      {
        title: "Workflow Engine",
        content: "Developed automated workflows to handle routine internal processes and logic, significantly reducing manual intervention."
      },
      {
        title: "Knowledge Integration",
        content: "Connected the system to secure cloud repositories and databases to dynamically fetch required guidelines and policies."
      }
    ],
    technologies: [
      "Workflow Automations",
      "Cloud Knowledge Bases",
      "Internal APIs",
      "Enterprise Chat Platforms",
      "LLMs",
    ],
    results: [
      "Automated standard internal workflows",
      "Secure integration with internal document repositories",
      "Streamlined multi-platform notification system",
    ],
    links: {
      docs: "https://app.notion.com/p/HR-Workflow-System",
    },
    workflow: [
      { step: "Employee Portal", detail: "Initiates workflow request", icon: "user" },
      { step: "API Gateway", detail: "Authenticates and routes request", icon: "devops" },
      { step: "AI Processing Engine", detail: "Retrieves internal documents", icon: "database" },
      {
        parallel: [
          {
            title: "HR System Update",
            steps: [{ step: "Internal APIs", detail: "Logs workflow completion", icon: "report" }]
          },
          {
            title: "Alerts & Notifications",
            steps: [{ step: "Email Services", detail: "Sends automated updates", icon: "message" }]
          }
        ]
      }
    ],
  },
];
