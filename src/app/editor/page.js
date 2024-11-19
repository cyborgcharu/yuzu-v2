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
          databaseURL: "https://yuzu-ccca0-default-rtdb.firebaseio.com",
        });
      }

      const database = firebase.database();
      const scriptRef = database.ref('script');
      
      // Listen for changes
      scriptRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data?.['current-script']) {
          setScript(data['current-script']);
          setPreview(data['current-script']);
        }
      });

      return () => scriptRef.off();
    };

    initFirebase();
  }, []);

  const handleScriptChange = async (event) => {
    const newScript = event.target.value;
    setScript(newScript);
    setPreview(newScript);
    
    try {
      const firebase = (await import('firebase/compat/app')).default;
      const database = firebase.database();
      
      // Only update the script node
      await database.ref('script').set({
        'current-script': newScript
      });
      
      // Optionally, log success
      console.log('Script updated successfully');
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