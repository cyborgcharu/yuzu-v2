// Teleprompter.js
'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import GlassMockup from "./GlassMockup";
import Image from 'next/image';
import { database } from '../lib/firebase';
import { ref, onValue, set } from 'firebase/database';

const Teleprompter = () => {
  const [text, setText] = useState("");
  const [displayMode, setDisplayMode] = useState(false);

  useEffect(() => {
    const scriptRef = ref(database, 'script/current-script');
    
    onValue(scriptRef, (snapshot) => {
      setText(snapshot.val());
    });
    return () => {
      onValue(scriptRef, () => {});
    };
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    set(ref(database, 'script/current-script'), newText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Logo section */}
        <a href="https://useyuzu.com" className="block transition-transform hover:scale-105">
          <div className="relative w-[100px] h-[100px] mx-auto">
            <Image 
              src="/yuzu.png" 
              alt="Yuzu Logo" 
              quality={100}
              width={100}
              height={100}
              priority
              className="object-contain"
            />
          </div>
        </a>
        
        {/* Editor section */}
        <div className="relative w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-medium mb-4 text-gray-800">Script Editor</h2>
          <textarea
            className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 resize-none font-['Avenir'] text-lg"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your script here..."
          />
          <button
            onClick={() => setDisplayMode(true)}
            className="absolute bottom-6 right-6 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          >
            <Eye size={18} />
            Preview Display Mode
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Instructions or additional info */}
        <div className="text-center text-gray-600 space-y-2">
          <p className="text-sm">Press the preview button to see how your script will appear on Google Glass</p>
          <p className="text-xs">Connected to Firebase Realtime Database</p>
        </div>
      </div>
      
      {/* Preview Modal */}
      {displayMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setDisplayMode(false)}
        >
          <GlassMockup scriptText={text} />
          <div className="absolute top-4 right-4 text-white/70 text-sm">
            Click anywhere to exit preview
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Teleprompter;