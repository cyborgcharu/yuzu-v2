'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import GlassMockup from "./GlassMockup";
import Link from 'next/link';
import Image from 'next/image';

const Teleprompter = () => {
  const [text, setText] = useState("");
  const [displayMode, setDisplayMode] = useState(false);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="https://useyuzu.com" className="block w-[250px] h-[75px] mb-12 relative mx-auto">
          <Image 
            src="/yuzu.png" 
            alt="Yuzu Logo" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <textarea
              className="w-full h-48 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your script here..."
            />
            <button
              onClick={() => setDisplayMode(true)}
              className="absolute right-4 bottom-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-black flex items-center gap-2 text-sm"
            >
              <Eye size={16} />
              Preview Display Mode
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
      
      {displayMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setDisplayMode(false)}
        >
          <GlassMockup scriptText={text} />
        </motion.div>
      )}
    </div>
  );
};

export default Teleprompter;