export interface Certification {
  id: string;
  name: string;
  issuer: string;
  url: string;
  highlighted?: boolean;
}

export const certifications: Certification[] = [
  {
    id: "azure-ai-fundamentals",
    name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/en-us/users/mohitsinghal-4225/credentials/1e5d8522d181508d",
    highlighted: true,
  },
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner (Training)",
    issuer: "Udemy",
    url: "https://www.udemy.com/certificate/UC-cd794411-cb70-4324-b94a-3c86b907fd19/",
  },
];
