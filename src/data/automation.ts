export interface AutomationProject {
  id: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const automationProjects: AutomationProject[] = [
  {
    id: "customer-support",
    icon: "message-circle",
    title: "Customer Support Automation",
    description: "AI-powered customer support workflows with intelligent routing and response generation",
    capabilities: ["n8n", "GPT-4.1", "RAG", "Webhooks"],
  },
  {
    id: "microsoft-365",
    icon: "mail",
    title: "Microsoft 365 Automation",
    description: "Teams, Outlook, Graph API and Power Automate integrations for enterprise productivity",
    capabilities: ["Teams", "Outlook", "Graph API", "Power Automate"],
  },
  {
    id: "enterprise-workflow",
    icon: "building",
    title: "Enterprise Workflow Automation",
    description: "HR, CRM and internal business process automation using Microsoft Copilot Studio",
    capabilities: ["Copilot Studio", "HR Systems", "CRM", "Business Process"],
  },
  {
    id: "api-integrations",
    icon: "plug",
    title: "API Integrations",
    description: "REST APIs, Webhooks, MCP and enterprise system integrations connecting disparate systems",
    capabilities: ["REST APIs", "Webhooks", "MCP", "OAuth"],
  },
];

export interface WorkflowStep {
  id: string;
  label: string;
  icon: string;
}

export const workflowSteps: WorkflowStep[] = [
  { id: "trigger", label: "Trigger", icon: "play" },
  { id: "llm", label: "LLM", icon: "brain" },
  { id: "decision", label: "Decision", icon: "git-branch" },
  { id: "api", label: "API", icon: "globe" },
  { id: "crm", label: "CRM", icon: "database" },
  { id: "notification", label: "Notify", icon: "bell" },
];
