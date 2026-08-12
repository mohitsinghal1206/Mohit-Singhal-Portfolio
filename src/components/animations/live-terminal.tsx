"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const codeLines = [
  { text: "import os", color: "text-[#C678DD]" },
  { text: "from langchain.agents import (", color: "text-[#C678DD]" },
  { text: "    AgentExecutor, create_react_agent", color: "text-[#C678DD]" },
  { text: ")", color: "text-[#C678DD]" },
  { text: "from langchain_openai import ChatOpenAI", color: "text-[#C678DD]" },
  { text: "from tools import get_market_data, trigger_n8n", color: "text-[#C678DD]" },
  { text: "", color: "" },
  { text: "# Initialize Core LLM Brain", color: "text-[#5C6370] italic" },
  { text: "llm = ChatOpenAI(model=\"gpt-4o\", temperature=0)", color: "text-[#E5C07B]" },
  { text: "tools = [get_market_data, trigger_n8n]", color: "text-[#E5C07B]" },
  { text: "", color: "" },
  { text: "# Assemble Cognitive Architecture", color: "text-[#5C6370] italic" },
  { text: "agent = create_react_agent(llm, tools, prompt)", color: "text-[#61AFEF]" },
  { text: "executor = AgentExecutor(", color: "text-[#61AFEF]" },
  { text: "    agent=agent, tools=tools, verbose=True", color: "text-[#61AFEF]" },
  { text: ")", color: "text-[#61AFEF]" },
  { text: "", color: "" },
  { text: "# Deploy Intelligent Workflow...", color: "text-[#98C379] font-bold" },
  { text: "executor.invoke({", color: "text-white" },
  { text: "    \"input\": \"Analyze ticks, trigger automation.\"", color: "text-[#98C379]" },
  { text: "})", color: "text-white" },
  { text: "> SYSTEM ONLINE.", color: "text-[#00F098] font-bold mt-2" },
];

export function LiveTerminal() {
  return (
    <div className="w-full max-w-[500px] rounded-xl overflow-hidden bg-[#1E1E1E] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] font-mono text-xs md:text-sm mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#2D2D2D] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 flex justify-center items-center gap-2 text-[10px] md:text-xs text-muted-dark font-medium">
          <Terminal size={14} />
          agent_core.py
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-5 relative pb-6">
        {codeLines.map((line, index) => (
          <div key={index} className={`mb-1 ${line.color} flex items-center min-h-[16px] md:min-h-[20px]`}>
            <span>{line.text}</span>
            {index === codeLines.length - 1 && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-[2px] h-[14px] md:h-[18px] bg-white ml-1 shrink-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
