// Teleprompter.js
'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import GlassMockup from "./GlassMockup";
import Image from 'next/image';
import { database } from './firebase';
import { ref, onValue, set } from 'firebase/database';

const Teleprompter = () => {
 const [text, setText] = useState("");
 const [displayMode, setDisplayMode] = useState(false);

 useEffect(() => {
   const scriptRef = ref(database, 'adddelete/script/current-script');
   
   onValue(scriptRef, (snapshot) => {
     setText(snapshot.val());
   });

   return () => {
     // Cleanup subscription on unmount
     onValue(scriptRef, () => {});
   };
 }, []);

 const handleTextChange = (e) => {
   const newText = e.target.value;
   setText(newText);
   set(ref(database, 'adddelete/script/current-script'), newText);
 };

 return (
   <div className="min-h-screen bg-white p-8">
     <div className="max-w-4xl mx-auto space-y-8">
       <a href="https://useyuzu.com" className="block">
         <div className="relative w-[150px] h-[150px] mx-auto">
           <Image 
             src="/yuzu.png" 
             alt="Yuzu Logo" 
             quality={100}
             width={150}
             height={150}
             priority
             className="object-contain"
           />
         </div>
       </a>
       
       <div className="relative w-full">
         <textarea
           className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
           value={text}
           onChange={handleTextChange}
           placeholder="Enter your script here..."
         />
         <button
           onClick={() => setDisplayMode(true)}
           className="absolute bottom-3 right-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-black flex items-center gap-2"
         >
           <Eye size={16} />
           Preview Display Mode
           <ArrowRight size={16} />
         </button>
       </div>
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