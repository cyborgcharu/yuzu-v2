'use client';
import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '@/lib/firebase';  // Use your existing Firebase setup

export default function Editor() {
  const [script, setScript] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const scriptRef = ref(database, 'script/current-script');
    
    const unsubscribe = onValue(scriptRef, (snapshot) => {
      const value = snapshot.val();
      console.log('Received value from Firebase:', value);
      if (value) {
        setScript(value);
        setPreview(value);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleScriptChange = async (event) => {
    const newScript = event.target.value;
    setScript(newScript);
    setPreview(newScript);
    
    try {
      const scriptRef = ref(database, 'script/current-script');
      await set(scriptRef, newScript);
      console.log('Script updated successfully:', newScript);
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <textarea 
          value={script}
          onChange={handleScriptChange}
          placeholder="Enter your Glass script here..."
          className="w-full min-h-[200px] p-2 border rounded-md"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-black text-white p-4 rounded-lg font-mono">
          <div className="max-w-[640px] aspect-[4/3] border border-gray-600 p-4">
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
}