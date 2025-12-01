import React, { useState } from 'react';
import { ContentType, FunContent, JokeData, MemeData, VideoData } from './types';
import { Navbar } from './components/Navbar';
import { JokePage } from './pages/JokePage';
import { MemePage } from './pages/MemePage';
import { VideoPage } from './pages/VideoPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ContentType>(ContentType.JOKE);
  
  // Separate history states to preserve content when switching tabs
  const [jokeHistory, setJokeHistory] = useState<FunContent<JokeData>[]>([]);
  const [memeHistory, setMemeHistory] = useState<FunContent<MemeData>[]>([]);
  const [videoHistory, setVideoHistory] = useState<FunContent<VideoData>[]>([]);

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content Container with padding to avoid overlap with fixed navbars */}
      <main className="max-w-3xl mx-auto px-4 pt-4 md:pt-24 pb-24 md:pb-10 min-h-screen">
        
        {currentView === ContentType.JOKE && (
          <JokePage 
            history={jokeHistory} 
            addToHistory={(item) => setJokeHistory(prev => [item, ...prev])} 
          />
        )}

        {currentView === ContentType.MEME && (
          <MemePage 
            history={memeHistory} 
            addToHistory={(item) => setMemeHistory(prev => [item, ...prev])} 
          />
        )}

        {currentView === ContentType.VIDEO && (
          <VideoPage 
            history={videoHistory} 
            addToHistory={(item) => setVideoHistory(prev => [item, ...prev])} 
          />
        )}

      </main>
    </div>
  );
};

export default App;