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
    description: "Created an AI assistant that instantly answers routine HR policy questions, cutting down the HR team's manual workload by 30% so they can focus on actual human issues.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate"],
  },
  {
    id: "department-sop-agent-network",
    icon: "network",
    title: "Department SOP Agent Network",
    description: "Designed a network of specialized AI agents for different departments (Sales, Marketing, HR). They all report to a master organizational agent, ensuring workflows and knowledge stay connected across the whole company.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate", "Department SOPs"],
  },
  {
    id: "email-qualification-agent",
    icon: "mail",
    title: "Email Qualification Agent",
    description: "Set up an automated n8n workflow that reads, categorizes, and filters incoming emails for Sales and HR. It weeds out the spam and categorizes the rest, letting the team focus only on messages that matter.",
    capabilities: ["n8n", "LLM", "Email APIs"],
  },
  {
    id: "workforce-activity-analysis",
    icon: "activity",
    title: "Workforce Activity Analysis Agent",
    description: "Developed a monitoring workflow using the Worksnaps API that analyzes team activity data and automatically flags suspicious patterns, sending weekly summary reports directly to management.",
    capabilities: ["Worksnaps API", "AI Analysis", "Automation", "Reporting"],
  },
  {
    id: "automated-news-social-media",
    icon: "globe",
    title: "Automated News & Social Media Agent",
    description: "Built a fully autonomous content engine that scrapes 100+ daily topics, researches them via SERP APIs, ranks the best ones, and automatically schedules and publishes content to social media without human intervention.",
    capabilities: ["n8n", "SERP API", "LLM", "Cron", "Google Sheets", "Social APIs"],
  },
  {
    id: "youtube-research",
    icon: "youtube",
    title: "YouTube Research & Content Ideation Agent",
    description: "Created a YouTube research tool that analyzes competitor videos, trending topics, and audience comments. It automatically generates high-retention video ideas, catchy hooks, and script concepts for creators.",
    capabilities: ["YouTube Search API", "LLM", "Sentiment Analysis", "Google Sheets", "Telegram"],
  },
  {
    id: "linkedin-content",
    icon: "linkedin",
    title: "LinkedIn Content Research Agent",
    description: "Developed a Copilot Studio agent for marketing teams that hunts for trending industry articles and writes complete LinkedIn post drafts that perfectly match the brand's unique tone and voice.",
    capabilities: ["Microsoft Copilot Studio", "Power Automate", "LLM", "News/Web Sources"],
  },
  {
    id: "make-n8n-migration",
    icon: "refresh-cw",
    title: "Make.com → n8n Migration",
    description: "Helped a client break free from Make.com's expensive platform limits by migrating their entire automation infrastructure to a self-hosted n8n instance, giving them total control and massively reducing monthly costs.",
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
