import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import GlassMockup from "./GlassMockup";

const Teleprompter = () => {
  const [text, setText] = useState("");
  const [displayMode, setDisplayMode] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {!displayMode ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-2xl mb-4">Script Editor</h2>
            <textarea
              className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your script here..."
            />
            <button
              onClick={() => setDisplayMode(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Eye className="mr-2" />
              Preview Display Mode
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black flex items-center justify-center"
          onClick={() => setDisplayMode(false)}
        >
          <GlassMockup scriptText={text} />
        </motion.div>
      )}
    </div>
  );
};

export default Teleprompter;