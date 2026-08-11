import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohit Singhal — AI Engineer | Open to Opportunities",
  description:
    "Building production-ready AI applications using LLM's, RAG, Agentic AI, and Automation to solve real-world business challenges.",
  keywords: [
    "AI Engineer",
    "LLM",
    "Agentic AI",
    "RAG",
    "LangChain",
    "LangGraph",
    "FastAPI",
    "Python",
    "OpenAI",
    "Azure",
    "AI Automation",
    "Enterprise AI",
  ],
  authors: [{ name: "Mohit Singhal" }],
  creator: "Mohit Singhal",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohit Singhal — AI Engineer",
    description:
      "Building production-ready AI systems. Enterprise LLM applications, agentic AI, RAG pipelines, and intelligent automation.",
    siteName: "Mohit Singhal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Singhal — AI Engineer",
    description:
      "Building production-ready AI systems. Enterprise LLM applications, agentic AI, RAG pipelines, and intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ChatbotWidget } from "@/components/shared/chatbot-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
