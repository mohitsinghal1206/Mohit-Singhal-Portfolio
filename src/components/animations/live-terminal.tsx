"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const codeLines = [
  { text: "import os", color: "text-[#C678DD]" },
  { text: "from langchain.agents import AgentExecutor, create_react_agent", color: "text-[#C678DD]" },
  { text: "from langchain_openai import ChatOpenAI", color: "text-[#C678DD]" },
  { text: "from tools import get_market_data, trigger_n8n_workflow", color: "text-[#C678DD]" },
  { text: "", color: "" },
  { text: "# Initialize Core LLM Brain", color: "text-[#5C6370] italic" },
  { text: "llm = ChatOpenAI(model=\"gpt-4o\", temperature=0)", color: "text-[#E5C07B]" },
  { text: "tools = [get_market_data, trigger_n8n_workflow]", color: "text-[#E5C07B]" },
  { text: "", color: "" },
  { text: "# Assemble Cognitive Architecture", color: "text-[#5C6370] italic" },
  { text: "agent = create_react_agent(llm, tools, prompt)", color: "text-[#61AFEF]" },
  { text: "executor = AgentExecutor(agent=agent, tools=tools, verbose=True)", color: "text-[#61AFEF]" },
  { text: "", color: "" },
  { text: "# Deploying Intelligent Workflow...", color: "text-[#98C379] font-bold" },
  { text: "executor.invoke({", color: "text-white" },
  { text: "    \"input\": \"Analyze live ticks and trigger automation on anomaly.\"", color: "text-[#98C379]" },
  { text: "})", color: "text-white" },
  { text: "> SYSTEM ONLINE. AWAITING INSTRUCTIONS.", color: "text-[#00F098] font-bold mt-2" },
];

export function LiveTerminal() {
  const [linesToShow, setLinesToShow] = useState(0);

  useEffect(() => {
    // Reveal lines progressively
    const interval = setInterval(() => {
      setLinesToShow((prev) => {
        if (prev < codeLines.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 400); // 400ms per line

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[500px] rounded-xl overflow-hidden bg-[#1E1E1E] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] font-mono text-sm mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#2D2D2D] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 flex justify-center items-center gap-2 text-xs text-muted-dark font-medium">
          <Terminal size={14} />
          agent_core.py
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 min-h-[350px] relative">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={index < linesToShow ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={`mb-1 ${line.color}`}
            style={{ display: index < linesToShow ? "block" : "none" }}
          >
            {line.text}
          </motion.div>
        ))}

        {/* Blinking Cursor */}
        {linesToShow < codeLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-white inline-block ml-1 align-middle mt-1"
          />
        )}
      </div>
    </div>
  );
}
