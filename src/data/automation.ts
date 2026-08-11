export interface AutomationProject {
  id: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const automationProjects: AutomationProject[] = [
  {
    id: "hr-policy-agent",
    icon: "users",
    title: "HR Policy Agent",
    description: "Built an AI-powered HR policy assistant using Microsoft Copilot Studio and Power Automate to automate routine HR policy queries and reduce manual HR effort by approximately 30%.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate"],
  },
  {
    id: "department-sop-agent-network",
    icon: "network",
    title: "Department SOP Agent Network",
    description: "Built department-specific AI agents for HR, Manager, Sales, Marketing, and other departmental SOPs, coordinated through a master HR/organizational agent to connect departmental knowledge and workflows.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate", "Department SOPs"],
  },
  {
    id: "email-qualification-agent",
    icon: "mail",
    title: "Email Qualification Agent",
    description: "Built an n8n-based AI email qualification workflow for HR and Sales teams that automatically categorizes incoming emails such as sales, spam, internal, and other relevant categories, allowing teams to focus on understanding and acting on important messages.",
    capabilities: ["n8n", "LLM", "Email APIs"],
  },
  {
    id: "workforce-activity-analysis",
    icon: "activity",
    title: "Workforce Activity Analysis Agent",
    description: "Built an internal workforce activity analysis workflow using the Worksnaps API to analyze user activity data and generate weekly reports highlighting potentially suspicious activity patterns for review.",
    capabilities: ["Worksnaps API", "AI Analysis", "Automation", "Reporting"],
  },
  {
    id: "automated-news-social-media",
    icon: "globe",
    title: "Automated News & Social Media Agent",
    description: "Built an automated content discovery and publishing workflow that collects approximately 100 daily topics from configured sources, uses SERP APIs for current information retrieval, ranks topics, and automates content publishing on a scheduled cron-based workflow.",
    capabilities: ["n8n", "SERP API", "LLM", "Cron", "Google Sheets", "Social APIs"],
  },
  {
    id: "youtube-research",
    icon: "youtube",
    title: "YouTube Research & Content Ideation Agent",
    description: "Built an AI-powered YouTube research workflow that analyzes competitor videos, trending topics, and audience comments to generate video ideas, titles, hooks, improvement opportunities, and short script concepts.",
    capabilities: ["YouTube Search API", "LLM", "Sentiment Analysis", "Google Sheets", "Telegram"],
  },
  {
    id: "linkedin-content",
    icon: "linkedin",
    title: "LinkedIn Content Research Agent",
    description: "Built a scheduled Copilot Studio agent for the marketing team that researches articles from predefined sources, identifies relevant/trending topics, and generates complete LinkedIn post drafts following the company's preferred brand language and communication style.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate", "LLM", "News/Web Sources"],
  },
  {
    id: "make-n8n-migration",
    icon: "refresh-cw",
    title: "Make.com → n8n Migration",
    description: "Migrated a client's automation workflows from Make.com to self-hosted n8n after platform usage limitations became a constraint. The migration provided greater control over workflow execution and helped reduce recurring automation costs.",
    capabilities: ["Make.com", "n8n", "Self-hosted Infrastructure", "APIs", "Webhooks"],
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
