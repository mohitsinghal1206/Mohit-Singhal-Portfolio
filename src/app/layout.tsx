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
        <div className="overflow-x-hidden min-h-screen flex flex-col relative">
          {/* Global Fixed Background (Parallax Effect 1) */}
          <div className="fixed inset-0 -z-50 pointer-events-none bg-[#0A0E17]">
            {/* Minimal Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Glowing Ambient Orbs */}
            <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
          </div>
          
          {children}
        </div>
        <ChatbotWidget />
      </body>
    </html>
  );
}
