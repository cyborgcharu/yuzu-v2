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
      setText(snapshot.val() || "");
    });

    return () => {
      onValue(scriptRef, () => {});
    };
  }, []);

  const handleTextChange = async (e) => {
    const newText = e.target.value;
    setText(newText);
    
    try {
      await set(ref(database, 'script/current-script'), newText);
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-amber-50 to-white p-8">
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
        <div className="relative w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <h2 className="text-2xl font-medium mb-4 text-gray-800">Script Editor</h2>
          <textarea
            className="w-full h-40 px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 resize-none font-['Avenir'] text-lg"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your script here..."
          />
          <button
            onClick={() => setDisplayMode(true)}
            className="absolute bottom-6 right-6 px-5 py-2.5 bg-black/90 text-white rounded-lg hover:bg-black flex items-center gap-2 transition-colors"
          >
            <Eye size={18} />
            Preview Display Mode
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Instructions with glass morphism */}
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-700">Press the preview button to see how your script will appear on Google Glass</p>
          <p className="text-xs text-gray-500 mt-1">Connected to Firebase Realtime Database</p>
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