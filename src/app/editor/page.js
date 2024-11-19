'use client';

import { useEffect, useState } from 'react';

export default function Editor() {
  const [script, setScript] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const initFirebase = async () => {
      const firebase = (await import('firebase/compat/app')).default;
      await import('firebase/compat/database');

      if (!firebase.apps.length) {
        firebase.initializeApp({
          databaseURL: "https://your-project.firebaseio.com",
        });
      }

      const database = firebase.database();
      const scriptRef = database.ref('glassScript');
      
      scriptRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setScript(data.content);
          setPreview(data.content);
        }
      });

      return () => scriptRef.off();
    };

    initFirebase();
  }, []);

  const handleScriptChange = async (event) => {
    const newScript = event.target.value;
    setScript(newScript);
    
    const firebase = (await import('firebase/compat/app')).default;
    const database = firebase.database();
    const scriptRef = database.ref('glassScript');
    
    scriptRef.set({
      content: newScript,
      timestamp: Date.now()
    });
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